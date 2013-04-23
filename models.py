import requests

API_BASE = 'http://imdbapi.org'


class Film(object):
    """A representaion of an IMDB film."""
    def lookup(self):
        payload = {
            'q': self.title,
            'type': 'json',
            'plot': 'none',
            'episode': 0,
            'lang': 'en-US',
            'aka': 'simple',
            'release': 'simple',
            'business': 0,
            'tech': 0,
        }
        r = requests.get('%s' % API_BASE, params=payload)
        if r.status_code == requests.codes.ok:
            try:
                film = r.json()[0]
            except(KeyError):
                return False
            self.title = film['title']
            self.imdb_id = film['imdb_id']
            self.rating = film['rating']
            self.rating_count = film['rating_count']
            self.year = film['year']
            return True

        return False

    def __init__(self, title):
        self.title = title
        self.imdb_id = None
        self.rating = 0
        self.rating_count = 0
        self.year = 0
