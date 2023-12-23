import filmSearchFixture from './fixtureFilmSearch.json';

export default function makeApiResultMock(withFixture: object = filmSearchFixture): jest.Mock {
  return jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(withFixture),
    }),
  );
}
