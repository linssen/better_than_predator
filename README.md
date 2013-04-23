Better than Predator
===============================================================================

Installation
-------------------------------------------------------------------------------

Clone the repo

    git clone https://github.com/linssen/better_than_predator

Create a virtualenv and install required packages

    virtualenv --distribute env
    source env/bin/activate
    pip install -r requirements.pip

Add a legitimately secret key to a new `local_settings.py`

    echo "SECRET_KEY = 'write something here'" > local_settings.py

Run the app

    python app.py