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
        print(heroIds)

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        response = { heroIds[0]: get_hero_matchup_data(heroIds[0]) }
        self.wfile.write(json.dumps(response).encode())
        return

