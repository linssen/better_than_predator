import os
import json

import requests
import requests_cache

_here = os.path.dirname(os.path.abspath(__file__))


class API_Base(object):
    def __init__(self, base_url=None):
        self.base_url = base_url
        self._install_cache()

    def _install_cache(self):
        """Set up the requests cache with sqlite."""
        cache_path = os.path.join(_here, '..', 'cache')
        requests_cache.install_cache(cache_name=cache_path, expire_after=172800)

    def search_title(self, title, page=0, limit=0):
        pass

    def get_film(self, film_id):
        pass

    def get_poster(self, url, film_id):

        if url is None:
            return None

        image_path = 'static/images/posters/%s.jpg' % film_id
        path = os.path.join(_here, '..', image_path)

        if os.path.isfile(path):
            return image_path

        r = requests.get(url)
        if r.status_code != requests.codes.ok:
            return None

        with open(path, 'wb') as f:
            for chunk in r.iter_content(1024):
                f.write(chunk)

        return image_path
