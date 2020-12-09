import Vue from 'vue';

Vue.component('blognav', require('./components/blognav').default);
Vue.component('blogheader', require('./components/header').default);
Vue.component('blogfooter', require('./components/footer').default);
Vue.component('slider', require('./components/slider').default);
Vue.component('radio', require('./components/radio').default);
Vue.component('selection-custom', require('./components/selection').default);
Vue.component('statistics', require('./components/data').default);
Vue.component('proof', require('./components/proof').default);
Vue.component('application', require('./application').default);
Vue.component('proof', require('./components/proof').default);

new Vue({
    el: '#app', 
});