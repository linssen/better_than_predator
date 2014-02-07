'use strict';

angular.module('btp.directives', [])
    .directive('ngFilmAutocomplete', function (Film) {
        return {
            restrict: 'A',
            templateUrl: '../static/scripts/templates/film-auto-complete.tpl.html',
            link: function (scope) {
                scope.$watch('title', _.debounce(function (newValue) {
                    if (newValue && newValue.length < 3) { return; }
                    scope.films = Film.query({q: newValue});
                }, 100));
            }
        };
    }
);