import { expect } from 'chai';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import { mutations } from '@/store';
import * as searchResults from '../fixtures/filmSearch.json';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('Film store', () => {
  const state = {};
  beforeEach(() => {
    Object.assign(state, {
      isLoading: false,
      query: null,
      films: [],
    });
  });

  it('maps films from an xhr result to an array', () => {
    const xhr = {
      responseText: JSON.stringify(searchResults.default),
    };
    mutations.searchReceived(state, xhr);
    expect(state.films.length).to.equal(5);
    expect(state.films[0]).to.eql({
      id: 9354,
      title: 'Honey, I Shrunk the Kids',
      releaseDate: new Date('1989-06-22'),
      voteAvg: 6.2,
      slug: 'honey-i-shrunk-the-kids',
      posterPath: '/f5eFxKYAd7hN1BxYzBg9qL1SDRe.jpg',
    });
  });
});
