import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import RestaurantDashboard from '../components/RestaurantDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: RestaurantDashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router