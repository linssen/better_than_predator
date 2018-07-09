<template>
  <div class="search">
    <input
      v-model="query"
      :class="{'search__query--loading': isLoading}"
      class="search__query"
      type="search"
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
        <router-link :to="{name: 'result', params: {id: film.id, slug: film.slug}}">
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
<style>
    .search__result-item--active {
        background: salmon;
    }
</style>
