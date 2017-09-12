import Vue from 'vue';
import App from './App.vue'

import router from './router/router';
require ('./css/common.css');
require ('./css/loading.css');
require('vconsole');//web调试工具



//路由器会创建一个App实例,并且挂载到选择符#app匹配的元素上
let data = {
	router,
	render:h=>h(App)
}

const app = new Vue(data).$mount('#app');

window._app = router.app.$children[0].$data;

