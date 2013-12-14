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

btpControllers.controller('VersusCtrl', ['$scope', '$routeParams', '$location', '$window', 'Film',
    function ($scope, $routeParams, $location, $window, Film) {
        $scope.films = Film.compare({id: $routeParams.id});
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
                compare: {
                    method: 'JSONP',
                    isArray: true,
                    id: '@id',
                    transformResponse: function (data) {
                        var films, date;
                        data.ratings.combined = (data.ratings.critics_score + data.ratings.audience_score) / 2;
                        date = data.release_dates.theater || data.release_dates.dvd || null;
                        if (data.release_dates.computed) {
                            data.release_dates.computed = new Date(date.split('-').reverse());
                        }
                        films = [
                            {
                                id: "16751",
                                title: "Predator",
                                year: 1987,
                                release_dates: {
                                    theater: "1987-06-12",
                                    dvd: "2000-12-26",
                                    computed: new Date(1987, 6, 12)
                                },
                                ratings: {
                                    critics_rating: "Certified Fresh",
                                    critics_score: 78,
                                    audience_rating: "Upright",
                                    audience_score: 87,
                                    combined: (78 + 87) / 2
                                },
                                posters: {
                                    thumbnail: "http://content7.flixster.com/movie/11/16/49/11164941_mob.jpg",
                                    profile: "http://content7.flixster.com/movie/11/16/49/11164941_pro.jpg",
                                    detailed: "http://content7.flixster.com/movie/11/16/49/11164941_det.jpg",
                                    original: "http://content7.flixster.com/movie/11/16/49/11164941_ori.jpg"
                                },
                                alternate_ids: {
                                    imdb: "0093773"
                                }
                            },
                            data
                        ];
                        return films;
                    }
                }
            });
    }]);
