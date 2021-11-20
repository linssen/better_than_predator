import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/dom';
import Typeahead from '../components/Typeahead';
import userEvent from '@testing-library/user-event';
import { makeSearchMock } from './utils';
import { BrowserRouter as Router } from 'react-router-dom';
import filmSearchFixture from './fixtureFilmSearch.json';

describe('Typeahead', () => {
  let container:HTMLElement;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
  });

  it('searches after 2 character', async () => {
    const searchMock = makeSearchMock();
    global.fetch = searchMock;

    act(() => {
      render(<Router><Typeahead /></Router>, container);
    });

    const input = await screen.getByPlaceholderText('Find a film...')

    await act(async () => {
      await userEvent.type(input, 'Ho', { delay: 500 });
    })
    // Not yet - we want 3 or more characters
    expect(searchMock).not.toHaveBeenCalled();

    // Add the rest
    await act(async () => {
      await userEvent.type(input, 'ney, I', {delay: 500});
    });

    expect(searchMock).toHaveBeenCalled();
    const films = await screen.findAllByRole('link');
    expect(films.length).toEqual(filmSearchFixture.results.length);
    expect(films[0].textContent).toBe('Honey, I Shrunk the Kids (1989)')
  });
});
