<template>
    <div class="search">
        <input
            v-model="query"
            v-on:keyup.down="navigateList(+1)"
            v-on:keyup.up="navigateList(-1)"
            v-bind:class="{'search__query--loading': isLoading}"
            class="search__query"
            type="search"
        >
        <ul v-for="(film, index) in films">
            <li
                v-bind:class="{'search__result-item--active': index === selectedIndex}"
                class="search__result-item"
            >
                {{ film.title }}
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
        }
    }
}
</script>
<style>
    .search__result-item--active {
        background: salmon;
    }
</style>
