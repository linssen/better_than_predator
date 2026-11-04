import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import Result from '../Result';
import filmSingleFixture from './fixtureFilmSingle.json';
import '../i18n';

describe('Result', () => {
  it('keeps Predator first when the other film has a higher score', async () => {
    const predator = {
      ...filmSingleFixture,
      id: 106,
      title: 'Predator',
      vote_average: 7.6,
      release_date: '1987-06-12',
    };
    const selectedFilm = {
      ...filmSingleFixture,
      vote_average: 8.5,
    };

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const filmId = new URL(input.toString()).pathname.split('/').pop();
        const response = filmId === '106' ? predator : selectedFilm;
        return new Response(JSON.stringify(response));
      }),
    );

    render(
      <MemoryRouter initialEntries={['/versus/9354/honey-i-shrunk-the-kids/']}>
        <Routes>
          <Route path="/versus/:filmId/:filmSlug/" element={<Result />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByRole('img', { name: 'Predator' });
    const filmCards = screen
      .getAllByRole('img')
      .map((image) => image.closest('a'))
      .filter((link): link is HTMLAnchorElement => link !== null);

    expect(filmCards[0]?.getAttribute('href')).toContain('/106-predator');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
      'Honey, I Shrunk the Kids wins!',
    );
    expect(screen.getByRole('link', { name: 'Greg' }).getAttribute('href')).toBe(
      'http://gregorywood.co.uk/',
    );
  });
});
