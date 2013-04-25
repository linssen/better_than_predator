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

Install the Node packages

    git submodule add git://github.com/jquery/qunit.git static/scripts/test/qunit
    git submodule init
    git submodule update
    npm install

Add a legitimately secret key to a new `local_settings.py`

    echo "SECRET_KEY = 'write something here'" > local_settings.py

Run the app

    python imdb_versus.py

Build the static files with Grunt

    # Build the production ready files
    grunt
    # Build the files quickly
    grunt dev
    # Watch the files to automatically build them on change
    grunt watch

![predator](https://f.cloud.github.com/assets/67624/415163/75afa1ae-ac2c-11e2-8a16-cab25bf1a58e.png)