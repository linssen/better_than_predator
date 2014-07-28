Better than Predator
===============================================================================

[ ![Codeship Status for linssen/better_than_predator](https://codeship.io/projects/401ec2e0-f560-0131-175b-225f727abe9a/status)](https://codeship.io/projects/28285)

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

![predator](https://f.cloud.github.com/assets/67624/415163/75afa1ae-ac2c-11e2-8a16-cab25bf1a58e.png)
