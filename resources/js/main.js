import './bootstrap';

import Vue from 'vue';
import VueAuth from '@websanova/vue-auth';
import VueAxios from 'vue-axios';

import App from '~/App.vue';
import router from '~/router';
import store from '~/store';
import auth from '~/plugins/auth';

// Set vue router
Vue.router = router;

// Set vue authentication
Vue.use(VueAxios, axios);
Vue.use(VueAuth, auth);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
