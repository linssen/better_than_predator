import {mapFilm, ReceivedMultiFilm, ReceivedSingleFilm, singleUrl} from '../utils/api';
import filmSearchFixture from './fixtureFilmSearch.json';
import filmSingleFixture from './fixtureFilmSingle.json';
import {Film} from '../types';

describe('api tools', () => {

  it('builds a single search url', () => {
    expect(singleUrl(42)).toEqual('https://api.themoviedb.org/3/movie/42?api_key=mysecretapikey');
  });

  describe('maps films', () => {
    const expectedMapFilm:Film = {
      id: 9354,
      posterPath: 'http://image.tmdb.org/t/p/original//omQOzahi2NIeiYznNxHFDvNbvo6.jpg',
      releaseDate: new Date('1989-06-23T00:00:00.000Z'),
      slug: 'Honey-I-Shrunk-the-Kids',
      title: 'Honey, I Shrunk the Kids',
      voteAverage: 6.3,
      voteCount: 2312,
    };

    it('singly maps to a Film', () => {
      const result:ReceivedSingleFilm = filmSingleFixture;
      expect(mapFilm(result)).toEqual(expectedMapFilm);
    });

    it('from a search result maps to a Film', () => {
      const result:ReceivedMultiFilm = filmSearchFixture.results[0];
      expect(mapFilm(result)).toEqual(expectedMapFilm);
    });
  });
});
