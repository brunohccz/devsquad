import Vue from 'vue';
import Vuex from 'vuex';

import * as auth from './modules/auth';

Vue.use(Vuex);

const modules = {
    auth
};

export default new Vuex.Store({
    modules
});
