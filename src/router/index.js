import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Chantier from '../views/chantier/index.vue'
import AddChantier from '../views/chantier/add.vue'
import Workers from '../views/worker/index.vue'
import AddWorker from '../views/worker/add.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/worker',
    name: 'worker',
    component: Workers
  },
  {
    path: '/worker/add',
    name: 'worker_add',
    component: AddWorker
  },
  {
    path: '/chantier',
    name: 'chantier',
    component: Chantier
  },
  {
    path: '/chantier/add',
    name: 'chantier_add',
    component: AddChantier
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory("http://localhost:1420"),
  routes
})

export default router
