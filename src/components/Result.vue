<template>
  <div v-if="winner">
    <h1>{{ winner.title }} wins!</h1>
    <div class="film-results">
      <div
        v-for="film in films"
        :key="film.id"
        class="film-results__film"
      >
        <div class="film-results__poster">
          <img
            :alt="film.title"
            :src="poster(film.id)"
            width="300"
          >
        </div>
        <div class="film-results__rating">
          <div class="film-results__score">{{ film.vote_average }}</div>
          <div class="film-results__stars"></div>
        </div>
      </div>
    </div>
    <div class="info">
      <hr>
      <h3>Why does this even exist?</h3>
      <p>
        Because <a href="https://www.linssen.me/">Wil</a>,
        <a href="http://gregorywood.co.uk/">Greg</a>, and Glen were in a pub
        once and they thought you should be able to compare films to Predator.
        It is after all the ultimate benchmark.
      </p>

      <router-link
        :to="{name: 'search'}"
        class="button button--again info__button"
      >
        Again!
      </router-link>

      <a
        :href="tweetUrl"
        class="button button--tweet info__button info__button--last"
        target="_blank"
      >
        Tweet this
      </a>

      <p class="credit">
        Copyright © {{ year }} <a href="http://linssen.me/">Wil Linssen</a>,
        and all of the code is <a href="http://github.com/linssen/better_than_predator">on GitHub</a>.<br>
        Powered by <a href="https://www.themoviedb.org/">themoviedb.org</a>.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';


export default {
  name: 'Result',
  props: {
    id: { type: String, required: true },
    slug: { type: String, required: true },
  },
  data: () => ({
    year: new Date().getFullYear(),
  }),
  computed: {
    ...mapState(['films']),
    ...mapGetters(['filmsByScore', 'poster']),
    winner() {
      return this.filmsByScore[0];
    },
    tweetUrl() {
      return 'TWITTER';
    },
  },
  created() {
    this.clearFilms();
    this.find({ id: 106 });
    this.find({ id: this.id });
  },
  methods: {
    ...mapActions(['find', 'clearFilms']),
  },
};
</script>

<style lang="scss">


</style>
