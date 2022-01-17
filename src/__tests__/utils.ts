import filmSearchFixture from './fixtureFilmSearch.json';

// eslint-disable-next-line import/prefer-default-export
export function makeApiResultMock(withFixture: object = filmSearchFixture):jest.Mock {
  return jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(withFixture),
  }));
}
