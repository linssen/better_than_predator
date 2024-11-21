import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Film } from './types';
import { getFilm } from './utils/api';
import Score from './components/Score';
import { ReactComponent as BackIcon } from './assets/back.svg';

function Result(): JSX.Element {
  const { t } = useTranslation();
  const { filmId } = useParams<'filmId'>();
  const predatorId = 106;
  const [films, setFilms] = useState<Array<Film>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  async function getFilms() {
    setIsLoading(true);
    const received = await Promise.all([predatorId, filmId].map(getFilm));
    received.sort((a, b) => {
      if (a.id === predatorId) return -1;
      if (b.id === predatorId) return 1;
      return 0;
    });
    setFilms(received);
    setIsLoading(false);
  }

  useEffect(() => {
    getFilms();
  }, []);

  const winner = useMemo((): Film => {
    const sorted = films.sort((a, b) => b.voteAverage - a.voteAverage);
    return sorted[0];
  }, [films]);

  const year = useMemo((): number => new Date().getFullYear(), []);

  return (
    <>
      {!isLoading && (
        <div className="p-4">
          <h1
            className="
            title w-full md:w-1/2
            text-white text-5xl text-center
            block md:float-right
            mb-6 pb-6
            border-b border-white border-dashed
          "
          >
            {t('winnerAnnounce', '{{winner}} wins!', { winner: winner.title })}
          </h1>
          <div className="films w-full md:w-1/2 flex block md:float-left mb-8">
            {films.map((film) => (
              <a
                key={film.id}
                className="bg-white p-2 mr-4"
                href={film.tmbdLink}
                target="_blank"
                rel="noreferrer"
              >
                <img alt={film.title} src={film.posterPath} width="400" />
                <div className="flex items-center pt-4 justify-between">
                  <span className="text-6xl">
                    {film.voteAverage.toFixed(2)}
                    <span className="text-grey text-4xl -ml-1 hidden sm:inline md:hidden lg:inline">
                      / 10
                    </span>
                  </span>
                  <span className="h-14 w-14">
                    <Score percent={film.voteAverage * 10} />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="blurb text-white w-full md:w-1/2 float-right">
            <h3 className="text-3xl mb-6 text-4xl">{t('whyExist', 'Why does this even exist?')}</h3>
            <p className="mb-6 text-2xl">
              <Trans i18nKey="reasonAndCredit">
                {/* eslint-disable react/jsx-one-expression-per-line */}
                Because <a href="https://www.linssen.me/">Wil</a>,{' '}
                <a href="http://gregorywood.co.uk/">Greg</a>, and Glen were in a pub once and they
                thought you should be able to compare films to Predator. It is after all the
                ultimate benchmark.
                {/* eslint-enable react/jsx-one-expression-per-line */}
              </Trans>
            </p>

            <Link
              to="/"
              className="inline-flex text-2xl text-white no-underline relative whitespace-nowrap bg-gray-600 mr-5"
            >
              <span className="p-2 pt-3 bg-black">
                <BackIcon viewBox="0 0 191 191" className="flex-1 h-6 w-12" />
              </span>
              <span className="py-2 px-6">{t('again!', 'Again!')}</span>
            </Link>

            <p className="text-base">
              <Trans i18nKey="copyright">
                {/* eslint-disable react/jsx-one-expression-per-line */}
                Copyright © {{ year }} <a href="http://linssen.me/">Wil Linssen</a>, and all of the
                code is <a href="http://github.com/linssen/better_than_predator">on GitHub</a>.
                <br />
                Powered by<a href="https://www.themoviedb.org/">themoviedb.org</a>.
                {/* eslint-enable react/jsx-one-expression-per-line */}
              </Trans>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Result;
