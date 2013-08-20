import re

from bs4 import BeautifulSoup
import requests
import html5lib


class IMDB(object):
    def search_title(self, title, limit=0):
        """Searches for films by title."""
        r = requests.get('%s/find?q=%s' % (self.base_url, title))

        if r.status_code != requests.codes.ok:
            return False

        soup = BeautifulSoup(r.text, 'html5lib')
        results = soup.find_all('div',  class_='poster')
        re_id = re.compile(r'\/(\w{2}\d+)\/')
        re_year = re.compile(r'\((\d{4}|in development)\)')
        films = []

        if len(results) == 0:
            return None

        for result in results:
            title = result.a.text
            imdb_id = re.search(re_id, result.a['href']).group(1)
            match = re.search(re_year, str(result))
            if match:
                year = match.group(1)
            else:
                year = 'Not yet released'
            # Sometimes the year is a string like 'in development'
            try:
                year = int(year)
            except(ValueError):
                pass
            # Sometimes there is an AKA surrounded by quotes
            if result.i:
                aka = result.i.text[1:-1]
            else:
                aka = None

            films.append(dict(
                title=title,
                aka=aka,
                imdb_id=imdb_id,
                year=year,
            ))

        if limit > 0:
            return films[:limit]

        return films

    def get_film(self, imdb_id):
        """Retrieves a specific film by ID."""
        r = requests.get('%s/title/%s/' % (self.base_url, imdb_id))
        if r.status_code != requests.codes.ok:
            return False

        soup = BeautifulSoup(r.text)

        title = soup.h1.find('span', attrs={'itemprop': 'name'}).text
        rating = float(soup.find('span', attrs={'itemprop': 'ratingValue'}).text)
        rating_count = int(soup.find('span', attrs={'itemprop': 'ratingCount'}).text.replace(',', ''))
        release_date = soup.find('div', class_='infobar').find('meta', attrs={'itemprop': 'datePublished'})['content']
        year = release_date[:4]

        film = dict(
            imdb_id=imdb_id,
            title=title,
            rating=rating,
            rating_count=rating_count,
            release_date=release_date,
            year=year,
        )

        return film

    def __init__(self):
        self.base_url = 'http://m.imdb.com'
