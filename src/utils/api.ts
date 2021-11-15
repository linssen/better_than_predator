import { Film } from '../types';
import slugify from './slugify';

export const predatorId = 106;

const apiKey = '7fde67af78a621923d00705787723896';

export interface ReceivedSingleFilm {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: object
  budget: number
  genres: Array<object>
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<object>
  production_countries: Array<object>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<object>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface SearchQueryParams {
  query: string
  api_key: string
  page: number
  include_adult: boolean
  search_type: string
}

export function singleUrl(filmId: string | number): string {
  return `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}`;
}

export function searchUrl(query: string): string {
  const queryParams:SearchQueryParams = {
    query,
    api_key: apiKey,
    page: 1,
    include_adult: false,
    search_type: 'ngram',
  };

  const urlParams = Object.entries(queryParams).map(([key, val]) => {
    if (val !== undefined) {
      return `${key}=${encodeURIComponent(val)}`;
    }
    return '';
  })
    .join('&');

  return `https://api.themoviedb.org/3/search/movie?${urlParams}`;
}

export function mapFilm(receivedFilm: ReceivedSingleFilm): Film {
  return {
    id: receivedFilm.id,
    title: receivedFilm.title,
    slug: slugify(receivedFilm.title),
    releaseDate: new Date(receivedFilm.release_date),
    voteAverage: receivedFilm.vote_average,
    voteCount: receivedFilm.vote_count,
    posterPath: `http://image.tmdb.org/t/p/original/${receivedFilm.poster_path}`,
  };
}

export async function getFilm(filmId?: string | number): Promise<Film> {
  if (filmId === undefined) {
    return Promise.reject();
  }
  const response = await fetch(singleUrl(filmId), { method: 'GET' });
  const responseJson = await response.json();
  const film = mapFilm(responseJson);

  return Promise.resolve(film);
}

export async function searchFilms(query: string): Promise<Film[]> {
  const response = await fetch(searchUrl(query), { method: 'GET' });
  const responseJson = await response.json();
  const films = responseJson.results.map(mapFilm);

  return Promise.resolve(films);
}
