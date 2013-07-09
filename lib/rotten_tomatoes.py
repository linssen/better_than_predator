import json

import requests

API_BASE = 'http://api.rottentomatoes.com/api/public/v1.0'


class ROTTEN(object):

    def get_film(self, film_id):
        """Get a single film using it's ID."""
        # Get ratings first
        resource = 'movies/%s/reviews.json' % film_id
        params = dict(
            review_type='top_critic', page_limit=20,
            page=1, country='uk'
        )
        ratings = []
        for review in self.api_call(resource, params)['reviews']:
            # They don't always have an original score
            try:
                ratings.append(review['original_score'])
            except(KeyError):
                pass

        avg_score = sum([self.parse_score(r) for r in ratings]) / len(ratings)
        avg_score = avg_score * 100

        # Get film info second
        resource = 'movies/%s.json' % film_id
        film = self.api_call(resource)
        film['avg_score'] = avg_score
        return film

    def parse_score(self, score_string):
        """Accepts a score like 4/5 and converts to a float."""
        score_parts = score_string.split('/', 1)
        return float(score_parts[0]) / float(score_parts[1])

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
