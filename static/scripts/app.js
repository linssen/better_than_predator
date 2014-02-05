/*global angular*/
'use strict';

var PREDATOR = '16751';

angular.module('btpApp', [
    'ngRoute',
    'ngResource',
    'btp.controllers',
    'btp.services'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/versus/:id/:title', {
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

angular.module('btp.filters', [])
    .filter('urlize', function () {
        return function (str) {
            str = str
                .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '')
                .replace(/\s{2,}/g, ' ')
                .replace(/\s/g, '-')
                .toLowerCase();
            return window.encodeURIComponent(str);
        };
    });


angular.module('btp.controllers', [])
    .controller('SearchCtrl', ['$scope', 'Film',
        function ($scope, Film) {
            var watching;
            watching = true;
            $scope.films = [];
            $scope.title = '';
            $scope.$watch('title', function (newValue, oldValue) {
                if (newValue.length < 3) { return; }
                $scope.films = Film.query({q: newValue});
            });
        }]
    )
    .controller('VersusCtrl', ['$scope', '$routeParams', '$location', '$q', '$window', 'Film',
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
        }]
    );

angular.module('btp.services', [])
    .factory('Film', ['$resource',
        function ($resource) {
            var defaultParams;
            defaultParams = {
                apikey: '6ynntf95p6h4pb8df3v73r7q',
                callback: 'JSON_CALLBACK'
            };
            return $resource('http://api.rottentomatoes.com/api/public/v1.0/movies/:id.json',
                defaultParams,
                {
                    query: {
                        method: 'JSONP',
                        isArray: true,
                        params: {
                            q: 'honey',
                            page_limit: 10,
                            page: 1
                        },
                        transformResponse: function (data) {
                            return data.movies;
                        }
                    },
                    get: {
                        method: 'JSONP',
                        isArray: false,
                        transformResponse: function (data) {
                            var date;
                            data.ratings.combined = (data.ratings.critics_score + data.ratings.audience_score) / 2;
                            data.ratings.combined = Math.round(data.ratings.combined) / 10;
                            date = data.release_dates.theater || data.release_dates.dvd || null;
                            if (data.release_dates.computed) {
                                data.release_dates.computed = new Date(date.split('-').reverse());
                            }

                            return data;
                        }
                    }
                }
            );
        }
    ]);
