import json

import requests

API_BASE = 'http://api.rottentomatoes.com/api/public/v1.0'


class ROTTEN(object):

    def get_film(self, film_id):
        """Get a single film using it's ID."""
        resource = 'movies/%s.json' % film_id
        return self.api_call(resource)

    def search_title(self, title, page, page_limit):
        """Get a list of films by searching the title."""
        resource = 'movies.json'
        params = dict(q=title, page_limit=page_limit, page=page)
        return self.api_call(resource, params)

    def api_call(self, resource, params=None):
        """Call the API."""
        payload = self.build_payload(params)

        r = requests.get('%s/%s' % (API_BASE, resource), params=payload)

        if r.status_code != requests.codes.ok:
            return None

        # raise TypeError('lol')

        return json.loads(r.content)

    def build_payload(self, params):
        """Extend the params of the method with the class's default ones."""
        if not params:
                params = {}
        return dict(
            params.items() + self.payload.items()
        )

    def __init__(self, apikey):
        """Construct."""
        self.payload = dict(
            apikey=apikey
        )
