'use strict';

describe('BTP controllers', function () {
    var API_BASE, controller, expectedFilms, filmResource, httpBackend, scope;

    beforeEach(module('ngResource'));
    beforeEach(module('ngRoute'));
    beforeEach(module('ngMock'));
    beforeEach(module('btp.controllers'));
    beforeEach(module('btp.services'));

    API_BASE = 'http://api\\.rottentomatoes\\.com/api/public/v1\\.0';
    expectedFilms = function () {
        /*jshint camelcase: false */
        return {
            predator: {
                id: '16751',
                title: 'Predator',
                ratings: {
                    critics_score: 78,
                    audience_score: 87
                },
                release_dates: {
                    theater: '1987-06-12',
                    dvd: '2000-12-26'
                },
                posters: {original: ''}
            },
            honey: {
                id: '10611',
                title: 'Honey, I Shrunk The Kids',
                ratings: {
                    critics_score: 75,
                    audience_score: 52
                },
                release_dates: {
                    theater: '1989-06-23',
                    dvd: '2002-10-08'
                },
                posters: {original: ''}
            }
        };
    };

    beforeEach(inject(function ($injector, $rootScope, $controller) {
        controller = $controller;
        httpBackend = $injector.get('$httpBackend');
        scope = $rootScope.$new();
        filmResource = $injector.get('Film');
    }));

    describe('SearchCtrl', function () {
        beforeEach(function () {
            controller('SearchCtrl', {
                $scope: scope,
                Film: filmResource
            });
        });

        it('should start with an empty set of films', function () {
            // Films should be empty to begin with
            expect(scope.title).toEqual('');
            expect(scope.films).toEqual([]);
        });
    });

    describe('VersusCtrl', function () {
        var expectedURL, routeParams;
        beforeEach(inject(function ($injector, $routeParams) {
            expectedURL = new RegExp(API_BASE + '/movies/\\d+\\.json.*callback=JSON_CALLBACK$');

            routeParams = $routeParams;
            routeParams.id = '10611';

            controller('VersusCtrl', {
                $scope: scope,
                $routeParams: routeParams,
                Film: filmResource
            });
        }));

        it('should fetch both Predator and the comparator', function () {
            httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms().predator);
            httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms().honey);

            httpBackend.flush();
            expect(scope.films.length).toEqual(2);
            expect(scope.films[1].id).toEqual(routeParams.id);
        });
    });
});
