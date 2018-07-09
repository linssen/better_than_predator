import Vue from 'vue';
import Typeahead from '@/components/Typeahead';

describe('Typeahead.vue', () => {
  it('should have default data', () => {
    expect(Typeahead.data()).toEqual({
      selectedIndex: 0,
    });
  });
});
