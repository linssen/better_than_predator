import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/components/Search';
import Result from '@/components/Result';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Search,
      name: 'Search',
    },
    {
      path: '/versus/:id/:slug',
      component: Result,
      name: 'Result',
      props: true,
    },
  ],
});
