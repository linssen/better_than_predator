import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/dom';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Typeahead from '../components/Typeahead';
import { makeApiResultMock } from './utils';
import filmSearchFixture from './fixtureFilmSearch.json';

describe('Typeahead', () => {
  let container:HTMLElement;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
  });

  it('searches after 2 character', async () => {
    const searchMock = makeApiResultMock();
    global.fetch = searchMock;

    act(() => {
      render(<Router><Typeahead /></Router>, container);
    });

    const input = await screen.getByPlaceholderText('Find a film...');

    await act(async () => {
      await userEvent.type(input, 'Ho', { delay: 500 });
    });
    // Not yet - we want 3 or more characters
    expect(searchMock).not.toHaveBeenCalled();

    // Add the rest
    await act(async () => {
      await userEvent.type(input, 'ney, I', { delay: 500 });
    });

    expect(searchMock).toHaveBeenCalled();
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
      results: [
        ...filmSearchFixture.results,
        fakePredator,
      ],
    };
    global.fetch = makeApiResultMock(searchFixture);

    act(() => {
      render(<Router><Typeahead /></Router>, container);
    });

    const input = await screen.getByPlaceholderText('Find a film...');

    await act(async () => {
      await userEvent.type(input, 'Predator', { delay: 500 });
    });

    const films = await screen.findAllByRole('link');
    const titles = [...films].map((film) => film.textContent);
    expect(films.length).toEqual(searchFixture.results.length - 1);
    expect(titles.indexOf('Honey, I Shrunk the Kids (1989)')).toBe(0);
    expect(titles.indexOf('Predator (1987)')).toBe(-1);
  });
});
