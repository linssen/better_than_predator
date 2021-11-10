import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import slugify from '../utils/slugify';
import { Film } from '../types';

interface SearchParams {
  query?: string
}

function Typeahead():JSX.Element {
  const [localQuery, setLocalQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [films, setFilms] = useState<Array<Film>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  async function search(params: SearchParams): Promise<Film[]> {
    if (!params.query || params.query.length < 2) {
      setFilms([]);
      return Promise.reject();
    }
    setIsLoading(true);

    const queryParams = Object.entries({
      query: params.query,
      api_key: '7fde67af78a621923d00705787723896',
      page: 1,
      include_adult: false,
      search_type: 'ngram',
    })
      .map(([key, val]) => {
        if (val !== undefined) {
          return `${key}=${encodeURIComponent(val)}`;
        }
        return '';
      })
      .join('&');
    const url = `https://api.themoviedb.org/3/search/movie?${queryParams}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    const responseJson = await response.json();

    setFilms(responseJson.results.map((film: Film) => ({
      ...film,
      slug: slugify(film.title),
      release_date: new Date(film.release_date),
    })));

    return Promise.resolve(films);
  }

  useEffect(() => {
    if (debounceTimer) {
      window.clearTimeout(debounceTimer);
    }
    if (localQuery.length < 2) {
      return;
    }
    setDebounceTimer(window.setTimeout(search, 1000, { query: localQuery }));
  }, [localQuery]);

  function onKeyUp(event:React.KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      setSelectedIndex(Math.min(selectedIndex - 1, 0));
    }
    if (event.key === 'ArrowUp') {
      setSelectedIndex(Math.max(selectedIndex + 1, films.length - 1));
    }
  }

  return (
    <div className="
      flex items-center justify-center flex-wrap
      w-full md:w-2/3 lg:w-1/2
      p-4 mr-auto ml-auto
    "
    >
      <input
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyUp={onKeyUp}
        type="search"
        placeholder="Find a film..."
        className={`${isLoading && 'loading'} w-full bg-grey-lighter text-grey-darker text-3xl p-2 rounded-sm appearance-none focus:outline-none focus:shadow-outline`}
      />
      <ul className="w-full list-reset bg-black">
        {films.map((film:Film, index) => (
          <li
            className="block"
            key={film.id}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <Link
              to={`/versus/${film.id}/${film.slug}/`}
              className={`${index === selectedIndex ? 'bg-grey-darkest' : ''} block text-xl text-white no-underline p-2 w-full hover:bg-grey-darkest`}
            >
              {film.title}
              {film.release_date.getFullYear()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Typeahead;
