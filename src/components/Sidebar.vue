<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, computed, watch } from "vue";
import { Menu, X, LogOut } from "lucide-vue-next";
import { mediaData } from "@/lib/mediaData";
import { useAuthStore } from "@/store/auth";

interface MenuItem {
  path: string;
  label: string;
  icon?: any;
  roles?: string[];
}

interface Props {
  title?: string;
  menuItems: MenuItem[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "App",
});
console.log(props.title);
const emit = defineEmits<{
  (e: "toggle", isOpen: boolean): void;
}>();

const router = useRouter();
const route = useRoute();
const isOpen = ref(false);
const isMobileOpen = ref(false);

const userRole = computed(() => localStorage.getItem("userRole") || "");

const toggleSidebar = () => {
  if (window.innerWidth < 1024) {
    isMobileOpen.value = !isMobileOpen.value;
  } else {
    isOpen.value = !isOpen.value;
    emit("toggle", isOpen.value);
  }
};

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    isMobileOpen.value = false;
  }
};

const handleLogout = () => {
  const authStore = useAuthStore();
  authStore.logout();
  router.push("/login");
};

watch(
  () => route.path,
  () => {
    closeSidebarOnMobile();
  }
);
</script>

<template>
  <div
    v-if="isMobileOpen"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    @click="toggleSidebar"
  ></div>

  <!-- Sidebar -->
  <div
    class="fixed inset-y-0 left-0 lg:left-4 rounded-2xl lg:my-3 z-50 bg-black text-white transition-all duration-300 ease-in-out"
    :class="[
      isMobileOpen ? 'translate-x-0' : '-translate-x-full',
      'lg:translate-x-0',
      isMobileOpen ? 'w-64' : isOpen ? 'lg:w-64 w-64' : 'lg:w-20 w-24',
    ]"
  >
    <div
      class="flex items-center justify-between h-16 border-b border-gray-400 px-4"
    >
      <!-- <h1
        v-if="isOpen"
        class="text-xl font-bold text-white transition-opacity duration-300"
        :class="isOpen ? 'opacity-100' : 'opacity-0'"
      >
        {{ title }}
      </h1> -->
      <img :src="mediaData.logo" alt="Logo" class="h-10" v-if="!isOpen" />

      <button
        @click="toggleSidebar"
        class="p-02 rounded-full hover:bg-gray-800 transition-colors ml-auto"
      >
        <!-- <ChevronLeft v-if="isOpen" :size="24" class="hidden lg:block" />
        <ChevronRight v-else :size="24" class="hidden lg:block" /> -->
        <X v-if="isMobileOpen" :size="24" class="lg:hidden" />
        <Menu v-else :size="24" class="lg:hidden" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="mt-8 relative pl-2">
      <div class="space-y-1">
        <template v-for="item in menuItems" :key="item.path">
          <div
            v-if="!item.roles || item.roles.includes(userRole)"
            class="relative"
          >
            <!-- Active item with curved background -->
            <div
              v-if="route.path === item.path"
              class="absolute inset-0 curved-active-bg"
            ></div>

            <router-link
              :to="item.path"
              class="relative flex items-center h-12 px-2 transition-colors rounded-lg"
              :class="{
                'text-black active-menu': route.path === item.path,
                'text-gray-400 hover:text-white hover:bg-gray-900 ':
                  route.path !== item.path,
                'justify-center': !isOpen && !isMobileOpen,
                'justify-start': isOpen || isMobileOpen,
                '': isOpen || isMobileOpen,
              }"
            >
              <component
                v-if="item.icon"
                :is="item.icon"
                :size="24"
                class="relative z-10 flex-shrink-0"
              />
              <span
                v-if="isOpen || isMobileOpen"
                class="ml-3 text-sm font-medium relative z-10 whitespace-nowrap transition-opacity duration-300"
                :class="isOpen || isMobileOpen ? 'opacity-100' : 'opacity-0'"
              >
                {{ item.label }}
              </span>
            </router-link>
          </div>
        </template>
      </div>
    </nav>

    <!-- Logout Button at Bottom -->
    <div class="absolute bottom-8 border-t border-gray-400 left-0 right-0 px-2">
      <div class="relative mx-2">
        <button
          @click="handleLogout"
          class="relative flex items-center h-14 w-full px-4 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors rounded-lg"
          :class="{
            'justify-center': !isOpen && !isMobileOpen,
            'justify-start': isOpen || isMobileOpen,
          }"
        >
          <LogOut :size="24" class="relative z-10 flex-shrink-0" />
          <span
            v-if="isOpen || isMobileOpen"
            class="ml-3 text-sm font-medium relative z-10 whitespace-nowrap transition-opacity duration-300"
            :class="isOpen || isMobileOpen ? 'opacity-100' : 'opacity-0'"
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  </div>

  <button
    :class="isMobileOpen ? 'hidden' : 'block'"
    @click="toggleSidebar"
    class="fixed top-4 left-4 z-50 lg:hidden p-3 bg-black text-white rounded-full shadow-lg"
  >
    <Menu :size="24" />
  </button>
</template>

<style scoped>
* {
  -webkit-tap-highlight-color: transparent;
}

nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.curved-active-bg {
  background: white;
  background-color: white;
  position: relative;
}

.active-menu {
  background: #fff !important;
  background-color: aliceblue !important;
  padding: 0 !important;
  border-radius: 18px 0 0 18px !important;
}

.curved-active-bg::before {
  content: "";
  position: absolute;
  top: 20px;
  right: 0;
  left: 48px;
  width: 60%;
  height: 20px;
  background-color: #fff;
  background: transparent;
  transform: rotate(36deg);
  box-shadow: 0 10px 0 0 rgb(255, 255, 255);
}

.curved-active-bg::after {
  content: "";
  position: absolute;
  top: -15px;
  right: 0;
  left: 30px;
  /* bottom: 0; */
  width: 60%;
  height: 20px;
  background-color: #6c0000;
  background: transparent;
  transform: rotate(140deg);
  box-shadow: 0 -10px 0 0 rgb(255, 255, 255);
}
</style>
