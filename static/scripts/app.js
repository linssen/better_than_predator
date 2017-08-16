import Vue from 'vue';
import store from './store';
import Search from './components/Search.vue';

new Vue({
    el: '#app',
    store: store,
    render: h => h(Search)
});
