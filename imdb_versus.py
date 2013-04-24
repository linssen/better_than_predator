import urllib

from flask import Flask
from flask import render_template, url_for, redirect, request, flash

import settings
from models import Film

app = Flask(__name__)
app.debug = True
app.secret_key = settings.SECRET_KEY


@app.route('/', methods=['GET', 'POST'])
def home():
    """Give me a film."""
    if request.method == 'POST' and request.form['versus']:
        title = urllib.quote(request.form['versus'].replace(' ', '-'))
        return redirect(url_for('compare', title=title))

    comparator = Film(settings.COMPARATOR)
    comparator.lookup()

    return render_template('index.html', comparator=comparator)


@app.route('/<title>', methods=['GET'])
def compare(title):
    """Give me a film."""
    comparator = Film(settings.COMPARATOR)
    comparator.lookup()

    versus = Film(title)
    if not versus.lookup():
        flash('Sorry, I could&rsquo;t find &lsquo;%s&rsquo;' % title)
        return redirect(url_for('home'))

    return render_template('versus.html', comparator=comparator, versus=versus)

if __name__ == '__main__':
    app.run()
