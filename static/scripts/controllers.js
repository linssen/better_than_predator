angular.module('btp.controllers', [])
    .controller('SearchCtrl', ['$scope', 'Film',
        function ($scope, Film) {
            var watching;
            watching = true;
            $scope.films = [];
            $scope.title = '';
            $scope.$watch('title', _.debounce(function (newValue, oldValue) {
                if (newValue.length < 3) { return; }
                $scope.films = Film.query({q: newValue});
            }, 100));
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