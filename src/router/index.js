import { createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/LoginVue.vue')
  },
  {
    path: '/HomeMap/:id',
    name: 'HomeMap',
    component: () => import('@/components/HomeMap.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router