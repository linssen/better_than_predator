import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Film } from './types';
import slugify from './utils/slugify';

interface FilmProps {
  filmId?: string
}

function Result(): JSX.Element {
  // @ts-ignore
  const { filmId } = useParams<FilmProps>();
  const predatorId = 106;
  const [films, setFilms] = useState<Array<Film>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function getFilm(id: number): Promise<Film> {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=7fde67af78a621923d00705787723896`;
      const response = await fetch(url, { method: 'GET' });
      const film = await response.json();
      return {
        ...film,
        slug: slugify(film.title),
        release_date: new Date(film.release_date),
        vote_average: parseFloat(film.vote_average),
        poster_path: `http://image.tmdb.org/t/p/original/${film.poster_path}`,
      };
    }
    async function getFilms() {
      setFilms(await Promise.all([predatorId, filmId].map(getFilm)));
      setIsLoading(false);
    }

    getFilms();
  }, []);

  const winner = films.sort((a, b) => b.vote_average - a.vote_average)[0];
  const year = new Date().getFullYear();

  return (
    <>
      {!isLoading && (
        <div className="p-4">
          <h1 className="
            title w-full md:w-1/2
            text-white text-5xl text-center
            block md:float-right
            mb-6 pb-6
          "
          >
            {winner.title}
            wins!
          </h1>
          <div className="films w-full md:w-1/2 flex block md:float-left">
            {films.map((film) => (
              <div
                key={film.id}
                className="bg-white p-2 mr-4"
              >
                <img
                  alt={film.title}
                  src={film.poster_path}
                  width="400"
                />
                <div className="flex items-center pt-4 justify-between">
                  <span className="score-text">
                    {film.vote_average}
                    <span className="text-grey text-4xl -ml-1 hidden sm:inline md:hidden lg:inline">/ 10</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="blurb text-white w-full md:w-1/2 float-right">
            <hr />
            <h3 className="text-3xl mb-6">Why does this even exist?</h3>
            <p>
              Because
              <a href="https://www.linssen.me/">Wil</a>
              ,
              <a href="http://gregorywood.co.uk/">Greg</a>
              , and Glen were in a pub
              once and they thought you should be able to compare films to Predator.
              It is after all the ultimate benchmark.
            </p>

            <Link to="/" className="btn btn-back mr-4">Again!</Link>

            <a
              href="tweetUrl"
              className="btn btn-tweet"
              target="_blank"
            >
              Tweet this
            </a>

            <p className="text-base">
              Copyright ©
              {year}
              <a href="http://linssen.me/">Wil Linssen</a>
              ,
              and all of the code is
              <a href="http://github.com/linssen/better_than_predator">on GitHub</a>
              .
              <br />
              Powered by
              <a href="https://www.themoviedb.org/">themoviedb.org</a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Result;
