import Vue from 'vue';

import VueResource from "vue-resource";

import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.use(VueResource);

//开启debug模式
Vue.config.debug = true;


//定义组件
import home  from '../home.vue';
import foreign  from '../views/foreign.vue';
import war  from '../views/war.vue';
import finance  from '../views/finance.vue';
import detail  from '../views/detail.vue';

import loading  from '../components/loading.vue';

var routers = [
		{ path: '/', component: home},
		{ path: '/foreign', name:'foreign', component: foreign },
		{ path: '/war', name:'war', component: war },
		{ path: '/finance', name:'finance', component: finance},
		{ path: '/detail', name:'detail', component: detail }
];

//并且配置路由规则
window.router = new VueRouter({
	mode:'hash',
	base:__dirname,
	hashbang: true,
	history: false,
	saveScrollPosition: false,
	transitionOnLoad: false,
	routes:routers
})


export  default router



