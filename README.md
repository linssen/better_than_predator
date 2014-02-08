Better than Predator
===============================================================================

Installation
-------------------------------------------------------------------------------

Clone the repo

    git clone https://github.com/linssen/better_than_predator

Install the Node packages

    git submodule add git://github.com/jquery/qunit.git static/scripts/test/qunit
    git submodule init
    git submodule update
    npm install

Build the static files with Grunt

    # Build the production ready files
    grunt
    # Build the files quickly
    grunt dev
    # Watch the files to automatically build them on change
    grunt watch

Testing
-------------------------------------------------------------------------------

e2e (protractor) tests are in static/test/specs, unit tests (jasmine) are in
static/test/unit

Single run tests with `grunt test` or `grunt protractor` or
`grunt karma:continuous`.

Watch the project and launch a karma server with `grunt unit:start:watch watch`
the tests will then run as the watched files change.

![predator](https://f.cloud.github.com/assets/67624/415163/75afa1ae-ac2c-11e2-8a16-cab25bf1a58e.png)