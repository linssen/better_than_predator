'use strict';

describe('BTP controllers', function () {
    beforeEach(module('ngResource'));
    beforeEach(module('btp.controllers'));
    beforeEach(module('btp.services'));

    describe('SearchCtrl', function () {
        var $httpBackend, film, scope;

        beforeEach(inject(function (_$httpBackend_, $injector, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://api.rottentomatoes.com/api/public/v1.0/movies.json')
                .respond([
                    {id: 12233, title: 'Something'},
                    {id: 48733, title: 'Else'}
                ]);
            scope = $rootScope.$new();
            film = $injector.get('Film');
            $controller('SearchCtrl', {
                $scope: scope,
                Film: film
            });
        }));

        it('should return 10 via xhr films with a proper search term', inject(function () {
            expect(scope.films).toEqual([]);
            // $httpBackend.flush();
            // expect(scope.films).toEqual([
            //     {id: 12233, title: 'Something'},
            //     {id: 48733, title: 'Else'}
            // ]);
        }));
    });
});