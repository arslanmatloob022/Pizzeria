import type { RouteRecordRaw } from "vue-router";

export const superAdminRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: () => import("../layouts/SuperAdminLayout.vue"),
    meta: {
      requiresAuth: true,
      role: "superadmin",
    },
    children: [
      {
        path: "",
        name: "SuperAdminDashboard",
        component: () => import("../pages/superAdmin/SuperAdmin.vue"),
        meta: {
          breadcrumb: "Dashboard",
        },
      },

      {
        path: "/super-admin-profile",
        name: "SuperAdminProfile",
        component: () => import("../pages/shared/UserProfile.vue"),
        meta: {
          breadcrumb: "Account Setting",
        },
      },
    ],
  },
];
