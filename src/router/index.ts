import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import RestaurantDashboard from '../components/RestaurantDashboard.vue'
import MenuManagement from '../components/MenuManagement.vue'
import OrderManagement from '../components/OrderManagement.vue'

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
  },
  {
    path: '/menu-management',
    name: 'MenuManagement',
    component: MenuManagement
  },
  {
    path: '/order-management',
    name: 'OrderManagement',
    component: OrderManagement
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router