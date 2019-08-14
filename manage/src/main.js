// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入 ElementUI  UI库
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// import ztreeData from './components/ztree/data.json';

import {api , mapUrl, dataDomainUrl, version, deteleObject} from './common/url';

// Vue.prototype.ztreeData = ztreeData;
Vue.prototype.url = api.url;
Vue.prototype.mapUrl = api.mapUrl;
Vue.prototype.dataDomainUrl = api.dataDomainUrl;
Vue.prototype.version = api.version;
Vue.prototype.deteleObject = deteleObject

import store from './store/index.js';

import "../static/css/base.css";

import axios from 'axios'
import {post,fetch} from './http/http';
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.bus = new Vue();
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
