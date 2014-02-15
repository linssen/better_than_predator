'use strict';

describe('BTP services', function () {
    var API_BASE, expectedFilms, filmResource, httpBackend;

    beforeEach(module('ngMock'));
    beforeEach(module('ngResource'));
    beforeEach(module('btp.services'));

    API_BASE = 'http://api\\.rottentomatoes\\.com/api/public/v1\\.0';
    expectedFilms = function () {
        return {
            movies: [
                {"id":10611,"title":"Honey, I Shrunk the Kids","year":1989,"genres":["Action & Adventure","Kids & Family","Science Fiction & Fantasy","Comedy"],"mpaa_rating":"PG","runtime":101,"release_dates":{"theater":"1989-06-23","dvd":"2002-10-08"},"ratings":{"critics_rating":"Fresh","critics_score":75,"audience_rating":"Spilled","audience_score":53},"synopsis":"","posters":{"thumbnail":"http://content6.flixster.com/movie/10/87/98/10879840_mob.jpg","profile":"http://content6.flixster.com/movie/10/87/98/10879840_pro.jpg","detailed":"http://content6.flixster.com/movie/10/87/98/10879840_det.jpg","original":"http://content6.flixster.com/movie/10/87/98/10879840_ori.jpg"},"abridged_cast":[{"name":"Rick Moranis","id":"162658706","characters":["Prof. Wayne Szalinski"]},{"name":"Matt Frewer","id":"162665315","characters":["Big Russ Thompson"]},{"name":"Marcia Strassman","id":"551479493","characters":["Diane Szalinski"]},{"name":"Kristine Sutherland","id":"770674852","characters":["Mae Thompson"]},{"name":"Jared Rushton","id":"453132240","characters":["Ron Thompson"]}],"abridged_directors":[{"name":"Joe Johnston"}],"studio":"Disney","alternate_ids":{"imdb":"0097523"},"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/10611.json","alternate":"http://www.rottentomatoes.com/m/honey_i_shrunk_the_kids/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/10611/cast.json","clips":"http://api.rottentomatoes.com/api/public/v1.0/movies/10611/clips.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/10611/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/10611/similar.json"}},
                {"id":16751,"title":"Predator","year":1987,"genres":["Action & Adventure","Horror"],"mpaa_rating":"R","runtime":107,"release_dates":{"theater":"1987-06-12","dvd":"2000-12-26"},"ratings":{"critics_rating":"Certified Fresh","critics_score":78,"audience_rating":"Upright","audience_score":87},"synopsis":"","posters":{"thumbnail":"http://content7.flixster.com/movie/11/16/49/11164941_mob.jpg","profile":"http://content7.flixster.com/movie/11/16/49/11164941_pro.jpg","detailed":"http://content7.flixster.com/movie/11/16/49/11164941_det.jpg","original":"http://content7.flixster.com/movie/11/16/49/11164941_ori.jpg"},"abridged_cast":[{"name":"Arnold Schwarzenegger","id":"162662233","characters":["Maj. Alan \"Dutch\" Schaefer"]},{"name":"Carl Weathers","id":"162726514","characters":["Dillon"]},{"name":"Elpidia Carrillo","id":"162654645","characters":["Anna"]},{"name":"Bill Duke","id":"162661093","characters":["Mac"]},{"name":"Jesse Ventura","id":"364643546","characters":["Sgt. Blain"]}],"abridged_directors":[{"name":"John McTiernan"}],"studio":"20th Century Fox","alternate_ids":{"imdb":"0093773"},"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/16751.json","alternate":"http://www.rottentomatoes.com/m/predator/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/16751/cast.json","clips":"http://api.rottentomatoes.com/api/public/v1.0/movies/16751/clips.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/16751/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/16751/similar.json"}}
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
        expectedURL = new RegExp('^' + API_BASE + '\\/movies\\.json.*q=honey$');

        httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms());
        films = filmResource.query('honey');
        httpBackend.flush(1);
        expect(films.length).toEqual(expectedFilms().movies.length);
        expect(films[0].id).toEqual(expectedFilms().movies[0].id);
        expect(_.last(films).id).toEqual(_.last(expectedFilms().movies).id);
    });

    it('should respond with a single film from an ID', function () {
        var expectedURL, expectedFilm, film;
        expectedFilm = expectedFilms().movies[0];
        expectedURL = new RegExp(
            '^' + API_BASE + '\\/movies\\/' +
            expectedFilm.id + '\\.json'
        );

        httpBackend.expectJSONP(expectedURL).respond(200, expectedFilms().movies[0]);
        film = filmResource.get({id: expectedFilms().movies[0].id});
        httpBackend.flush(1);
        expect(film.id).toEqual(expectedFilm.id);
        expect(film.ratings.combined).toEqual(6.4);
    });

});
