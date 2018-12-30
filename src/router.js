import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/components/Search.vue';
import Result from '@/components/Result.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Search,
      name: 'search',
    },
    {
      path: '/versus/:id/:slug',
      component: Result,
      name: 'result',
      props: true,
    },
  ],
});
