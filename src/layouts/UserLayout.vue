<script setup lang="ts">
import UserNavbar from "@/components/UserNavbar.vue";
import { ArrowLeft } from "lucide-vue-next";

const isNavbarVisible = ref(true);
const lastScrollY = ref(0);
const route = useRoute();
const router = useRouter();
const navbarElement = ref<HTMLElement | null>(null);
const navbarHeight = ref(0);

const updateNavbarHeight = () => {
  navbarHeight.value = navbarElement.value?.offsetHeight ?? 0;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  // Show navbar when scrolling up or at the top
  if (currentScrollY < lastScrollY.value || currentScrollY < 10) {
    isNavbarVisible.value = true;
  }
  // Hide navbar when scrolling down and past a threshold
  else if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isNavbarVisible.value = false;
  }

  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  nextTick(() => {
    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", updateNavbarHeight);
});

// Back button configuration based on current route
const backButtonConfig = computed(() => {
  const path = route.path;

  if (path === "/checkout") {
    return {
      show: true,
      label: "Back to Cart",
      route: "/cart-page",
    };
  } else if (path === "/cart-page") {
    return {
      show: true,
      label: "Back to Menu",
      route: "/",
    };
  }

  return { show: false };
});

const handleBackNavigation = () => {
  if (backButtonConfig.value.route) {
    router.push(backButtonConfig.value.route);
  }
};

// Provide handleVideoScroll for child components
const handleVideoScroll = (data: {
  scrollTop: number;
  isScrolling: boolean;
}) => {
  const currentScrollY = data.scrollTop;

  // Show navbar when scrolling up or at the top
  if (currentScrollY < lastScrollY.value || currentScrollY < 10) {
    isNavbarVisible.value = true;
  }
  // Hide navbar when scrolling down and past a threshold
  else if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isNavbarVisible.value = false;
  }

  lastScrollY.value = currentScrollY;
};

provide("handleVideoScroll", handleVideoScroll);
provide("isNavbarVisible", isNavbarVisible);
provide("navbarHeight", navbarHeight);

watch(isNavbarVisible, (visible) => {
  if (visible) {
    nextTick(() => {
      updateNavbarHeight();
    });
  }
});
</script>

<template>
  <div
    class="min-h-screen relative bg-[#0F0F0F] flex flex-col items-center text-white"
  >
    <!-- Toast Notification -->
    <Notification />

    <!-- Back Button (when applicable) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform -translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform -translate-x-full opacity-0"
    >
      <div v-if="backButtonConfig.show" class="fixed top-4 left-4 z-[100]">
        <button
          @click="handleBackNavigation"
          class="flex items-center gap-2 mt-1 bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#333] hover:border-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#232323] shadow-lg"
        >
          <ArrowLeft :size="20" />
          <!-- <span class="text-sm font-medium">{{ backButtonConfig.label }}</span> -->
        </button>
      </div>
    </Transition>

    <!-- Navbar with hide-on-scroll functionality (hidden on mobile for menu page, hidden completely for cart, checkout, and order confirmation) -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="transform -translate-y-full"
      enter-to-class="transform translate-y-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="transform translate-y-0"
      leave-to-class="transform -translate-y-full"
    >
      <div
        v-show="isNavbarVisible && !['/cart-page', '/checkout', '/order-confirmation'].includes(route.path)"
        class="fixed top-0 z-50 w-full"
        :class="{ 'hidden md:block': route.path === '/' }"
      >
        <div
          ref="navbarElement"
          class="w-full bg-[#0F0F0F]/90 backdrop-blur-sm"
        >
          <UserNavbar />
        </div>
      </div>
    </Transition>

    <main
      class="flex-1 w-full mx-auto"
      :class="
        route.path === '/'
          ? 'h-screen overflow-hidden'
          : ['/cart-page', '/checkout', '/order-confirmation'].includes(route.path)
          ? 'max-w-7xl px-4 sm:px-6 lg:px-2 pt-6 mb-10'
          : 'max-w-7xl px-4 sm:px-6 lg:px-2 pt-20 mb-10' +
            (!isNavbarVisible ? ' pt-6' : '')
      "
    >
      <router-view />
    </main>
  </div>
</template>
