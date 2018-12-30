<template>
  <div class="p-4" v-if="winner">
    <h1 class="title w-full md:w-1/2 text-white text-5xl text-center block md:float-right mb-6 pb-6">
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
            + `?url=${window.encodeURIComponent(thisUrl)}`
            + '&via=linssen'
            + `&text=${window.encodeURIComponent(shareString)}`;
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
    @apply text-2xl bg-grey-darkest pt-3 pb-3 pl-20 pr-8 mb-6 text-white no-underline inline-block relative;
  }
  .btn:before {
    @apply h-full block absolute pin-l pin-t w-12 bg-black bg-no-repeat;
    content: '';
    background-position: 50% 50%;
  }
  .btn:hover {
    @apply bg-grey-darker;
  }
  .btn-tweet:before {
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230.762%22%20height%3D%2225%22%20viewBox%3D%220%200%2030.762%2025%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M30.762%202.959c-1.132.502-2.348.841-3.625.994%201.303-.781%202.304-2.018%202.775-3.492-1.219.723-2.57%201.249-4.008%201.532-1.15-1.227-2.791-1.993-4.606-1.993-3.486%200-6.311%202.826-6.311%206.311%200%20.495.056.976.163%201.438-5.245-.263-9.896-2.775-13.008-6.594-.544.932-.855%202.017-.855%203.173%200%202.19%201.114%204.121%202.808%205.253-1.035-.032-2.008-.316-2.859-.789l-.001.079c0%203.058%202.176%205.609%205.063%206.189-.53.144-1.087.221-1.663.221-.407%200-.802-.04-1.187-.113.803%202.507%203.134%204.332%205.896%204.383-2.16%201.693-4.881%202.702-7.838%202.702-.509%200-1.012-.03-1.506-.088%202.793%201.79%206.11%202.835%209.675%202.835%2011.609%200%2017.957-9.617%2017.957-17.957%200-.274-.006-.546-.018-.816%201.232-.89%202.302-2.002%203.148-3.268z%22/%3E%3C/svg%3E');
    background-size: 50% 50%;
  }
  .btn-back:before {
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20viewBox%3D%220%200%2025%2025%22%20style%3D%22background-color%3A%23ffffff00%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2225%22%20height%3D%2225%22%3E%3Cg%3E%3Cpath%20d%3D%22M0%2012.5c0-6.904%205.596-12.5%2012.5-12.5s12.5%205.596%2012.5%2012.5-5.596%2012.5-12.5%2012.5-12.5-5.596-12.5-12.5z%22%20fill%3D%22%23161819%22/%3E%3Cpath%20d%3D%22M19%2014.5h-7.167v3.5l-5.833-5.5%205.833-5.5v3.5h7.167v4z%22%20fill%3D%22%23fff%22/%3E%3C/g%3E%3C/svg%3E');
    background-size: 70% 70%;
  }
</style>
