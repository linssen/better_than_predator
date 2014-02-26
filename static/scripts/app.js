/*global angular*/
'use strict';

angular.module('btpApp', [
    'ngRoute',
    'ngResource',
    'btp.controllers',
    'btp.services',
    'btp.directives',
    'btp.filters',
    'templates-main'
])
.constant('PREDATOR', '16751')
.constant('API_KEY', '6ynntf95p6h4pb8df3v73r7q')
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/versus/:id/:title', {
        templateUrl: '../static/scripts/templates/versus.tpl.html',
        controller: 'VersusCtrl'
    })
    .when('/', {
        templateUrl: '../static/scripts/templates/search.tpl.html',
        controller: 'SearchCtrl'
    })
    .otherwise({
        templateUrl: '../static/scripts/templates/404.tpl.html',
    });
}]);
