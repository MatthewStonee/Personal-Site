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
    path: '/walkthrough',
    name: 'walkthrough',
    component: () => import('../views/Walkthrough.vue'),
    meta: { title: '3D Apartment Walkthrough' }
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

const SITE_ORIGIN = 'https://matthewstone.co'

router.afterEach((to) => {
  const title = to.meta?.title
  document.title = title ? `${title} | Matthew Stone` : 'Matthew Stone'

  // One canonical URL per page; static routes use their declared casing (e.g. /NBA).
  const record = to.matched[to.matched.length - 1]
  const path = record && !record.path.includes(':') ? record.path : to.path
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE_ORIGIN + path)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', SITE_ORIGIN + path)

  // Hosting answers unknown paths with a 200, so keep the 404 page out of search results.
  document.querySelector('meta[name="robots"]')?.remove()
  if (to.name === 'NotFound') {
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)
  }
})

export default router
