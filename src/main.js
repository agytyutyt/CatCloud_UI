// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axiosService from './utils/axios'

Vue.config.productionTip = false;
Vue.use(Vuex);

Vue.prototype.$service=axiosService.service;
Vue.prototype.getRemoteDir=axiosService.methods.getRemoteDir;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
