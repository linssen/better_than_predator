'use strict';

angular.module('btp.directives', ['btp.filters'])
    .directive('ngFilmAutocomplete', function ($location, $filter, Film) {
        return {
            restrict: 'A',
            templateUrl: '../static/scripts/templates/film-autocomplete.tpl.html',
            link: function (scope, element) {
                var autocomplete, choose, keys, keyup, queryBox,
                    queryBoxSelector, nav;

                keys = {up: 38, down: 40, enter: 13};
                scope.activeIndex = 0;
                queryBoxSelector = 'search__query__input';
                queryBox = element.find('.' + queryBoxSelector);

                autocomplete = function (newValue) {
                    if (!newValue || newValue.length < 2) { return; }
                    queryBox.addClass(queryBoxSelector + '--loading');
                    scope.films = Film.query({q: newValue});
                    scope.films.$promise.then(function () {
                        queryBox.removeClass(queryBoxSelector + '--loading');
                    });
                };
                keyup = function (ev) {
                    switch (ev.which) {
                    case keys.up:
                    case keys.down:
                        ev.preventDefault();
                        nav(ev.which === keys.down ? 1 : -1);
                        break;
                    case keys.enter:
                        ev.preventDefault();
                        choose();
                    }
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
                scope.$watch('query', _.debounce(autocomplete, 100));
                element.bind('keyup', keyup);
            }
        };
    })
    .directive('ngStars', function () {
        return {
            restrict: 'A',
            templateUrl: '../static/scripts/templates/film-stars.tpl.html',  // transclude: true,

            scope: true,

            link: function (scope, element, attrs) {
                scope.stars = {on: 0, off: 0};
                scope.$watch('film', function(newval, oldval) {
                    if (newval.ratings) {
                        scope.stars.on = (newval.ratings.combined / 10) * 100;
                        scope.stars.off = 100 - scope.stars.on;
                    }
                }, true);
            }
        }
    }
);