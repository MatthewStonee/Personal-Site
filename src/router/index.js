import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About'
    }
  },
  {
    path: '/onerm',
    name: 'onerm',
    component: () => import('../views/OneRM.vue'),
    meta: {
      title: 'OneRm'
    }
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: () => import('../views/Stocks.vue'),
    meta: {
      title: 'Stocks'
    }
  },
  {
    path: '/todo',
    name: 'ToDo List',
    component: () => import('../views/Todo.vue'),
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../views/Calc.vue'),
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('../views/Weather.vue'),
  },
  {
    path: '/NBA',
    name: 'NBA',
    component: () => import('../views/NBA.vue'),
  },
  {
    path: '/user',
    name: 'User Create',
    component: () => import('../components/UserCreate.vue'),
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../components/Edit.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
