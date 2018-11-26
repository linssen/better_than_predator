import Vue from 'vue';
import Vuex from 'vuex';
import film from '@/api/film';
import slugify from '@/utils/slugify';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    query: null,
    films: [],
  },
  actions: {
    search(context, params) {
      context.commit('setQuery', { query: params.query });
      if (context.state.query.length < 2) {
        context.commit('clearFilms');
        return;
      }
      context.commit('toggleIsLoading', true);
      film.find(context.state.query)
        .then(xhr => context.commit('searchReceived', xhr));
    },
    find(context, params) {
      context.commit('toggleIsLoading', true);
      film.findOne(params.id)
        .then(xhr => context.commit('found', xhr));
    },
    clearFilms(context) {
      context.commit('clearFilms');
    },
  },
  mutations: {
    toggleIsLoading(state, toggle) {
      if (toggle === null || typeof toggle === 'undefined') {
        state.isLoading = !state.isLoading;
      }
      state.isLoading = toggle;
    },
    setQuery(state, props) {
      state.query = props.query;
    },
    clearFilms(state) {
      state.films = [];
    },
    found(state, xhr) {
      state.isLoading = false;
      state.films.push(JSON.parse(xhr.responseText));
    },
    searchReceived(state, xhr) {
      state.isLoading = false;
      state.films = JSON.parse(xhr.responseText).results.map(item => ({
        id: item.id,
        title: item.title,
        releaseDate: item.release_date,
        voteAvg: item.vote_average,
        slug: slugify(item.title),
      }));
    },
  },
  getters: {
    filmsByScore(state) {
      return state.films
        .slice()
        .sort((a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average));
    },
    poster(state) {
      return (id) => {
        const item = state.films.find(f => f.id === id);
        return `http://image.tmdb.org/t/p/original/${item.poster_path}`;
      };
    },
  },
});
