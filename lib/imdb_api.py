import re

from bs4 import BeautifulSoup
import requests
import html5lib


class IMDB(object):
    def search_title(self, title, limit=0):
        """Searches for films by title."""
        r = requests.get('%s/find?q=%s&s=tt&ttype=ft' % (self.base_url, title))

        if r.status_code != requests.codes.ok:
            return False

        soup = BeautifulSoup(r.text, 'html5lib')
        results = soup.find_all('tr', 'findResult')
        re_id = re.compile(r'\/(tt\d+)\/')
        re_year = re.compile(r'\((\d{4}|in development)\)')
        re_img = re.compile(r'M\/(.*)S(X|Y)')
        films = []

        if len(results) == 0:
            return None

        for result in results:
            result_text = result.find('td', class_='result_text')
            title = result_text.a.text
            film_id = re.search(re_id, result.a['href']).group(1)
            image = result.img['src']
            if 'nopicture' in image:
                thumb = None
                poster = None
                img_id = None
            else:
                match = re.search(re_img, image)
                img_id = match.group(1)
                anchor = match.group(2)
                thumb_w = 145
                thumb_h = 200
                if anchor == 'X':
                    source_point = thumb_w
                else:
                    source_point = thumb_h
                media_url = 'http://ia.media-imdb.com/images/M'
                thumb = '%s/%sS%s%d_CR0,0,%d,%d_.jpg' % (
                    media_url, img_id, anchor, source_point, thumb_w, thumb_h
                )
                poster = '%s/%s.jpg' % (media_url, img_id)
            year = re.search(re_year, str(result_text)).group(1)
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
                id=film_id,
                year=year,
                img_id=img_id,
                thumb=thumb,
                poster=poster,
            ))

        if limit > 0:
            return films[:limit]

        return films

    def get_film(self, film_id):
        """Retrieves a specific film by ID."""
        r = requests.get('%s/title/%s/' % (self.base_url, film_id))
        if r.status_code != requests.codes.ok:
            return False

        soup = BeautifulSoup(r.text)

        title = soup.h1.find('span', attrs={'itemprop': 'name'}).string
        rating = soup.find('span', attrs={'itemprop': 'ratingValue'}).string
        rating_count = soup.find('span', attrs={'itemprop': 'ratingCount'}).string
        release_date = soup.find('div', class_='infobar').find('meta', attrs={'itemprop': 'datePublished'})['content']

        film = dict(
            id=film_id,
            title=title,
            rating=rating,
            rating_count=rating_count,
            release_date=release_date,
        )

        return film

    def __init__(self):
        self.base_url = 'http://www.imdb.com'
