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
            .when('/versus/:imdbID/:title', {
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
                data: function (term, page) {
                    return {
                        q: term, // search term
                        page_limit: 10,
                        page: page * 10,
                        apikey: ''
                    };
                },
                results: function (data, page) {
                    return {results: data.movies};
                }
            },
            id: function (film) { return film.id; },
            formatResult: function (film) {
                return ':title (:year)'
                    .replace(':title', film.title)
                    .replace(':year', film.year);
            },
            formatSelection: function (film) { return film.title; }
        };
    }]);

btpControllers.controller('VersusCtrl', ['$scope', '$routeParams', '$location', '$window', 'Film',
    function ($scope, $routeParams, $location, $window, Film) {
        $scope.films = Film.compare(
            {ids: [PREDATOR, $routeParams.id].join()}
        );
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
                type: 'jsonp'
            },
            {
                query: {
                    method: 'GET',
                    isArray: true
                },
                compare: {
                    method: 'GET',
                    isArray: false,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        data = data.map(function (d) {
                            var dateParts;
                            dateParts = d.release_dates.theater.split('-');
                            d.release_date = new Date(dateParts.reverse());
                            return d;
                        });
                        return data;
                    }
                }
            });
    }]);
