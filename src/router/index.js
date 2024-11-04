import { createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/LoginVue.vue')
  },
//   {
//     path: '/map',
//     name: 'Map',
//     component: () => import('@/views/Map.vue')
//   }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router