import requests
from bs4 import BeautifulSoup

__all__ = ["get_hero_matchup_data"]

headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate",
    "accept-language": "en-US,en;q=0.9,ja;q=0.8",
    "cookie": "outstream-slider=cap; _ga=GA1.2.963527698.1536585426; _tz=Asia%2FManila; __qca=P0-1047364389-1536585427076; __gads=ID=ab7fb16f725bcf81:T=1537179738:S=ALNI_MY4SPbRpk5BwCCfRo7rJ4LKciYyPw; _player_token=68f024f7b2a020bde95efeb4c720a9205c47b68e609a106370de65c9ce24cv01; _player_id=897885407; _ats=1542585905; _ym_uid=1552330018581431669; _ym_d=1552330018; _gid=GA1.2.820234398.1553534083; GED_PLAYLIST_ACTIVITY=W3sidSI6IlBFL1QiLCJ0c2wiOjE1NTM2MDA1NTEsIm52IjoxLCJ1cHQiOjE1NTM2MDA1MzYsImx0IjoxNTUzNjAwNTQ3fV0.; _ym_isad=2; _ym_visorc_52686388=w; _s=bXNwVEVRNDFqbmVpZXlFTWQ5NGFnRFpRYTNCVWl1VE5yODBiRWt2cnMvQnYrOExFLzljT1VrTlYxQkp5N2JKYVYvK1d1UGppVkVnaXo4WDdnMjE1dDJVbis2Z0lzVmFYMkZXckcyTVBidm5UckZLMGxKVGpmV2hmdjVEOVlBQlhGSjAxdFVPb1M5TXFJMjd4ZStXcEdoWk9wRmZoR0p3NDBIY1NjTTBpMCtqbXhjdDJhMGVhME5ubTRHMDhDdEFvLS01WUFsNFIrbE1BVEFaYzVJWlRlTGV3PT0%3D--311427ca3ef7cf269cabaca21d52c68da7ff5953; _hi=1553712217582; _gat=1",
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
}

cache = {}

def kebab_case(s: str):
  return s.lower().replace(" ", "-").replace("'", "")


def get_hero_matchup_data(hero_id: str):
  print(len(cache), cache.keys())
  if hero_id in cache:
    return cache[hero_id]

  resp = requests.get(f"https://www.dotabuff.com/heroes/{hero_id}/counters", headers=headers)

  soup = BeautifulSoup(resp.content, "html.parser")

  matchups = soup.find_all("section")[4]

  assert matchups.find("header").text == "Matchups"

  matchup_data = []

  for hero_row in matchups.find("tbody").find_all("tr"):
    hero_cells = hero_row.find_all("td")
    hero_name = hero_cells[0].attrs["data-value"]
    hero_data = {
      "heroId": kebab_case(hero_name),
      "disadvantage": float(hero_cells[2].attrs["data-value"]),
      "winRate": float(hero_cells[3].attrs["data-value"]),
      "matchesPlayed": float(hero_cells[4].attrs["data-value"]),
    }
    matchup_data.append(hero_data)

  cache[hero_id] = matchup_data

  return matchup_data
