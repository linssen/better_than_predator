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

<style lang="scss">
@import '../bootstrap';

.film-results {
    @include grid-column(6);

    margin-bottom: em(24);
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
    font-size: em(64);
    padding-top: 0;
    line-height: 1;
    color: #506666;
    letter-spacing: -3px;
    overflow: hidden;

    @include grid-media($small-grid) {
        font-size: em(48);
        margin: 8px;
        padding-top: 8px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: transparentize($color__contast, 0.1);
        color: #fff;
    }

    small {
        font-size: em(24, 96);
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

    font-size: em(24);
    color: white;
    line-height: 1.2;
    position: static;

    @include grid-media($small-grid) {
        @include grid-column(2);
        @include grid-shift(0);

        position: relative;
        font-size: em(16);
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

        font-size: em(20, 16);
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
    font-size: em(16, 24);
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
