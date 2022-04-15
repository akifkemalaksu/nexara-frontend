import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'orderlist',
                component: () => import('./components/OrderList.vue')
            },
            {
                path: '/order-list',
                name: 'orderlist',
                component: () => import('./components/OrderList.vue')
            },
            {
                path: '/create-order',
                name: 'createorder',
                component: () => import('./components/CreateOrder.vue')
            },
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
