import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { adminRoutes } from "./adminroutes";
import { superAdminRoutes } from "./superadminroutes";
import { UserRoutes } from "./userroutes";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    role?: string;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/shared/Login.vue"),
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: () => import("../pages/shared/ForgotPassword.vue"),
  },
  {
    path: "/otp-verification/:email",
    name: "OtpVerification",
    component: () => import("../pages/shared/OtpVerification.vue"),
    props: true,
  },
  {
    path: "/reset-password/:email",
    name: "ResetPassword",
    component: () => import("../pages/shared/NewPassword.vue"),
    props: true,
  },

  ...superAdminRoutes,
  ...adminRoutes,
  ...UserRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.role && to.meta.role !== userRole) {
    next("/login");
  } else {
    next();
  }
});

export default router;
