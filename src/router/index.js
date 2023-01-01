import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddWorker from '../views/AddWorker.vue'
import AddChantier from '../views/AddChantier.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add_worker',
    name: 'add_worker',
    component: AddWorker
  },
  {
    path: '/add_chantier',
    name: 'add_chantier',
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
