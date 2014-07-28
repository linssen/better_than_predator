'use strict';

angular.module('btp.controllers', [])
    .controller('SearchCtrl', ['$scope',
        function ($scope) {
            var watching;
            watching = true;
            $scope.films = [];
            $scope.title = '';
        }]
    )
    .controller('VersusCtrl', ['$scope', '$routeParams', '$location', '$q', '$window', 'Film',
        function ($scope, $routeParams, $location, $q, $window, Film) {
            $q.all([
                Film.single.get({id: PREDATOR}),
                Film.single.get({id: $routeParams.id})
            ]).then(function (result) {
                $scope.films = [result[0], result[1]];
            });

            $scope.now = new Date();
            $scope.shareUrl = $window.encodeURIComponent(
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