import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

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
    component: () => import('../views/About'),
    meta: {
      title: 'About'
    }
  },
  {
    path: '/onerm',
    name: 'onerm',
    component: () => import('../views/OneRM'),
    meta: {
      title: 'OneRm'
    }
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: () => import('../views/Stocks'),
    meta: {
      title: 'Stocks'
    }
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: () => import('../components/HelloWorld'),
  },
  {
    path: '/todo',
    name: 'ToDo List',
    component: () => import('../views/Todo'),
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../views/Calc'),
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('../views/Weather'),
  },
  {
    path: '/NBA',
    name: 'NBA',
    component: () => import('../views/NBA'),
  },
]

const router = new VueRouter( {
  mode: 'history',
  routes
})

export default router

