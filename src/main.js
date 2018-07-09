import Vue from 'vue';

import store from '@/store';
import router from '@/router';
import App from '@/components/App';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  components: { App },
  template: '<App />',
}).$mount('#app');
