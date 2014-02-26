'use strict';

angular.module('btp.filters', [])
    .filter('urlize', ['$window', function ($window) {
        return function (str) {
            str = str
                .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '')
                .replace(/\s{2,}/g, ' ')
                .replace(/\s/g, '-')
                .toLowerCase();
            return $window.encodeURIComponent(str);
        };
    }])
    .filter('truncate', function () {
        return function (str, len) {
            str = '' + str;
            return str.length > len ? str.slice(0, len - 1) + '…' : str;
        };
    });