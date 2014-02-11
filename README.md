Better than Predator
===============================================================================

[![Build Status](https://travis-ci.org/linssen/better_than_predator.png?branch=master)](https://travis-ci.org/linssen/better_than_predator)

Installation
-------------------------------------------------------------------------------

Clone the repo

```sh
git clone https://github.com/linssen/better_than_predator
```

Install the requirements packages

```sh
npm install
bower install
```

Build the static files with Grunt

```sh
# Build the production ready files
grunt
# Build the files quickly
grunt dev
# Watch the files to automatically build them on change
grunt watch
```

Run a simple server with `python -m SimpleHTTPServer` or point a virtualhost
to your development directory.

Testing
-------------------------------------------------------------------------------

Install [protractor](https://github.com/angular/protractor) and webdriver

```sh
npm install -g protractor
webdriver-manager update
```

e2e (protractor) tests are in static/test/integration, unit tests (jasmine)
are in static/test/unit

Single run tests with `grunt test` or `grunt protractor` or
`grunt karma:continuous`. Note you must have a webdriver running for Protractor
so `webdriver-manager start` before running integration tests.

Watch the project and launch a karma server with `grunt unit:start:watch watch`
the tests will then run as the watched files change.

![predator](https://f.cloud.github.com/assets/67624/415163/75afa1ae-ac2c-11e2-8a16-cab25bf1a58e.png)
