'use strict';

describe('BTP controllers', function () {
    var API_BASE;

    beforeEach(module('ngResource'));
    beforeEach(module('ngMock'));
    beforeEach(module('btp.controllers'));
    beforeEach(module('btp.services'));

    API_BASE = 'http://api.rottentomatoes.com/api/public/v1.0';

    describe('SearchCtrl', function () {
        var $httpBackend, expectedFilms, filmResource, scope;

        beforeEach(inject(function ($injector, $rootScope, $controller) {
            expectedFilms = {
                movies: [
                    {id: 10611, title: 'Honey, I Shrunk The Kids'},
                    {id: 770882280, title: 'Honey'}
                ]
            };
            $httpBackend = $injector.get('$httpBackend');
            scope = $rootScope.$new();
            filmResource = $injector.get('Film');
            $controller('SearchCtrl', {
                $scope: scope,
                Film: filmResource
            });
        }));

        it('should return films via xhr with a proper search term', inject(function () {
            var expectedURL;
            jasmine.Clock.useMock();
            expectedURL = new RegExp(API_BASE + '\/movies\.json\?.*q=honey$');

            // Expect search url to be called with term, respond with films
            $httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms);
            // Films should be empty to begin with
            expect(scope.films).toEqual([]);
            // Set the model `title` to string 'honey'
            scope.title = 'honey';
            // Fire off the digest for watch
            scope.$digest();
            // Fire off the mock JSONP request
            $httpBackend.flush();

            expect(scope.films.length).toEqual(2);
            expect(scope.films[0].id).toEqual(10611);
        }));
    });
});
