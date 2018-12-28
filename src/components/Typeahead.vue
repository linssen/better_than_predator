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
    <ul class="search__result-list">
      <li
        v-for="(film, index) in films"
        :key="index"
        @mouseenter="setIndex(index)"
      >
        <router-link
          :to="{name: 'result', params: {id: film.id, slug: film.slug}}"
          :class="{'search__result-item--active': index === selectedIndex}"
          class="search__result-item"
        >
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
      const film = this.films[this.selectedIndex];
      // router.push({ name: 'user', params: { userId: 123 }})
      this.$router.push({
        name: 'result',
        params: { id: film.id, slug: film.slug },
      });
    },
  },
};
</script>
<style lang="scss">

</style>
