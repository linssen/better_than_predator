<template>
  <div class="p-4" v-if="winner">
    <h1 class="
      title w-full md:w-1/2
      text-white text-5xl text-center
      block md:float-right
      mb-6 pb-6
    ">
      {{ winner.title }} wins!
    </h1>
    <div class="films w-full md:w-1/2 flex block md:float-left">
      <div
        v-for="film in films"
        :key="film.id"
        class="bg-white p-2 mr-4"
      >
        <img
          class=""
          :alt="film.title"
          :src="poster(film.id)"
          width="400"
        >
        <div class="flex items-center pt-4 justify-between">
          <span class="score-text">
            {{ film.voteAvg }}
            <span class="text-grey text-4xl -ml-1 hidden sm:inline md:hidden lg:inline">/ 10</span>
          </span>
          <Score
            class="score-chart"
            :voteAvg="film.voteAvg"
          ></Score>
        </div>
      </div>
    </div>
    <div class="blurb text-white w-full md:w-1/2 float-right">
      <hr>
      <h3 class="text-3xl mb-6">Why does this even exist?</h3>
      <p class="">
        Because <a href="https://www.linssen.me/">Wil</a>,
        <a href="http://gregorywood.co.uk/">Greg</a>, and Glen were in a pub
        once and they thought you should be able to compare films to Predator.
        It is after all the ultimate benchmark.
      </p>

      <router-link
        :to="{name: 'search'}"
        class="btn btn-back mr-4"
      >
        Again!
      </router-link>

      <a
        :href="tweetUrl"
        class="btn btn-tweet"
        target="_blank"
      >
        Tweet this
      </a>

      <p class="text-base">
        Copyright © {{ year }} <a href="http://linssen.me/">Wil Linssen</a>,
        and all of the code is <a href="http://github.com/linssen/better_than_predator">on GitHub</a>.<br>
        Powered by <a href="https://www.themoviedb.org/">themoviedb.org</a>.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Score from '@/components/Score.vue';

export default {
  name: 'Result',
  components: {
    Score,
  },
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
    versus() {
      return this.films.find(film => film.id !== 106);
    },
    tweetUrl() {
      if (!this.winner || !this.versus) {
        return '';
      }
      const thisUrl = `http://www.betterthanpredator.com/#/versus/${this.id}/${this.slug}/`;
      const conjoin = this.winner.id === 106 ? 'n’t as good as' : 'better than';
      const shareString = `I just found out that ${this.versus.title} `
        + `(${this.versus.releaseDate.getFullYear()}) is${conjoin} Predator.`;
      return 'https://twitter.com/share/'
            + `?url=${encodeURIComponent(thisUrl)}`
            + '&via=linssen'
            + `&text=${encodeURIComponent(shareString)}`;
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

<style>
  h1 {
    border-bottom: 1px dashed white;
  }
  a {
    @apply text-white;
  }
  p {
    @apply leading-tight font-normal mb-6 text-2xl;
  }
  .score-text {
    font-size: 4rem;
    line-height: 1;
  }
  .score-chart {
    height: 3.5rem;
  }
  .btn {
    @apply text-2xl bg-grey-darkest text-white no-underline inline-block relative;
    @apply pt-3 pb-3 pl-20 pr-8 mb-6;
  }
  .btn:before {
    @apply h-full block absolute pin-l pin-t w-12 bg-black bg-no-repeat;
    content: '';
    background-position: 50% 50%;
    background-size: 50% auto;
  }
  .btn:hover {
    @apply bg-grey-darker;
  }
  .btn-tweet:before {
    background-image: url('../assets/twitter.svg');
  }
  .btn-back:before {
    background-image: url('../assets/back.svg');
  }
</style>
