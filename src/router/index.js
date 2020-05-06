import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import HelloWorld from '@/components/HelloWorld'
import explorer_index from '@/components/explorer/index'
import Login from '@/components/Login'
import demo from "../components/demo";
import Share from "../components/Share"

Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Share',
      component: Share,
      meta: {
        needLogin: false
      }
    },
    {
    	path: '/login',
    	name: 'login',
    	component: Login,
      meta: {
        needLogin: false
      }
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: explorer_index,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo,
      meta: {
        needLogin: false
      }
    }
  ]
});
