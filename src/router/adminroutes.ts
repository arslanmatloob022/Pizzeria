import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: () => import("../layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
      role: "admin",
      breadcrumb: "Dashboard",
    },
    children: [
      {
        path: "menu-management",
        name: "MenuManagement",
        component: () => import("../pages/admin/Admin.vue"),
        meta: {
          breadcrumb: "Menu Management",
        },
      },
      {
        path: "order-management",
        name: "OrderManagement",
        component: () => import("../pages/admin/OrderManagement.vue"),
        meta: {
          breadcrumb: "Order Management",
        },
      },
      {
        path: "profile",
        name: "AdminProfile",
        component: () => import("../pages/shared/UserProfile.vue"),
        meta: {
          breadcrumb: "Account Setting",
        },
      },
    ],
  },
];
