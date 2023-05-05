import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/DashBoardView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue')
        }
      ]
    }
  ]
})

export default router
