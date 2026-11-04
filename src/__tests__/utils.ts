import { vi, type Mock } from 'vitest';
import filmSearchFixture from './fixtureFilmSearch.json';

export default function makeApiResultMock(withFixture: object = filmSearchFixture): Mock {
  return vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(withFixture),
    }),
  );
}
