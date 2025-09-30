import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import OtpVerification from '../components/OtpVerification.vue'
import NewPassword from '../components/NewPassword.vue'
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/otp-verification',
    name: 'OtpVerification',
    component: OtpVerification
  },
  {
    path: '/new-password',
    name: 'NewPassword',
    component: NewPassword
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