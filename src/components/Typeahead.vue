<template>
  <div class="
    flex items-center justify-center flex-wrap
    w-full md:w-2/3 lg:w-1/2
    p-4 mr-auto ml-auto
  ">
    <input
      v-model="localQuery"
      class="w-full bg-grey-lighter text-grey-darker text-3xl p-2 rounded-sm"
      :class="{'loading': isLoading}"
      type="search"
      placeholder="Find a film..."
      @keyup.down="navigateList(+1)"
      @keyup.up="navigateList(-1)"
      @keyup.enter="selectFilm"
    >
    <ul class="w-full list-reset bg-black">
      <li
        class="block"
        v-for="(film, index) in films"
        :key="index"
        @mouseenter="setIndex(index)"
      >
        <router-link
          :to="{name: 'result', params: {id: film.id, slug: film.slug}}"
          :class="{'bg-grey-darkest': index === selectedIndex}"
          class="block text-xl text-white no-underline p-2 w-full hover:bg-grey-darkest"
        >
          {{ film.title }} ({{ film.releaseDate.getFullYear() }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Typeahead',
  data: () => ({
    selectedIndex: 0,
    localQuery: '',
    debounceTimer: null,
  }),
  created() {
    this.clearFilms();
  },
  watch: {
    localQuery(val) {
      if (this.debounceTimer) {
        window.clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = window.setTimeout(this.$store.dispatch, 400, 'search', { query: val });
    },
  },
  computed: {
    ...mapState(['films', 'isLoading']),
  },
  methods: {
    ...mapActions(['clearFilms']),
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
        params: { id: String(film.id), slug: film.slug },
      });
    },
  },
};
</script>
<style>
  .loading {
    @apply bg-no-repeat;

    background-position: right 0.5rem top 50%;
    background-image: url('../assets/dots.gif');
    background-size: auto 1.5rem;
  }
</style>
