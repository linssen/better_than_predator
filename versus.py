from flask import Flask
from flask import render_template

import settings

app = Flask(__name__)
app.debug = settings.DEBUG
app.secret_key = settings.SECRET_KEY


@app.route('/', methods=['GET'])
def home():
    """Give me a film."""
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
