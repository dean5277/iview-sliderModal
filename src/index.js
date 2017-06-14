// es6 polyfill
import 'core-js/fn/array/find-index';


import SliderModal from './components/slider-modal';


const SM = {
    
    SliderModal
};

const install = function (Vue, opts = {}) {
  
    Object.keys(SM).forEach((key) => {
        Vue.component(key, SM[key]);
    });


    Vue.prototype.$SliderModal = SliderModal;
  
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default  Object.assign(SM, {install});

