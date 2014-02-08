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
    }]);