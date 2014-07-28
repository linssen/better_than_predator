'use strict';

describe('BTP controllers', function () {
    var API_BASE, element, expectedFilms, filmResource, httpBackend,
        jQuery, location, scope;

    beforeEach(module('ngResource'));
    beforeEach(module('ngMock'));
    beforeEach(module('btp.services'));
    beforeEach(module('btp.directives'));
    beforeEach(module('templates-main'));

    API_BASE = 'http://api\\.themoviedb\\.org/3';
    expectedFilms = function () {
        return {
            results: [
                {id: 106, title: 'Honey, I Shrunk the Kids', url: 'honey-i-shrunk-the-kids'},
                {id: 9394, title: 'Honey', url: 'honey'}
            ]
        };
    };

    beforeEach(inject(function ($compile, $injector, $rootScope, $location, $window) {
        httpBackend = $injector.get('$httpBackend');
        jQuery = $window.jQuery;
        scope = $rootScope.$new();
        filmResource = $injector.get('Film');
        location = $location;
        element = $compile('<div ng-film-autocomplete></div>')(scope);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('ngFilmAutocomplete', function () {

        it('should return films via xhr with a proper search term', function () {
            var expectedURL;
            expectedURL = new RegExp(API_BASE + '/search/movie.*query=honey$');

            httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms());

            // Set the model `query` to string 'honey'
            scope.query = 'honey';

            // Fire off the digest for watch
            element.scope().$apply();

            // Wait for our debounce to finish
            waits(501);

            runs(function () {
                // Fire off the mock JSONP request
                httpBackend.flush(1);
                // Are the films in the scope now?
                expect(scope.films.length).toEqual(expectedFilms().results.length);
            });
        });

        it('should let the user pick a film with the keyboard', function () {
            var evDown, evEnter, evUp, expectedPath;
            scope.films = expectedFilms().results;
            expectedPath = '/versus/:id/:title'
                .replace(':id', scope.films[0].id)
                .replace(':title', scope.films[0].url);
            evUp = jQuery.Event('keyup', {which: 38});
            evDown = jQuery.Event('keyup', {which: 40});
            evEnter = jQuery.Event('keyup', {which: 13});
            element.scope().$apply();

            // Active index starts at 0
            expect(scope.activeIndex).toEqual(0);
            expect(location.path()).toEqual('');
            // Pressing down increments it
            element.trigger(evDown);
            expect(scope.activeIndex).toEqual(1);
            // Pressing up decrements it
            element.trigger(evUp);
            expect(scope.activeIndex).toEqual(0);
            // Pressing enter navigates us to the versus page with our
            // selected film
            element.trigger(evEnter);
            expect(location.path()).toEqual(expectedPath);
        });
    });

});
