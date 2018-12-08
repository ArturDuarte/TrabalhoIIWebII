import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from "vue-resource"
import VModal from 'vue-js-modal'


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VModal);

// Vue.prototype.$eventHub = new Vue();

import App from './App.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App

  }
});
