'use strict';

describe('BTP controllers', function () {
    var API_BASE, element, filmResource, httpBackend, scope;

    beforeEach(module('ngResource'));
    beforeEach(module('ngMock'));
    beforeEach(module('btp.services'));
    beforeEach(module('btp.directives'));

    API_BASE = 'http://api\\.rottentomatoes\\.com/api/public/v1\\.0';

    beforeEach(inject(function ($compile, $injector, $rootScope) {
        httpBackend = $injector.get('$httpBackend');
        scope = $rootScope.$new();
        filmResource = $injector.get('Film');
        element = $compile('<div ng-search></div>')(scope);
    }));

    describe('ngSearch', function () {

        it('should return films via xhr with a proper search term', function () {
            var expectedFilms, expectedURL;
            expectedURL = new RegExp(API_BASE + '\\/movies\\.json.*q=honey$');
            expectedFilms = {
                movies: [
                    {id: 10611, title: 'Honey, I Shrunk The Kids'},
                    {id: 770882280, title: 'Honey'}
                ]
            };
            httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms);


            // Set the model `title` to string 'honey'
            scope.title = 'honey';

            // Fire off the digest for watch
            element.scope().$apply();

            // Wait for our debounce to finish
            waits(101);

            runs(function () {
                // Fire off the mock JSONP request
                httpBackend.flush();

                expect(scope.films.length).toEqual(expectedFilms.movies.length);
                expect(scope.films[0].id).toEqual(expectedFilms.movies[0].id);
                expect(_.last(scope.films).id).toEqual(_.last(expectedFilms.movies).id);
            });
        });
    });

});
