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
@import '../bootstrap';

.film-results {
    @include grid-column(6);

    margin-bottom: 1.5rem;
    position: absolute;
    left: 0;

    @include grid-media($small-grid) {
        @include grid-collapse;

        position: static;
    }
}
.film-results__film {
    @include grid-column(3 of 6);

    position: relative;

    @include grid-media($small-grid) {
        @include grid-column(2);
    }
}
.film-results__poster,
.film-results__rating {
    box-sizing: border-box;

    padding: 8px;
    background: white;
}
.film-results__poster {
    img {
        width: 100%;
    }
}
.film-results__rating {
    font-size: 4rem;
    padding-top: 0;
    line-height: 1;
    color: #506666;
    letter-spacing: -3px;
    overflow: hidden;

    @include grid-media($small-grid) {
        font-size: 3rem;
        margin: 8px;
        padding-top: 8px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: transparentize($color__contast, 0.1);
        color: #fff;
    }

    small {
        font-size: 1.5rem;
        letter-spacing: 0;
    }
}
.film-results__score {
    @include grid-column(1 of 3);
}
.film-results__stars {
    @include grid-column(2 of 3);
    // @include omega;

    float: right;

    svg {
        width: 100%;
        height: 1em;
    }
    .outline {
        stroke: #CCCCCC;

        @include grid-media($small-grid) {
            stroke: #555555;
        }
    }
    .highlight {
        stroke: #CD2E1B;
    }
}
.info {
    @include grid-column(6);
    @include grid-shift(6);

    font-size: 1.5rem;
    color: white;
    line-height: 1.2;
    position: static;

    @include grid-media($small-grid) {
        @include grid-column(2);
        @include grid-shift(0);

        position: relative;
        font-size: 1rem;
    }

    h3 {
        margin: 0;
    }
}
.info__button {
    @include grid-column(3 of 6);

    @include grid-media($small-grid) {
        @include grid-collapse;
        // @include omega;
        @include grid-shift(2 of 2);

        font-size: 1.25rem;
        position: absolute;
        left: 0;
        top: 0;
    }
}
.info__button--last {
    // @include omega;

    @include grid-media($small-grid) {
        top: 3em;
    }
}
.credit {
    font-size: 1rem;
}

@keyframes dots {
    0% {
        transform: scale(0.4) rotate(5deg);
        left: 100%;
        top: 100%;
    }
    20% {
        transform: scale(1) rotate(8deg);
        left: 20%;
        top: 4%;
    }
    30% {
        transform: scale(0.6) rotate(15deg);
        left: 27%;
        top: 7%;
    }
    40% {
        transform: scale(0.63) rotate(10deg);
        left: 35%;
        top: 6%;
    }
    50% {
        transform: scale(0.62) rotate(20deg);
        left: 42%;
        top: 9%;
    }
    70% {
        left: 10%;
        top: 7%;
    }
    100% {
        transform: scale(0.4) rotate(100deg);
        left: 0%;
        top: 100%;
    }
}
.easter {
    animation: dots 40.0s ease-in-out;

    width: 100px;
    height: 100px;
    top: 100%;
    left: 100%;
    position: absolute;
}
.easter__point {
    border-radius: 50px;
    box-shadow: 0 0 20px red;
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 0, 0, 0.7);

    &:nth-child(1) {
        left: 100%;
    }
    &:nth-child(2) {
        left: 50%;
        top: 100%;
    }
}

</style>
