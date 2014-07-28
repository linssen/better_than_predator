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
                 {"adult":false,"backdrop_path":"/5AhzhhWMD7VxjXjvr1Cx3BmPxyj.jpg","belongs_to_collection":{"id":72119,"name":"Honey, I Shrunk the Kids Collection","poster_path":"/29XnRvHQnnZ1EYj5awgQ5KwpvkH.jpg","backdrop_path":"/sfT3NqSnjEDY1449qBgQRWOIcaq.jpg"},"budget":32000000,"genres":[{"id":35,"name":"Comedy"},{"id":14,"name":"Fantasy"},{"id":878,"name":"Science Fiction"},{"id":10751,"name":"Family"}],"homepage":"","id":9354,"imdb_id":"tt0097523","original_title":"Honey, I Shrunk the Kids","overview":"The scientist father of a teenage girl and boy accidentally shrinks his and two other neighborhood teens to the size of insects. Now the teens must fight diminutive dangers as the father searches for them.","popularity":1.59597600668824,"poster_path":"/f5eFxKYAd7hN1BxYzBg9qL1SDRe.jpg","production_companies":[{"name":"Buena Vista","id":32}],"production_countries":[{"iso_3166_1":"US","name":"United States of America"}],"release_date":"1989-06-22","revenue":222724172,"runtime":93,"spoken_languages":[{"iso_639_1":"en","name":"English"}],"status":"Released","tagline":"The most astonishing, innovative, backyard adventure of all time!","title":"Honey, I Shrunk the Kids","vote_average":6.0,"vote_count":100},
                 {"adult":false,"backdrop_path":"/cN8V7Hc40SthRI60J2myfqhHCBQ.jpg","belongs_to_collection":{"id":399,"name":"Predator Collection","poster_path":"/dzDhrRXYkRdas7JvRtwwhc4MJGo.jpg","backdrop_path":"/e8ycFoI8vGoZSOY7KmxFzZA1dkE.jpg"},"budget":18000000,"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":878,"name":"Science Fiction"},{"id":53,"name":"Thriller"}],"homepage":"","id":106,"imdb_id":"tt0093773","original_title":"Predator","overview":"Dutch and his group of commandos are hired by the CIA to rescue downed airmen from guerillas in a Central American jungle. The mission goes well but as they return they find that something is hunting them. Nearly invisible, it blends in with the forest, taking trophies from the bodies of its victims as it goes along. Occasionally seeing through its eyes, the audience sees it is an intelligent alien hunter, hunting them for sport, killing them off one at a time.","popularity":7.20902261807411,"poster_path":"/sa8OiwfkGLeQ3HDXf8BwXUx6pZV.jpg","production_companies":[{"name":"20th Century Fox","id":25},{"name":"Amercent Films","id":5263},{"name":"American Entertainment Partners II L.P.","id":21451},{"name":"Davis Entertainment","id":1302},{"name":"Lawrence Gordon Productions","id":840},{"name":"Silver Pictures","id":1885}],"production_countries":[{"iso_3166_1":"US","name":"United States of America"}],"release_date":"1987-06-11","revenue":98235548,"runtime":107,"spoken_languages":[{"iso_639_1":"en","name":"English"},{"iso_639_1":"es","name":"Español"}],"status":"Released","tagline":"If it bleeds, we can kill it...","title":"Predator","vote_average":6.8,"vote_count":456}
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
        expectedURL = new RegExp('^' + API_BASE + '/search/movie.*query=honey$');

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
