<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const userRole = computed(() => localStorage.getItem("userRole") || "");
const menuItems = computed(() => authStore.getMenuItemsByRole(userRole.value));
const sidebarOpen = ref(false);
const pageTitle = computed(
  () => (route.meta?.breadcrumb as string) || "Dashboard"
);

const handleSidebarToggle = (isOpen: boolean) => {
  sidebarOpen.value = isOpen;
};
</script>

<template>
  <div class="min-h-screen bg-lightbg">
    <Notification />
    <Sidebar
      :title="'Pizza Admin'"
      :menu-items="menuItems"
      @toggle="handleSidebarToggle"
    />
    <div class="px-2 lg:px-8 lg:ml-20 pt-4 transition-all duration-300">
      <Navbar :title="pageTitle" />
    </div>
    <div
      class="px-2 lg:px-8 py-4 transition-all duration-300"
      :class="sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'"
    >
      <RouterView />
    </div>
  </div>
</template>
