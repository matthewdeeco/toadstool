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
        heroes = params.get("hero")

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(get_hero_matchup_data(heroes[0])).encode())
        return

