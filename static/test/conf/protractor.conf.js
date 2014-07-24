'use strict';

exports.config = {

    seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
    },

    specs: ['../integration/*.js'],

    baseUrl: 'http://localhost:9001',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showColors: true
    }
};