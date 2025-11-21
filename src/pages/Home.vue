<script setup lang="ts">
import SuperAdminLayout from "../layouts/SuperAdminLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import UserLayout from "../layouts/UserLayout.vue";

const userRole = computed(() => localStorage.getItem("userRole") || "");

const LayoutComponent = computed(() => {
  switch (userRole.value) {
    case "superadmin":
      return SuperAdminLayout;
    case "admin":
      return AdminLayout;
    default:
      return UserLayout;
  }
});
</script>

<template>
  <component :is="LayoutComponent" v-if="LayoutComponent">
    <router-view />
  </component>
  <div v-else class="min-h-screen bg-lightbg p-0">
    <router-view />
  </div>
</template>
