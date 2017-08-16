<template>
    <div class="search">
        <input
            v-model="query"
            v-on:keyup.down="navigateList(+1)"
            v-on:keyup.up="navigateList(-1)"
            v-on:keyup.enter="selectFilm"
            v-bind:class="{'search__query--loading': isLoading}"
            class="search__query"
            type="search"
        >
        <ul v-for="(film, index) in films">
            <li
                v-bind:class="{'search__result-item--active': index === selectedIndex}"
                v-on:mouseenter="setIndex(index)"
                class="search__result-item"
            >
                <router-link :to="{name: 'result', params: {id: film.id, slug: film.slug}}">
                    {{ film.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'typeahead',
    data: () => {
        return {selectedIndex: 0}
    },
    computed: {
        query: {
            get () { return this.$store.state.query; },
            set (val) {
                this.$store.dispatch('search', {
                    query: val
                });
            }
        },
        ...mapState(['films', 'isLoading'])
    },
    methods: {
        navigateList (moveBy) {
            var newPos = this.selectedIndex + moveBy;
            var maxVal = (this.films || []).length - 1;
            if (newPos <= 0) newPos = 0;
            if (newPos >= maxVal) newPos = maxVal;
            this.selectedIndex = newPos;
        },
        setIndex (index) {
            this.selectedIndex = index;
        },
        selectFilm () {
            var film = this.$store.films[this.selectedIndex];
            this.$router.push({
                path: 'result',
                params: {id: film.id, slug: film.slug}
            });
        }
    }
}
</script>
<style>
    .search__result-item--active {
        background: salmon;
    }
</style>
