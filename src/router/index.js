import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'index',
        component: App.components.index
    },
    {
    	path: '/detail',
    	name: 'detail',
    	component: resolve => require(['@/components/detail.vue'], resolve)
    },
    {
    	path: '/record',
    	name: 'record',
    	component: resolve => require(['@/components/record.vue'], resolve)
    }
  ]
})
