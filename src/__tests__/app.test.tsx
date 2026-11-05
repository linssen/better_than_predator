import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach } from 'vitest';
import App from '../App';
import i18n from '../i18n';

describe('App', () => {
  afterEach(async () => {
    cleanup();
    await i18n.changeLanguage('en-GB');
  });

  it('renders the home route and updates document metadata', async () => {
    await i18n.changeLanguage('fr-FR');
    document.head.innerHTML = '<meta name="description" content="">';

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText('Rechercher un film...')).toBeTruthy();
    expect(
      screen.getByRole('heading', {
        name: 'Saisissez le titre d’un film pour savoir s’il est meilleur que Predator',
      }),
    ).toBeTruthy();
    await waitFor(() => {
      expect(document.documentElement.lang).toBe('fr-FR');
      expect(document.title).toBe('Better Than Predator');
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
        'Saisissez le titre d’un film pour savoir s’il est meilleur que Predator.',
      );
    });
  });

  it('renders the not-found route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Not found' })).toBeTruthy();
  });

  it('updates the page title when no description meta element exists', async () => {
    document.head.innerHTML = '';

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(document.title).toBe('Better Than Predator'));
    expect(document.querySelector('meta[name="description"]')).toBeNull();
  });

  it('uses the active language when i18next has no resolved language', async () => {
    const { resolvedLanguage } = i18n;
    i18n.resolvedLanguage = undefined;

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(document.documentElement.lang).toBe(i18n.language));
    i18n.resolvedLanguage = resolvedLanguage;
  });
});
