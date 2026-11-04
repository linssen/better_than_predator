import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Film } from '../types';
import { searchFilms } from '../utils/api';
import './typeahead.css';

function Typeahead(): React.JSX.Element {
  const { t } = useTranslation();
  const [localQuery, setLocalQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [films, setFilms] = useState<Array<Film>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);
  const navigate = useNavigate();

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
      setFilms([]);
      return;
    }
    setDebounceTimer(window.setTimeout(search, 400, localQuery));
  }, [localQuery]);

  function onKeyUp(event: React.KeyboardEvent): void {
    event.preventDefault();
    if (event.key === 'ArrowUp') {
      setSelectedIndex(Math.max(selectedIndex - 1, 0));
    }
    if (event.key === 'ArrowDown') {
      setSelectedIndex(Math.min(selectedIndex + 1, films.length - 1));
    }
    if (event.key === 'Enter') {
      const film = films[selectedIndex];
      navigate(`/versus/${film.id}/${film.slug}/`);
    }
  }

  return (
    <div
      className="
      flex items-center justify-center flex-wrap
      w-full md:w-2/3 lg:w-1/2
      p-4 mr-auto ml-auto
      relative z-10
    "
    >
      <div className="relative w-full">
        <input
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyUp={onKeyUp}
          type="search"
          placeholder={t('searchFilmPlaceholder', 'Find a film...')}
          aria-busy={isLoading}
          className="typeahead-search w-full bg-grey-lighter text-grey-darker text-3xl p-2 rounded-sm appearance-none focus:outline-none focus:shadow-outline"
        />
        {isLoading && (
          <svg
            aria-hidden="true"
            className="loading-indicator"
            viewBox="0 0 33 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path id="predator-loading-segment" d="M 0 0 L 1 1 L 6 1 L 7 0 L 6 -1 L 1 -1 L 0 0" />
            </defs>
            <g className="frame">
              <use
                href="#predator-loading-segment"
                transform="translate(4 0.8) rotate(45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(20 0.8) rotate(135) scale(1.3)"
              />
              <use href="#predator-loading-segment" transform="translate(24 8)" />
              <use href="#predator-loading-segment" transform="translate(9 10) rotate(180)" />
              <use
                href="#predator-loading-segment"
                transform="translate(4 19) rotate(-45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(13 13) rotate(45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(23 19) rotate(-45) scale(1.3)"
              />
            </g>
            <g className="frame">
              <use
                href="#predator-loading-segment"
                transform="translate(4 0.8) rotate(45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(20 0.8) rotate(135) scale(1.3)"
              />
              <use href="#predator-loading-segment" transform="translate(9 10) rotate(180)" />
              <use
                href="#predator-loading-segment"
                transform="translate(4 19) rotate(-45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(13 13) rotate(45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(23 19) rotate(-45) scale(1.3)"
              />
            </g>
            <g className="frame">
              <use
                href="#predator-loading-segment"
                transform="translate(4 0.8) rotate(45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(20 0.8) rotate(135) scale(1.3)"
              />
              <use href="#predator-loading-segment" transform="translate(9 10) rotate(180)" />
              <use
                href="#predator-loading-segment"
                transform="translate(4 19) rotate(-45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(13 13) rotate(45) scale(1.3)"
              />
            </g>
            <g className="frame">
              <use
                href="#predator-loading-segment"
                transform="translate(4 0.8) rotate(45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(20 0.8) rotate(135) scale(1.3)"
              />
              <use href="#predator-loading-segment" transform="translate(24 3)" />
              <use href="#predator-loading-segment" transform="translate(24 8)" />
              <use
                href="#predator-loading-segment"
                transform="translate(4 19) rotate(-45) scale(1.3)"
              />
            </g>
            <g className="frame">
              <use href="#predator-loading-segment" transform="translate(24 3)" />
              <use href="#predator-loading-segment" transform="translate(24 8)" />
              <use href="#predator-loading-segment" transform="translate(9 10) rotate(180)" />
              <use
                href="#predator-loading-segment"
                transform="translate(4 19) rotate(-45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(13 13) rotate(45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(23 19) rotate(-45) scale(1.3)"
              />
            </g>
            <g className="frame">
              <use href="#predator-loading-segment" transform="translate(24 8)" />
              <use href="#predator-loading-segment" transform="translate(9 10) rotate(180)" />
              <use
                href="#predator-loading-segment"
                transform="translate(4 19) rotate(-45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(13 13) rotate(45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(23 19) rotate(-45) scale(1.3)"
              />
            </g>
            <g className="frame">
              <use href="#predator-loading-segment" transform="translate(9 10) rotate(180)" />
              <use
                href="#predator-loading-segment"
                transform="translate(4 19) rotate(-45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(13 13) rotate(45) scale(1.3)"
              />
            </g>
            <g className="frame">
              <use href="#predator-loading-segment" transform="translate(9 10) rotate(180)" />
              <use
                href="#predator-loading-segment"
                transform="translate(4 19) rotate(-45) scale(1.3)"
              />
              <use
                href="#predator-loading-segment"
                transform="translate(13 13) rotate(45) scale(1.3)"
              />
            </g>
            <g className="frame">
              <use href="#predator-loading-segment" transform="translate(24 3)" />
              <use href="#predator-loading-segment" transform="translate(24 8)" />
              <use
                href="#predator-loading-segment"
                transform="translate(23 19) rotate(-45) scale(1.3)"
              />
            </g>
          </svg>
        )}
        <ul className="absolute left-0 top-full w-full list-reset bg-black px-4">
          {films.map((film: Film, index) => (
            <li className="block" key={film.id} onMouseEnter={() => setSelectedIndex(index)}>
              <Link
                to={`/versus/${film.id}/${film.slug}/`}
                className={`${
                  index === selectedIndex ? 'bg-gray-900' : ''
                } block text-xl text-white no-underline p-2 w-full hover:bg-gray-900`}
              >
                {`${film.title} (${film.releaseDate.getFullYear()})`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Typeahead;
