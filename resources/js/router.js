import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from '~/layouts/AppLayout';

Vue.use(Router);

// Errors
import NotFound from './views/Errors/NotFound';
import Forbidden from './views/Errors/Forbidden';

// Auth
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';

// Dashboard
import DashboardHome from './views/Dashboard/Home';

// Products
import Products from './views/Dashboard/Products/Index';
import ProductCreate from './views/Dashboard/Products/Create';
import ProductEdit from './views/Dashboard/Products/Edit';
import ProductView from './views/Dashboard/Products/Show';
import ProductsImport from './views/Dashboard/Products/Import';

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: 'auth'
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
                    component: Login,
                },
                {
                    path: '/register',
                    name: 'register',
                    component: Register,
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
                    component: DashboardHome,
                },
                {
                    path: '/products',
                    name: 'products.index',
                    component: Products,
                },
                {
                    path: '/products/create',
                    name: 'products.create',
                    component: ProductCreate,
                },
                {
                    path: '/products/:id-:slug',
                    name: 'products.show',
                    component: ProductView,
                },
                {
                    path: '/products/:id-:slug/edit',
                    name: 'products.edit',
                    component: ProductEdit,
                },
                {
                    path: '/products/import',
                    name: 'products.import',
                    component: ProductsImport,
                },
            ]
        },
        {
            path: '/403',
            component: Forbidden,
        },
        {
            path: '*',
            component: NotFound
        },
    ]
});
