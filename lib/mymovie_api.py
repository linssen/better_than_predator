import os
import re
import json

import requests
import requests_cache

from lib.api_base import API_Base


class IMDB(API_Base):

    def __init__(self):
        super(IMDB, self).__init__(base_url='http://mymovieapi.com')

    def search_title(self, title, page=0, limit=10,):
        payload = dict(
            title=title,
            offset=page,
            limit=limit,
            type='json',
            plot='simple',
            episode=1,
            yg=0,
            mt='M',
            lang='en-US',
            aka='simple',
            release='simple',
            business=0,
            tech=0,
        )

        r = requests.get(self.base_url, params=payload)

        if r.status_code != requests.codes.ok:
            return None

        return json.loads(r.content)

    def get_film(self, film_id):
        payload = dict(
            id=film_id,
            type='json',
            plot='simple',
            episode=1,
            lang='en-US',
            aka='simple',
            release='simple',
            business=0,
            tech=0,
        )
        r = requests.get(self.base_url, params=payload)

        if r.status_code != requests.codes.ok:
            return None

        content = json.loads(r.content)
        poster = None
        if content['poster']['cover']:
            poster = content['poster']['cover']
        elif content['poster']['imdb']:
            poster = content['poster']['cover']

        content['poster'] = self.get_poster(poster, film_id)

        return json.loads(r.content)
