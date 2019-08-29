import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from '~/layouts/AppLayout';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '*',
          component: () => import('./views/Errors/NotFound')
        },
        {
            path: '/',
            redirect: 'home',
            component: AppLayout,
            meta: {
              auth: false
            },
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "loader" */ './views/Home'),
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import(/* webpackChunkName: "loader" */ './views/Home'),
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import(/* webpackChunkName: "loader" */ './views/Home'),
                }
            ]
        },
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
                    component: () => import(/* webpackChunkName: "loader" */ './views/Home')
                }
            ]
        },
    ]
});
