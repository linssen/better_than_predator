import filmSearchFixture from './fixtureFilmSearch.json';
import filmSingleFixture from './fixtureFilmSingle.json';

export function makeSearchMock():jest.Mock {
  return jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(filmSearchFixture),
  }));
}

export function makeGetMock():jest.Mock {
  return jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(filmSingleFixture),
  }));
}
