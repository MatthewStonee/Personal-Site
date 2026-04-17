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
      title: 'One Rep Max Calculator'
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
    meta: { title: 'Todo List' }
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../components/CalcComponent.vue'),
    meta: { title: 'Calculator' }
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('../views/Weather.vue'),
    meta: {
      title: 'Weather'
    }
  },
  {
    path: '/NBA',
    name: 'NBA',
    component: () => import('../views/NBA.vue'),
    meta: { title: 'NBA' }
  },
  {
    path: '/user',
    name: 'User Create',
    component: () => import('../components/UserCreate.vue'),
    meta: { title: 'Create User' }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../components/Edit.vue'),
    meta: { title: 'Edit User' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Not Found' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  const title = to.meta?.title
  document.title = title ? `${title} | Matthew Stone` : 'Matthew Stone'
})

export default router
