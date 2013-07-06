import re
import json
from datetime import datetime

from flask import Flask
from flask import render_template, url_for, redirect,\
    request, flash, abort, Response, jsonify

import requests

import settings
from lib.rotten_tomatoes import ROTTEN
import jinja_filters

app = Flask(__name__)
app.debug = settings.DEBUG
app.secret_key = settings.SECRET_KEY
app.jinja_env.filters['datetimeformat'] = jinja_filters.datetimeformat


api = ROTTEN(settings.APIKEY)

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
    limit = request.args.get('limit', 50, type=int)
    page = request.args.get('page', 1, type=int)

    if not title:
        return Response(status=204)

    films = api.search_title(title, page, limit)
    if not films:
        abort(404)

    return jsonify(films)


@app.route('/versus', methods=['POST'])
@app.route('/versus/<film_id>/<title>', methods=['GET'])
def versus(film_id=None, title=None):
    """Give me a film."""
    if request.method == 'POST':
        film_id = request.form.get('film_id', None)

    if not film_id:
        flash('I need a film to compare')
        return redirect(url_for('home'))

    versus = api.get_film(film_id)

    if not versus:
        flash('Sorry, I could&rsquo;t find &lsquo;%s&rsquo;' % title)
        return redirect(url_for('home'))

    url_title = versus['title'].\
        replace('&amp;', 'and').\
        replace(' ', '-').\
        lower()
    url = url_for(
        'versus',
        film_id=film_id,
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
