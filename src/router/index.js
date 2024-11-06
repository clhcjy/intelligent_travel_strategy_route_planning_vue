import { createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/LoginVue.vue')
  },
  {
    path: '/HomeMap/:id',
    name: 'HomeMap',
    component: () => import('@/HomeMap.vue'),
  },
  {
    path: '/StrategyMap',
    name: 'StrategyMap',
    component: () => import('@/components/StrategyMap.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router