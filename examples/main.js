import Vue from 'vue';
import App from './app.vue';
import SliderModal from '../src/index.js'
Vue.use(SliderModal);
// 开启debug模式
Vue.config.debug = true;

var app = new Vue({
  el: '#app',
  render: h => h(App)
})