/*global angular*/
'use strict';

var btpApp = angular.module('btpApp', [
    'ngRoute',
    'ngResource',

    'btpControllers',
    'btpServices'
]);
var btpControllers = angular.module('btpControllers', []);
var btpServices = angular.module('btpServices', ['ngResource']);

btpApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/versus/:imdbID', {
                templateUrl: 'static/scripts/templates/versus.html',
                controller: 'VersusCtrl'
            })
            .when('/', {
                templateUrl: 'static/scripts/templates/search.html',
                controller: 'SearchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);


btpControllers.controller('SearchCtrl', ['$scope', 'Film',
    function ($scope, Film) {
        $scope.films = Film.query();
    }]);

btpControllers.controller('VersusCtrl', ['$scope', 'Film',
    function ($scope, Film) {
        $scope.films = Film.query();
    }]);


btpServices.factory('Film', ['$resource',
    function ($resource) {
        return $resource('http://mymovieapi.com/',
            {
                type: 'json',
                plot: 'simple',
                lang: 'en-US'
            },
            {
                query: {
                    method: 'GET',
                    params: {
                        ids: ['tt0093773', 'tt0100403'].join(',')
                    },
                    isArray: true
                }
            });
    }]);