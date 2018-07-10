<template>
  <div class="search">
    <input
      v-model="query"
      :class="{'search__query--loading': isLoading}"
      class="search__query"
      type="search"
      placeholder="Find a film..."
      @keyup.down="navigateList(+1)"
      @keyup.up="navigateList(-1)"
      @keyup.enter="selectFilm"
    >
    <ul
      v-for="(film, index) in films"
      :key="index"
    >
      <li
        :class="{'search__result-item--active': index === selectedIndex}"
        class="search__result-item"
        @mouseenter="setIndex(index)"
      >
        <router-link :to="{name: 'Result', params: {id: film.id, slug: film.slug}}">
          {{ film.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Typeahead',
  data: () => ({
    selectedIndex: 0,
  }),
  computed: {
    ...mapState(['films', 'isLoading']),
    query: {
      get() {
        return this.$store.state.query;
      },
      set(val) {
        this.$store.dispatch('search', {
          query: val,
        });
      },
    },
  },
  methods: {
    navigateList(moveBy) {
      let newPos = this.selectedIndex + moveBy;
      const maxVal = (this.films || []).length - 1;
      if (newPos <= 0) newPos = 0;
      if (newPos >= maxVal) newPos = maxVal;
      this.selectedIndex = newPos;
    },
    setIndex(index) {
      this.selectedIndex = index;
    },
    selectFilm() {
      const film = this.$store.films[this.selectedIndex];
      this.$router.push({
        path: 'result',
        params: { id: film.id, slug: film.slug },
      });
    },
  },
};
</script>
<style lang="scss">
@import '../bootstrap';


.search {
    @include grid-column(8);
    @include grid-shift(2);

    font-size: em(24);
}

.search__query {
    @include grid-collapse;

    font-family: $font_stack;
    padding: em(16, 24) em(40, 24) em(16, 24) em(16, 24);
    border: none;
    color: $color__contast;
}
.search__query--loading {
    background: #fff url('/static/images/dots.gif') no-repeat 97% 50%;
}
.search__result-list {
    background: transparentize($color__contast, 0.6);
    clear: both;
    margin: 0;
    list-style: none;
    padding: 0;
}
.search__result-item {
    padding: em(8, 20);
    line-height: 1em;
    color: white;
    text-decoration: none;
    display: block;
}
.search__result-item--active,
.search__result-item:hover,
.search__result-item:focus {
    background: $color__contast;
}
</style>
