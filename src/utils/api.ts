import slugify from 'slugify';
import { Film } from '../types';

export const predatorId = 106;

const apiKey:string = process.env.REACT_APP_API_KEY!;

export interface ReceivedSingleFilm {
  adult: boolean
  backdrop_path: string | null
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

export interface ReceivedMultiFilm {
  adult: boolean
  backdrop_path: string | null
  genre_ids: Array<number>
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
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

export function mapFilm(receivedFilm: ReceivedSingleFilm | ReceivedMultiFilm): Film {
  const slug = slugify(receivedFilm.title).toLocaleLowerCase();
  return {
    id: receivedFilm.id,
    title: receivedFilm.title,
    slug,
    releaseDate: new Date(receivedFilm.release_date),
    voteAverage: receivedFilm.vote_average,
    voteCount: receivedFilm.vote_count,
    posterPath: `http://image.tmdb.org/t/p/original/${receivedFilm.poster_path}`,
    tmbdLink: `https://www.themoviedb.org/movie/${receivedFilm.id}-${slug}`,
  };
}

export async function getFilm(filmId?: string | number): Promise<Film> {
  if (filmId === undefined) {
    return Promise.reject(new Error('Need a valid film ID'));
  }
  const response = await fetch(singleUrl(filmId), { method: 'GET' });
  const responseJson = await response.json();
  const film = mapFilm(responseJson);

  return Promise.resolve(film);
}

export async function searchFilms(query: string): Promise<Film[]> {
  const response = await fetch(searchUrl(query), { method: 'GET' });
  const responseJson = await response.json();
  const films = (responseJson?.results || [])
    .map(mapFilm)
    .filter((film: Film) => film.id !== predatorId);

  return Promise.resolve(films);
}
