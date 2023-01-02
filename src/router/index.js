import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddWorker from '../views/AddWorker.vue'
import Chantier from '../views/chantier/index.vue'
import AddChantier from '../views/chantier/add.vue'

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
    path: '/chantier',
    name: 'chantier',
    component: Chantier
  },
  {
    path: '/chantier/add',
    name: 'chantier/add',
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
