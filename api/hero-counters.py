import numpy as np
import pandas as pd
import requests
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler
import json

from ._dotabuff_api import get_hero_matchup_data

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        params = parse_qs(urlparse(self.path).query)
        heroIds = params.get("heroIds") or []

        if len(heroIds) == 0:
            self.send_response(400)
            return

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        # Combine all the matchips into one DataFrame
        all_matchups = []
        for hero in heroIds:
            matchups = pd.DataFrame(get_hero_matchup_data(hero)).set_index("heroId")
            all_matchups.append(matchups)
        all_matchups = pd.concat(all_matchups, keys=heroIds, axis=0)

        # Bucket the values across all heroes
        for column in all_matchups.columns:
            all_matchups[f"{column}Tier"] = pd.cut(all_matchups[column], bins=7, labels=range(-3,4))

        if len(heroIds) > 1:
            # Add a summary
            summary = all_matchups.groupby(level=1).agg({
                'disadvantage': 'sum',
                'winRate': 'mean',
                'matchesPlayed': 'sum',
            })
            for column in summary.columns:
                summary[f"{column}Tier"] = pd.cut(summary[column], bins=7, labels=range(-3,4))

            summary = pd.concat([summary], keys=['summary'])
            all_matchups = pd.concat([all_matchups, summary], axis=0)

            # Transform data into a dict of dicts
            # 1st level key is the enemy ID
            # 2nd level key is the hero ID
            # value is the matchup data
            hero_matchups_map = {}
            for hero, matchups in all_matchups.groupby(level=1):
                hero_matchups_map[hero] = matchups.reset_index(level=1, drop=True).to_dict("index")

            self.wfile.write(json.dumps(hero_matchups_map).encode())
            return

        else:
            hero_matchups_map = all_matchups.loc[heroIds[0]].to_dict("index")
            self.wfile.write(json.dumps(hero_matchups_map).encode())
            return

