import json

import requests

API_BASE = 'http://api.rottentomatoes.com/api/public/v1.0'


class ROTTEN(object):

    def get_film(self, film_id):
        url = '%s/movies/%s.json' % (API_BASE, film_id)
        return self.call_api(url)

    def search_title(self, title, page, page_limit):
        url = '%s/movies.json' % API_BASE
        payload = dict(q=title, page_limit=page_limit, page=page)
        return self.call_api(url)

    def call_api(self, url, params=None):
        if not params:
            params = {}

        payload = dict(
            params.items() + self.payload.items()
        )

        r = requests.get('%s/movies.json' % API_BASE, params=payload)

        if r.status_code != requests.codes.ok:
            return None

        return json.loads(r.content)

    def __init__(self, apikey):
        self.payload = dict(
            apikey=apikey
        )
