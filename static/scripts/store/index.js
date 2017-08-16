import Vue from 'vue';
import Vuex from 'vuex';
import film from '../api/film';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false, query: null, films: []
    },
    actions: {
        search (context, params) {
            context.commit('setQuery', {query: params.query});
            if (context.state.query.length < 2) {
                context.commit('clearFilms');
                return;
            };
            context.commit('toggleIsLoading', true);
            return film.find(context.state.query)
                .then((xhr) => {
                    context.commit('searchReceived', xhr);
                })
                // .fail((xhr) => {
                //     debugger;
                // });
        }
    },
    mutations: {
        toggleIsLoading (state, toggle) {
            if (toggle === null || typeof toggle === 'undefined') {
                toggle = !state.isLoading;
            }
            state.isLoading = toggle;
        },
        setQuery (state, props) {
            state.query = props.query;
        },
        clearFilms (state) {
            state.films = [];
        },
        searchReceived (state, xhr) {
            state.isLoading = false;
            state.films = JSON.parse(xhr.responseText).results.map((film) => {
                return {
                    id: film.id,
                    title: film.title,
                    releaseDate: film.release_date,
                    voteAvg: film.vote_average
                };
            });
        }
    }
});
