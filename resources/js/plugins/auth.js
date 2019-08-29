import bearer from '@websanova/vue-auth/drivers/auth/bearer';
import axios from '@websanova/vue-auth/drivers/http/axios.1.x';
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x';

const config = {
    auth: bearer,
    http: axios,
    router,
    tokenStore: ['localStorage'],
    loginData: {
        redirect: '/dashboard'
    },
    registerData: {
        redirect: '/dashboard',
        autoLogin: true
    }
};

export default config
