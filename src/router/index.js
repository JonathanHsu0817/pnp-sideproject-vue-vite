import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('../views/FrontView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/front/ProductsView.vue')
        },
        {
          path: 'product/:id',
          component: () => import('../views/front/ProductView.vue'),
        },
        {
          path: 'cart',
          component: () => import('../views/front/CartCheck.vue')
        },
        {
          path: 'payment/:orderId',
          component: () => import('../views/front/PaymentView.vue'),
        },
        {
          path: 'paymentComplete/:orderId',
          component: () => import('../views/front/PaymentComplete.vue'),
        },
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/DashBoardView.vue'),
      children: [
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue')
        },
        {
          path: 'coupons',
          component: () => import('../views/admin/AdminCoupons.vue')
        },
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue')
        }
      ]
    }
  ]
})

export default router
