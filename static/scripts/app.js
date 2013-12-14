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
var PREDATOR = '16751';

btpApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/versus/:id/:title', {
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

btpApp.filter('urlize', function () {
    return function (str) {
        str = str
            .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/\s/g, '-')
            .toLowerCase();
        return window.encodeURIComponent(str);
    };
});


btpControllers.controller('SearchCtrl', ['$scope', 'Film',
    function ($scope, Film) {
        $scope.select2 = {
            minimumInputLength: 2,
            ajax: {
                url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                dataType: 'jsonp',
                quietMillis: 100,
                data: function (term) {
                    return {
                        q: term,
                        page_limit: 10,
                        page: 1,
                        apikey: '6ynntf95p6h4pb8df3v73r7q'
                    };
                },
                results: function (data) {
                    return {results: data.movies};
                }
            },
            id: function (film) { return film.id; },
            formatResult: function (film) {
                return '<img src=":thumb" height="40" alt=":title"> :title (:year)'
                    .replace(/\:title/g, film.title)
                    .replace(/\:thumb/g, film.posters.thumbnail)
                    .replace(/\:year/g, film.year);
            },
            formatSelection: function (film) { return film.title; }
        };
    }]);

btpControllers.controller('VersusCtrl', ['$scope', '$routeParams', '$location', '$q', '$window', 'Film',
    function ($scope, $routeParams, $location, $q, $window, Film) {
        $q.all([
            Film.get({id: PREDATOR}),
            Film.get({id: $routeParams.id})
        ]).then(function (result) {
            $scope.films = [result[0], result[1]];
        });

        $scope.now = new Date();
        $scope.shareUrl = window.encodeURIComponent(
            'http://betterthanpredator.com/#' + $location.path()
        );

        $scope.$on('$routeChangeSuccess', function () {
            $window._gaq.push(['_trackPageview', $location.path()]);
            $window._gaq.push([
                '_trackEvent',
                'Film',
                'Compare',
                $routeParams.id + ' - ' + $routeParams.title
            ]);

        });
    }]);

btpServices.factory('Film', ['$resource',
    function ($resource) {
        return $resource('http://api.rottentomatoes.com/api/public/v1.0/movies/:id.json',
            {
                apikey: '6ynntf95p6h4pb8df3v73r7q',
                callback: 'JSON_CALLBACK'
            },
            {
                query: {
                    method: 'JSONP',
                    isArray: true,
                    id: '',
                    transformResponse: function (data) {
                        return data.movies;
                    }
                },
                get: {
                    method: 'JSONP',
                    isArray: false,
                    id: '@id',
                    transformResponse: function (data) {
                        var date;
                        data.ratings.combined = (data.ratings.critics_score + data.ratings.audience_score) / 2;
                        date = data.release_dates.theater || data.release_dates.dvd || null;
                        if (data.release_dates.computed) {
                            data.release_dates.computed = new Date(date.split('-').reverse());
                        }

                        return data;
                    }
                }
            });
    }]);
