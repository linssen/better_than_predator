import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import store from './store';
import App from './components/App.vue';
import Search from './components/Search.vue';
import Result from './components/Result.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: Search, name: 'search' },
        { path: '/versus/:id/:slug', component: Result, name: 'result', props: true }
    ]
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
