'use strict';

describe('BTP controllers', function () {
    var API_BASE, controller, filmResource, httpBackend, scope;

    beforeEach(module('ngResource'));
    beforeEach(module('ngRoute'));
    beforeEach(module('ngMock'));
    beforeEach(module('btp.controllers'));
    beforeEach(module('btp.services'));

    API_BASE = 'http://api\\.rottentomatoes\\.com/api/public/v1\\.0';

    beforeEach(inject(function ($injector, $rootScope, $controller) {
        controller = $controller;
        httpBackend = $injector.get('$httpBackend');
        scope = $rootScope.$new();
        filmResource = $injector.get('Film');
    }));

    describe('SearchCtrl', function () {
        var expectedFilms;
        beforeEach(function () {
            expectedFilms = {
                movies: [
                    {id: 10611, title: 'Honey, I Shrunk The Kids'},
                    {id: 770882280, title: 'Honey'}
                ]
            };

            controller('SearchCtrl', {
                $scope: scope,
                Film: filmResource
            });
        });

        it('should return films via xhr with a proper search term', inject(function () {
            var expectedURL;
            expectedURL = new RegExp(API_BASE + '/movies\\.json\\?.*q=honey$');

            // Expect search url to be called with term, respond with films
            httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms);
            // Films should be empty to begin with
            expect(scope.films).toEqual([]);

            // Set the model `title` to string 'honey'
            scope.title = 'honey';
            // Fire off the digest for watch
            scope.$digest();

            // Wait for our debounce to finish
            waits(101);

            runs(function () {
                // Fire off the mock JSONP request
                httpBackend.flush();

                expect(scope.films.length).toEqual(2);
                expect(scope.films[0].id).toEqual(10611);
                expect(scope.films[1].id).toEqual(770882280);
            });
        }));
    });

    describe('VersusCtrl', function () {
        var expectedFilms, expectedURL, routeParams;
        beforeEach(inject(function ($injector, $routeParams) {
            expectedURL = new RegExp(API_BASE + '/movies/\\d+\\.json.*callback=JSON_CALLBACK$');
            expectedFilms = {
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
                    }
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
                    }
                }
            };
            routeParams = $routeParams;
            routeParams.id = '10611';

            controller('VersusCtrl', {
                $scope: scope,
                $routeParams: routeParams,
                Film: filmResource
            });
        }));

        it('should fetch both Predator and the comparator', function () {
            httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms.predator);
            httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms.honey);

            httpBackend.flush();
            expect(scope.films.length).toEqual(2);
            expect(scope.films[1].id).toEqual(routeParams.id);
        });
    });
});
