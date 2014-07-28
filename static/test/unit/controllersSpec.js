'use strict';

describe('BTP controllers', function () {
    var API_BASE, controller, expectedFilms, filmResource, httpBackend, scope;

    beforeEach(module('ngResource'));
    beforeEach(module('ngRoute'));
    beforeEach(module('ngMock'));
    beforeEach(module('btp.controllers'));
    beforeEach(module('btp.services'));

    API_BASE = 'http://api\\.themoviedb\\.org/3';
    expectedFilms = function () {
        return {
            predator: {
                id: 106,
                title: 'Predator',
                rating: 6.8,
                date: new Date('1987-06-12'),
                poster_path: ''
            },
            honey: {
                id: 9354,
                rating: 6,
                title: 'Honey, I Shrunk The Kids',
                poster: '',
                date: new Date('1989-06-23'),
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
            expectedURL = new RegExp(API_BASE + '/movie/\\d+.*callback=JSON_CALLBACK$');

            routeParams = $routeParams;
            routeParams.id = 9354;

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
