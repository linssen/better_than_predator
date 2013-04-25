import re

from flask import Flask
from flask import render_template, url_for, redirect, request, flash

import settings
from models import Film

app = Flask(__name__)
app.debug = settings.DEBUG
app.secret_key = settings.SECRET_KEY


@app.route('/', methods=['GET'])
def home():
    """Give me a film."""
    comparator = Film(settings.COMPARATOR)
    comparator.lookup()

    return render_template('index.html', comparator=comparator)


@app.route('/versus', methods=['POST'])
@app.route('/versus/<title>', methods=['GET'])
def versus(title=None):
    """Give me a film."""
    if request.method == 'POST' and request.form['versus']:
        title = request.form['versus']

    if not title:
        flash('I need a film to compare')
        return redirect(url_for('home'))

    comparator = Film(settings.COMPARATOR)
    comparator.lookup()

    versus = Film(title)

    if not versus.lookup():
        flash('Sorry, I could&rsquo;t find &lsquo;%s&rsquo;' % title)
        return redirect(url_for('home'))

    url_title = versus.title.\
        replace('&amp;', 'and').\
        replace(' ', '-').\
        lower()
    url = url_for(
        'versus',
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
