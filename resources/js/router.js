import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from '~/layouts/AppLayout';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        // Landing Page
        {
            path: '/',
            redirect: 'landing-page',
            component: AppLayout,
            meta: {
                auth: undefined
            },
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "app" */ './views/Home'),
                },
            ]
        },
        // Auth
        {
            path: '/auth',
            redirect: 'login',
            component: AppLayout,
            meta: {
              auth: false
            },
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import(/* webpackChunkName: "auth" */ './views/Auth/Login'),
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import(/* webpackChunkName: "auth" */ './views/Auth/Register'),
                }
            ]
        },
        // Dashboard
        {
            path: '/dashboard',
            redirect: 'dashboard',
            component: AppLayout,
            meta: {
                auth: true
            },
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard/Home'),
                }
            ]
        },
        {
            path: '/403',
            component: () => import('./views/Errors/Forbidden'),
        },
        {
            path: '*',
            component: () => import('./views/Errors/NotFound')
        },
    ]
});
