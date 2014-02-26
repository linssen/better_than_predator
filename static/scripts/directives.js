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
            templateUrl: '../static/scripts/templates/star-rating.tpl.html',
            scope: {
                id: '@id',
                rating: '@rating'
            },

            link: function (scope, element, attrs) {
                var buildStars, height, outof, rows, rowMod,
                    setAttributes, width;

                scope.stars = [];
                scope.clipPath = {id: 0, width: 0};
                width = attrs['star-width'] || 51;
                height = attrs['star-height'] || 49;
                outof = attrs['out-of'] || 10;
                rows = parseInt(attrs.rows) || 1;
                rowMod = Math.floor(outof / rows);

                buildStars = function (rating, id) {
                    var i, integer;
                    i = 0;
                    integer = Math.floor(rating);
                    scope.clipPath = {id: 'clip' + id, width: rating - integer};

                    for (i; i < outof; i += 1) {
                        scope.stars.push({
                            clip: i === integer ? true : false,
                            active: i <= integer ? true : false,
                            transform: 'translate(' +
                                ((i % rowMod) * width) + ', ' +
                                (Math.floor(i / rowMod) * height) +
                            ')'
                        });
                    }
                };

                setAttributes = function () {
                    var svg, viewBox;
                    svg = element.find('svg').get(0);
                    viewBox = {width: width * rowMod, height: height * rows};
                    svg.setAttribute('width', viewBox.width);
                    svg.setAttribute('height', viewBox.height);
                    svg.setAttribute('viewBox', '0,0,' + viewBox.width + ',' + viewBox.height);
                    return svg;
                };

                scope.$watch('rating', function (newval) {
                    if (!newval) { return; }
                    setAttributes();
                    buildStars(newval, scope.id);
                }, true);

            },
        };
    }
);
