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
        path: '/StrategyLiveness',
        name: 'StrategyLiveness',
        component: () => import('@/components/StrategyLiveness.vue')
      },
      {
        path: '/StrategyAi',
        name: 'StrategyAi',
        component: () => import('@/components/StrategyAi.vue')
      },
      {
        path: '/StrategyList',
        name: 'StrategyList',
        component: () => import('@/components/StrategyList.vue')
      },
      {
        path: '/StrategyComment',
        name: 'StrategyComment',
        component: () => import('@/components/StrategyComment.vue')
      },
      {
        path: '/StrategyData',
        name: 'StrategyData',
        component: () => import('@/components/StrategyData.vue'),
        children:[
          {
            path: '/StrategyData/StrategyDataDetail',
            name: 'StrategyDataDetail',
            component: () => import('@/components/classiFication.vue')
          }
        ]
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
      },
      {
        path: '/PersonalCenter',
        name: 'PersonalCenter',
        component: () => import('@/components/PersonalCenter.vue'),
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