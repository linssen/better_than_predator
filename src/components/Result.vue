<template>
  <div>
    <h1>{{ winner.title }} wins!</h1>
    <div class="film-results"/>
    <div class="info">
      <hr>
      <h3>Why does this even exist?</h3>
      <p>
        Because <a href="http://twitter.com/linssen">Wil</a>,
        <a href="http://twitter.com/gregwood">Greg</a>,
        and <a href="http://twitter.com/glenswinfield">Glen</a> were in a
        pub once and they thought you should be able to compare films to
        Predator. It is after all the ultimate benchmark.
      </p>

      <router-link
        :to="{name: 'Search'}"
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

      <p className="credit">
        Copyright © {{ year }} <a href="http://linssen.me/">Wil Linssen</a>,
        and all of the code is <a href="http://github.com/linssen/better_than_predator">on GitHub</a>.<br>
        Powered by <a href="https://www.themoviedb.org/">themoviedb.org</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: {
    id: { type: Number, required: true },
    slug: { type: String, required: true },
  },
  data: () => ({
    year: new Date().getFullYear(),
  }),
  computed: {
    films() {
      return [];
    },
    winner() {
      return { title: this.id };
    },
    tweetUrl() {
      return 'TWITTER';
    },
  },
};
</script>
