/*global angular*/
'use strict';

var btpApp = angular.module('btpApp', [
    'ngRoute',
    'ngResource',

    'ui.select2',

    'btpControllers',
    'btpServices'
]);
var btpControllers = angular.module('btpControllers', []);
var btpServices = angular.module('btpServices', ['ngResource']);
var PREDATOR = 'tt0093773';

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
        $scope.select2 = {
            minimumInputLength: 2,
            ajax: {
                url: "http://mymovieapi.com/",
                dataType: 'json',
                quietMillis: 100,
                data: function (term, page) {
                    return {
                        q: term, // search term
                        limit: 10,
                        offset: (page - 1) * 10,
                        type: 'json',
                        plot: 'simple',
                        lang: 'en-US'
                    };
                },
                results: function (data, page) {
                    return {results: data.result};
                }
            },
            id: function (film) { return film.imdb_id; },
            formatResult: function (film) { return film.title; },
            formatSelection: function (film) { return film.title; }
        };
    }]);

btpControllers.controller('VersusCtrl', ['$scope', '$routeParams', 'Film',
    function ($scope, $routeParams, Film) {
        $scope.films = Film.compare(
            {ids: [PREDATOR, $routeParams.imdbID]}
        );
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
                        q: 'Predator',
                        limit: 10
                    },
                    isArray: true
                },
                compare: {
                    method: 'GET',
                    params: {
                        ids: [PREDATOR, 'tt0100403']
                    },
                    isArray: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        data = data.map(function (d) {
                            var dateString, oDate;
                            oDate = '' + d.release_date;
                            dateString = [
                                parseInt(oDate.slice(0, 4), 10),
                                parseInt(oDate.slice(4, 6), 10),
                                parseInt(oDate.slice(6, 8), 10)
                            ];
                            d.release_date = new Date(dateString);
                            return d;
                        });
                        return data;
                    }
                }
            });
    }]);