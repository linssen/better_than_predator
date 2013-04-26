import re
from datetime import datetime

from flask import Flask
from flask import render_template, url_for, redirect, request, flash, abort, Response, jsonify

import settings
import jinja_filters
from lib.imdb_api import IMDB

app = Flask(__name__)
app.debug = settings.DEBUG
app.secret_key = settings.SECRET_KEY
app.jinja_env.filters['datetimeformat'] = jinja_filters.datetimeformat

API_BASE = 'http://imdbapi.org'
imdb = IMDB()


@app.context_processor
def now():
    return dict(now=datetime.now())


@app.route('/', methods=['GET'])
def home():
    """Give me a film."""
    comparator = dict(title='Predator')

    return render_template('index.html', comparator=comparator)


@app.route('/_versus')
def _versus():
    title = request.args.get('versus', None, type=str)
    limit = request.args.get('limit', 0, type=int)
    if not title:
        return Response(status=204)

    films = imdb.search_title(title, limit)
    if films:
        return jsonify(films=films)

    abort(404)


@app.route('/versus', methods=['POST'])
@app.route('/versus/<imdb_id>/<title>', methods=['GET'])
def versus(imdb_id=None, title=None):
    """Give me a film."""
    if request.method == 'POST':
        imdb_id = request.form.get('imdb_id', None)

    if not imdb_id:
        flash('I need a film to compare')
        return redirect(url_for('home'))

    comparator = imdb.get_film(settings.COMPARATOR)

    versus = imdb.get_film(imdb_id)

    if not versus:
        flash('Sorry, I could&rsquo;t find &lsquo;%s&rsquo;' % title)
        return redirect(url_for('home'))

    url_title = versus['title'].\
        replace('&amp;', 'and').\
        replace(' ', '-').\
        lower()
    url = url_for(
        'versus',
        imdb_id=imdb_id,
        title=re.sub('[^A-Za-z0-9-]+', '', url_title),
        _external=True,
        _method='GET',
    )

    return render_template(
        'versus.html',
        comparator=comparator,
        versus=versus,
        url=url,
    )

if __name__ == '__main__':
    app.run()
