import {
  getFilm,
  mapFilm,
  ReceivedMultiFilm,
  ReceivedSingleFilm,
  searchFilms,
  searchUrl,
  singleUrl,
} from '../utils/api';
import filmSearchFixture from './fixtureFilmSearch.json';
import filmSingleFixture from './fixtureFilmSingle.json';
import { Film } from '../types';

describe('api tools', () => {
  const apiKey = 'mysecretapikey';
  const baseUrl = 'https://api.themoviedb.org/3';
  const expectedMapFilm:Film = {
    id: 9354,
    posterPath: 'http://image.tmdb.org/t/p/original//omQOzahi2NIeiYznNxHFDvNbvo6.jpg',
    releaseDate: new Date('1989-06-23T00:00:00.000Z'),
    slug: 'honey-i-shrunk-the-kids',
    title: 'Honey, I Shrunk the Kids',
    voteAverage: 6.3,
    voteCount: 2312,
  };

  it('builds a single search url', () => {
    expect(singleUrl(42)).toEqual(`${baseUrl}/movie/42?api_key=${apiKey}`);
  });

  it('builds a search url with correct get params', () => {
    const extraParams = `api_key=${apiKey}&page=1&include_adult=false&search_type=ngram`;
    expect(searchUrl('cool movie!')).toEqual(`${baseUrl}/search/movie?query=cool%20movie!&${extraParams}`);
  });

  describe('maps films', () => {


    it('singly to a Film', () => {
      const result:ReceivedSingleFilm = filmSingleFixture;
      expect(mapFilm(result)).toEqual(expectedMapFilm);
    });

    it('from a search result list to a Film', () => {
      const result:ReceivedMultiFilm = filmSearchFixture.results[0];
      expect(mapFilm(result)).toEqual(expectedMapFilm);
    });
  });

  it('rejects without a legit film ID', async () => {
    await expect(getFilm()).rejects.toEqual(new Error('Need a valid film ID'));
  });

  it('fetches a film and maps it to a Film', async () => {
    const singleFetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(filmSingleFixture),
    })) as jest.Mock;
    global.fetch = singleFetch;
    const film = await getFilm(9354);
    expect(singleFetch).toHaveBeenCalled();
    expect(film).toEqual(expectedMapFilm);
  });

  it('searches films and maps them to an array of Films', async () => {
    const searchFetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(filmSearchFixture),
    })) as jest.Mock;
    global.fetch = searchFetch;
    const films = await searchFilms('Honey');
    expect(searchFetch).toHaveBeenCalled();
    expect(films.length).toEqual(filmSearchFixture.results.length);
    expect(films[0]).toEqual(expectedMapFilm);
  });
});
