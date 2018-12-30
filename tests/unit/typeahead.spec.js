/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Typeahead from '@/components/Typeahead.vue';


const localVue = createLocalVue();

localVue.use(Vuex);

describe('Typeahead.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      actions: {
        search() {},
        find() {},
        clearFilms() {},
      },
    });
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(Typeahead, {
      store,
      localVue,
    });
    expect(Typeahead.data()).to.eql({
      selectedIndex: 0,
      debounceTimer: null,
      localQuery: '',
    });

    expect(wrapper.contains('input[type="search"]')).to.be.true;
  });
});
