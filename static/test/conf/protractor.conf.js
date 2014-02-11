'use strict';

exports.config = {

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['../integration/*.js'],

    baseUrl: 'http://localhost:9001',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showColors: true
    }
};