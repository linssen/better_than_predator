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
});
