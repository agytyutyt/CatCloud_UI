import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import HelloWorld from '@/components/HelloWorld'
import explorer_index from '@/components/explorer/index'
import Login from '@/components/Login'
import demo from "../components/demo";

Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        needLogin: true
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
