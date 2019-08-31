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
                },
                {
                    path: '/products',
                    name: 'products.index',
                    component: () => import(/* webpackChunkName: "dashboard" */ '~/views/Dashboard/Products/Index'),
                },
                {
                    path: '/products/create',
                    name: 'products.create',
                    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard/Products/Create'),
                },
                {
                    path: '/products/:id-:slug',
                    name: 'products.show',
                    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard/Products/Show'),
                },
                {
                    path: '/products/:id-:slug/edit',
                    name: 'products.edit',
                    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard/Products/Edit'),
                },
                {
                    path: '/products/import',
                    name: 'products.import',
                    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard/Products/Import'),
                },
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
