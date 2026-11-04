import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { afterEach } from 'vitest';
import Typeahead from '../components/Typeahead';
import makeApiResultMock from './utils';
import filmSearchFixture from './fixtureFilmSearch.json';
import i18n from '../i18n';

describe('Typeahead', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en-GB');
  });

  it('translates the search placeholder into French', async () => {
    await act(async () => {
      await i18n.changeLanguage('fr-FR');
    });

    render(
      <Router>
        <Typeahead />
      </Router>,
    );

    expect(screen.getByPlaceholderText('Rechercher un film...').getAttribute('placeholder')).toBe(
      'Rechercher un film...',
    );
  });

  it('searches after 2 character', async () => {
    const searchMock = makeApiResultMock();
    global.fetch = searchMock;
    const user = userEvent.setup();

    render(
      <Router>
        <Typeahead />
      </Router>,
    );

    const input = screen.getByPlaceholderText('Find a film...');

    await user.type(input, 'Ho');
    // Not yet - we want 3 or more characters
    expect(searchMock).not.toHaveBeenCalled();

    // Add the rest
    await user.type(input, 'ney, I');

    await waitFor(() => expect(searchMock).toHaveBeenCalled());
    const films = await screen.findAllByRole('link');
    expect(films.length).toEqual(filmSearchFixture.results.length);
    expect(films[0].textContent).toBe('Honey, I Shrunk the Kids (1989)');
  });

  it('excludes Predator itself from the results', async () => {
    const fakePredator = {
      ...filmSearchFixture.results[0],
      title: 'Predator',
      release_date: '1987-06-12',
      id: 106,
    };
    const searchFixture = {
      ...filmSearchFixture,
      results: [...filmSearchFixture.results, fakePredator],
    };
    global.fetch = makeApiResultMock(searchFixture);
    const user = userEvent.setup();

    render(
      <Router>
        <Typeahead />
      </Router>,
    );

    const input = screen.getByPlaceholderText('Find a film...');

    await user.type(input, 'Predator');

    const films = await screen.findAllByRole('link');
    const titles = [...films].map((film) => film.textContent);
    expect(films.length).toEqual(searchFixture.results.length - 1);
    expect(titles.indexOf('Honey, I Shrunk the Kids (1989)')).toBe(0);
    expect(titles.indexOf('Predator (1987)')).toBe(-1);
  });
});
