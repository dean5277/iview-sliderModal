# sliderModal
** 右侧滑出modal 基于iview Modal的基础上做开发，抽离出来一个单独的模块。避免iview更新的时候要重新兼容。 <br />


如果有Bug，请提交一下issues <br />

## ![slideModal](http://7xjfvt.com1.z0.glb.clouddn.com/demo/a.gif)

## Usage

|   key  |  params   |
|:-------|:----------|
| styles |  object   |

npm install slider-modal <br />
import SliderModal from 'slider-modal'; <br />
import 'slider-modal/dist/styles/sliderModal.css';  <br />
Vue.use(SliderModal)<br />

```html

import Vue from 'vue'
import App from './App'
import SliderModal from 'slider-modal';
import 'slider-modal/dist/styles/sliderModal.css'; 
Vue.use(SliderModal)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})




```



