'use strict';

describe('BTP services', function () {
    var API_BASE, expectedFilms, filmResource, httpBackend;

    beforeEach(module('ngMock'));
    beforeEach(module('ngResource'));
    beforeEach(module('btp.services'));

    API_BASE = 'http://api\\.themoviedb\\.org/3';
    expectedFilms = function () {
        return {
            results: [
                 {'adult':false,'backdrop_path':'/5AhzhhWMD7VxjXjvr1Cx3BmPxyj.jpg','belongs_to_collection':{'id':72119,'name':'Honey, I Shrunk the Kids Collection','poster_path':'/29XnRvHQnnZ1EYj5awgQ5KwpvkH.jpg','backdrop_path':'/sfT3NqSnjEDY1449qBgQRWOIcaq.jpg'},'budget':32000000,'genres':[{'id':35,'name':'Comedy'},{'id':14,'name':'Fantasy'},{'id':878,'name':'Science Fiction'},{'id':10751,'name':'Family'}],'homepage':'','id':9354,'imdb_id':'tt0097523','original_title':'Honey, I Shrunk the Kids','overview':'The scientist father of a teenage girl and boy accidentally shrinks his and two other neighborhood teens to the size of insects. Now the teens must fight diminutive dangers as the father searches for them.','popularity':1.59597600668824,'poster_path':'/f5eFxKYAd7hN1BxYzBg9qL1SDRe.jpg','production_companies':[{'name':'Buena Vista','id':32}],'production_countries':[{'iso_3166_1':'US','name':'United States of America'}],'release_date':'1989-06-22','revenue':222724172,'runtime':93,'spoken_languages':[{'iso_639_1':'en','name':'English'}],'status':'Released','tagline':'The most astonishing, innovative, backyard adventure of all time!','title':'Honey, I Shrunk the Kids','vote_average':6.0,'vote_count':100},
                 {'adult':false,'backdrop_path':'/gnbtPaoNcGfNIXT3xhRqzFBGaGb.jpg','belongs_to_collection':{'id':72119,'name':'Honey, I Shrunk the Kids Collection','poster_path':'/xxIwqQARS0RZu5cIENahqZSRw2a.jpg','backdrop_path':'/sfT3NqSnjEDY1449qBgQRWOIcaq.jpg'},'budget':40000000,'genres':[{'id':12,'name':'Adventure'},{'id':35,'name':'Comedy'},{'id':878,'name':'Science Fiction'},{'id':10751,'name':'Family'}],'homepage':'','id':11158,'imdb_id':'tt0104437','original_title':'Honey I Blew Up the Kid','overview':'Wayne Szalinski is at it again. But instead of shrinking things, he tries to make a machine that can make things grow. As in the first one, his machine isn\'t quite accurate. But when he brings Nick &amp; his toddler son Adam to see his invention, the machine unexpectedly starts working. And when Adam comes right up to the machine, he gets zapped along with his stuffed bunny.','popularity':0.0787805048399485,'poster_path':'/c2pOA94G6c27imzK6AXI2uc4FMA.jpg','production_companies':[{'name':'Walt Disney Pictures','id':2},{'name':'Touchwood Pacific Partners 1','id':8830}],'production_countries':[{'iso_3166_1':'US','name':'United States of America'}],'release_date':'1992-07-16','revenue':58662452,'runtime':89,'spoken_languages':[{'iso_639_1':'en','name':'English'}],'status':'Released','tagline':'The BIG Laughs Start January 6th!','title':'Honey I Blew Up the Kid','vote_average':5.1,'vote_count':32}
            ]
        };
    };

    beforeEach(inject(function ($injector) {
        httpBackend = $injector.get('$httpBackend');
        filmResource = $injector.get('Film');
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should respond to a valid query with multiple films', function () {
        var expectedURL, films;
        expectedURL = new RegExp('^' + API_BASE + '/search/movie\?.*query=honey');

        httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms());
        films = filmResource.search.query({query: 'honey'});
        httpBackend.flush(1);
        expect(films.length).toEqual(expectedFilms().results.length);
        expect(films[0].id).toEqual(expectedFilms().results[0].id);
        expect(_.last(films).id).toEqual(_.last(expectedFilms().results).id);
    });

    it('should respond with a single film from an ID', function () {
        var expectedURL, expectedFilm, film;
        expectedFilm = expectedFilms().results[0];
        expectedURL = new RegExp('^' + API_BASE + '/movie/' + expectedFilm.id);

        httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms().results[0]);
        film = filmResource.single.get({id: expectedFilms().results[0].id});
        httpBackend.flush(1);
        expect(film.id).toEqual(expectedFilm.id);
        expect(film.rating).toEqual(expectedFilm.vote_average);
    });

});
