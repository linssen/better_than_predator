/*global angular*/
'use strict';

var PREDATOR = '16751';

angular.module('btpApp', [
    'ngRoute',
    'ngResource',
    'btp.controllers',
    'btp.services',
    'btp.directives'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/versus/:id/:title', {
            templateUrl: 'static/scripts/templates/versus.tpl.html',
            controller: 'VersusCtrl'
        })
        .when('/', {
            templateUrl: 'static/scripts/templates/search.tpl.html',
            controller: 'SearchCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
