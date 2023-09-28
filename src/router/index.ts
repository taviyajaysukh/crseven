import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import WinPage from '../views/WinPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/win'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/win',
    name: 'Win',
    component: WinPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
