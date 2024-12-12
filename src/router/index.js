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
    children:[
      {
        path: '/StrategyAi',
        name: 'StrategyAi',
        component: () => import('@/components/StrategyAi.vue')
      },
      {
        path: 'StrategyList',
        name: 'StrategyList',
        component: () => import('@/components/StrategyList.vue')
      },
      {
        path: '/StrategyData',
        name: 'StrategyData',
        component: () => import('@/components/StrategyData.vue')
      },
      {
        path: '/StrategyGuide',
        name: 'StrategyGuide',
        component: () => import('@/components/StrategyGuide.vue'),
      },
      {
        path: '/classiFication',
        name: 'classiFication',
        component: () => import('@/components/classiFication.vue'),
      },
      {
        path: '/DetailFication',
        name: 'DetailFication',
        component: () => import('@/components/DetailFication.vue'),
      }
    ]
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