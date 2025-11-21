import type { RouteRecordRaw } from "vue-router";

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../layouts/UserLayout.vue"),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "",
        name: "userMenuPage",
        component: () => import("../pages/user/MenuPage.vue"),
        meta: {
          breadcrumb: "Menu",
        },
      },

      {
        path: "cart-page",
        name: "CartPage",
        component: () => import("../pages/user/CartPage.vue"),
        meta: {
          breadcrumb: "My Cart",
        },
      },
      {
        path: "checkout",
        name: "userCheckout",
        component: () => import("../pages/user/Checkout.vue"),
        meta: {
          breadcrumb: "Check out",
        },
      },
      {
        path: "order-confirmation",
        name: "userOrderConfirmation",
        component: () => import("../pages/user/OrderConfirmation.vue"),
        meta: {
          breadcrumb: "Order Confirmation",
        },
      },
    ],
  },
];
