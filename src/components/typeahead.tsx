import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../types';
import { searchFilms } from '../utils/api';
import './typeahead.css';

function Typeahead():JSX.Element {
  const [localQuery, setLocalQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [films, setFilms] = useState<Array<Film>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  async function search(query: string) {
    setIsLoading(true);
    setFilms(await searchFilms(query));
    setIsLoading(false);
  }

  useEffect(() => {
    if (debounceTimer) {
      window.clearTimeout(debounceTimer);
    }
    if (localQuery.length < 2) {
      return;
    }
    setDebounceTimer(window.setTimeout(search, 1000, localQuery));
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
              {`${film.title} (${film.releaseDate.getFullYear()})`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Typeahead;
