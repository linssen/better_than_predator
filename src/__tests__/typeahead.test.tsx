import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { afterEach, vi } from 'vitest';
import Typeahead from '../components/Typeahead';
import makeApiResultMock from './utils';
import filmSearchFixture from './fixtureFilmSearch.json';
import i18n from '../i18n';

function SelectedFilmRoute(): React.JSX.Element {
  const { filmId, filmSlug } = useParams();
  return <h1>{`Selected ${filmId} ${filmSlug}`}</h1>;
}

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

  it('shows an animated SVG while a search is pending', async () => {
    let resolveFetch: ((response: Response) => void) | undefined;
    const searchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        }),
    );
    global.fetch = searchMock;
    const user = userEvent.setup();

    const { container } = render(
      <Router>
        <Typeahead />
      </Router>,
    );

    const input = screen.getByPlaceholderText('Find a film...');
    await user.type(input, 'Ho');
    await act(async () => {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 450);
      });
    });
    expect(searchMock).toHaveBeenCalled();
    const indicator = container.querySelector('svg.loading-indicator');
    expect(indicator?.querySelectorAll('g.frame')).toHaveLength(9);
    expect(indicator?.querySelector('g.frame')?.hasAttribute('fill')).toBe(false);
    expect(input.getAttribute('aria-busy')).toBe('true');

    expect(resolveFetch).toBeDefined();
    await act(async () => {
      resolveFetch?.(new Response(JSON.stringify(filmSearchFixture)));
    });
    expect(container.querySelector('svg.loading-indicator')).toBeNull();
    expect(input.getAttribute('aria-busy')).toBe('false');
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

  it('moves through search results with the keyboard and selects the hovered result', async () => {
    global.fetch = makeApiResultMock();
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Typeahead />} />
          <Route path="/versus/:filmId/:filmSlug/" element={<SelectedFilmRoute />} />
        </Routes>
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('Find a film...');
    await user.type(input, 'Honey');
    const films = await screen.findAllByRole('link');

    fireEvent.mouseEnter(screen.getAllByRole('listitem')[1]);
    expect(films[1].className).toContain('bg-gray-900');
    fireEvent.keyUp(input, { key: 'ArrowUp' });
    expect(films[0].className).toContain('bg-gray-900');
    fireEvent.keyUp(input, { key: 'ArrowDown' });
    expect(films[1].className).toContain('bg-gray-900');
    fireEvent.keyUp(input, { key: 'Escape' });
    fireEvent.keyUp(input, { key: 'Enter' });

    expect(films.length).toBeGreaterThan(1);
    expect(
      await screen.findByRole('heading', { name: 'Selected 81936 honey-i-shrunk-the-audience' }),
    ).toBeTruthy();
  });
});
