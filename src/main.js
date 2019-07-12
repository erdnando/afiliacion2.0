import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';

import axios from "axios";
import VueAxios from 'vue-axios';
import store from './store';
import VueSignature from 'vue-signature-pad'


Vue.use(VueAxios, axios, VueSignature);

Vue.config.productionTip = false;

export var bus =new Vue();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');



