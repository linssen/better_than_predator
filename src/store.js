import Vue from 'vue';
import Vuex from 'vuex';
import film from '@/api/film';
import slugify from '@/utils/slugify';

Vue.use(Vuex);

function mapFilm(item) {
  return {
    id: parseInt(item.id, 10),
    title: item.title,
    releaseDate: new Date(item.release_date),
    voteAvg: parseFloat(item.vote_average),
    slug: slugify(item.title),
    posterPath: item.poster_path,
  };
}

export const actions = {
  search(context, params) {
    context.commit('setQuery', { query: params.query });
    if (!context.state.query || context.state.query.length < 2) {
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
};

export const getters = {
  filmsByScore(state) {
    return state.films
      .slice()
      .sort((a, b) => parseFloat(b.voteAvg) - parseFloat(a.voteAvg));
  },
  poster(state) {
    return (id) => {
      const item = state.films.find(f => f.id === id);
      return `http://image.tmdb.org/t/p/original/${item.posterPath}`;
    };
  },
};

export const mutations = {
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
    state.films.push(mapFilm(JSON.parse(xhr.responseText)));
  },
  searchReceived(state, xhr) {
    state.isLoading = false;
    state.films = JSON.parse(xhr.responseText).results.map(mapFilm);
  },
};

export default new Vuex.Store({
  state: {
    isLoading: false,
    query: null,
    films: [],
  },
  actions,
  mutations,
  getters,
});
