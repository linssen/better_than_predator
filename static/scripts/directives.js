'use strict';

angular.module('btp.directives', ['btp.filters'])
    .directive('ngFilmAutocomplete', function ($location, $filter, Film) {
        return {
            restrict: 'A',
            templateUrl: '../static/scripts/templates/film-autocomplete.tpl.html',
            link: function (scope, element) {
                var autocomplete, choose, click, keys, keyup, nav;

                keys = {up: 38, down: 40, enter: 13};
                scope.activeIndex = 0;

                autocomplete = function (newValue) {
                    if (newValue && newValue.length < 3) { return; }
                    scope.films = Film.query({q: newValue});
                };
                keyup = function (ev, element) {
                    switch (ev.which) {
                    case keys.up:
                    case keys.down:
                        ev.preventDefault();
                        nav(ev.which === keys.down ? 1 : -1);
                        break
                    case keys.enter:
                        ev.preventDefault();
                        choose();
                    };
                };
                nav = function (direction) {
                    var numFilms;
                    numFilms = scope.films.length;
                    scope.activeIndex += direction;
                    if (scope.activeIndex < 0) { scope.activeIndex = 0; return; }
                    if (scope.activeIndex >= numFilms) { scope.activeIndex = numFilms - 1; return; }
                    scope.$apply();
                };
                choose = function () {
                    var film, path;
                    film = scope.films[scope.activeIndex];
                    path = '/versus/:id/:title'
                        .replace(':id', film.id)
                        .replace(':title', $filter('urlize')(film.title));
                    $location.path(path);
                    scope.$apply();
                };

                // Bindings etc.
                scope.$watch('title', _.debounce(autocomplete, 100));
                element.bind('keyup', keyup);
            }
        };
    }
);