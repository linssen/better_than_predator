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
            templateUrl: '../static/scripts/templates/film-stars.tpl.html',
            scope: true,

            link: function (scope, element, attrs) {
                var buildStars, height, setAttributes, width;

                scope.stars = [];
                scope.clipPath = {id: 0, width: 0};
                width = attrs['star-width'] || 51;
                height = attrs['star-height'] || 49;

                buildStars = function (rating, filmID) {
                    var i, integer;
                    i = 0;
                    integer = Math.floor(rating);
                    scope.clipPath = {id: 'clip' + filmID, width: rating - integer};

                    for (i; i < 10; i += 1) {
                        scope.stars.push({
                            clip: i === integer ? true : false,
                            active: i <= integer ? true : false,
                            transform: 'translate(' +
                                ((i % 5) * width) + ', ' +
                                (Math.floor(i / 5) * height) +
                            ')'
                        });
                    }
                };

                setAttributes = function () {
                    var svg, viewBox;
                    svg = element.find('svg').get(0);
                    viewBox = {width: width * 5, height: height * 2};
                    svg.setAttribute('width', viewBox.width);
                    svg.setAttribute('height', viewBox.height);
                    svg.setAttribute('viewBox', '0,0,' + viewBox.width + ',' + viewBox.height);
                    return svg;
                };

                scope.$watch('film', function (newval) {
                    if (!newval.ratings) { return; }
                    setAttributes();
                    buildStars(newval.ratings.combined, newval.id);
                }, true);

            },
        };
    }
);
