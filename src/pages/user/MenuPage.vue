<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { mediaData } from "@/lib/mediaData";
import { useClientStore } from "@/store/clientStore";
import { useNotifyStore } from "@/store/notify";

const cleintStore = useClientStore();
const notifyStore = useNotifyStore();
const router = useRouter();

// Get the scroll handler from parent layout
const handleVideoScroll =
  inject<(data: { scrollTop: number; isScrolling: boolean }) => void>(
    "handleVideoScroll"
  );

// Get navbar visibility state
const isNavbarVisible = inject<Ref<boolean>>("isNavbarVisible", ref(true));
const navbarHeight = inject<Ref<number>>("navbarHeight", ref(80));

// Check if mobile view
const isMobile = ref(false);
const viewportHeight = ref(
  typeof window !== "undefined" ? window.innerHeight : 0
);
const checkMobile = () => {
  if (typeof window === "undefined") return;
  isMobile.value = window.innerWidth < 768;
};
const updateViewportHeight = () => {
  if (typeof window === "undefined") return;
  viewportHeight.value = window.innerHeight;
};

// Category dropdown state
const isDropdownOpen = ref(false);
const activeCategory = ref(cleintStore.selectedCategory);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectCategory = (category: {
  id: number;
  title: string;
  key: string;
}) => {
  activeCategory.value = category.key;
  cleintStore.selectedCategory = category.key;
  isDropdownOpen.value = false;
};

const videoSectionRef = ref<HTMLElement | null>(null);
const videoRefs = ref<(HTMLVideoElement | null)[]>([]);
const videoWrappers = ref<(HTMLElement | null)[]>([]);
const activeVideoIndex = ref(0);
const scrollUpdateId = ref<number | null>(null);

const mobileButtonOffset = computed(
  () => "calc(env(safe-area-inset-bottom, 0px) + 24px)"
);

const setVideoRef = (
  el: Element | ComponentPublicInstance | null,
  index: number
) => {
  videoRefs.value[index] = el instanceof HTMLVideoElement ? el : null;
};

const setVideoWrapperRef = (
  el: Element | ComponentPublicInstance | null,
  index: number
) => {
  videoWrappers.value[index] = el instanceof HTMLElement ? el : null;
};

const triggerHapticFeedback = () => {
  if (!isMobile.value) return;
  if (typeof navigator === "undefined") return;
  if (typeof navigator.vibrate !== "function") return;
  navigator.vibrate(15);
};

const playVideoAtIndex = (index: number) => {
  const isNewVideo = index !== activeVideoIndex.value;
  activeVideoIndex.value = index;
  videoRefs.value.forEach((video, idx) => {
    if (!video) return;
    if (idx === index) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore play interruptions (common on mobile browsers)
        });
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
  if (isNewVideo) {
    triggerHapticFeedback();
  }
};

const evaluateActiveVideo = () => {
  if (!videoSectionRef.value || !videoWrappers.value.length) return;
  const containerRect = videoSectionRef.value.getBoundingClientRect();
  const containerCenter = containerRect.top + containerRect.height / 2;

  let closestIndex = -1;
  let minDistance = Number.POSITIVE_INFINITY;

  videoWrappers.value.forEach((wrapper, index) => {
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const wrapperCenter = rect.top + rect.height / 2;
    const distance = Math.abs(wrapperCenter - containerCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  if (closestIndex !== -1 && closestIndex !== activeVideoIndex.value) {
    playVideoAtIndex(closestIndex);
  }
};

const scheduleActiveVideoUpdate = () => {
  if (typeof window === "undefined") return;
  if (scrollUpdateId.value !== null) {
    cancelAnimationFrame(scrollUpdateId.value);
  }
  scrollUpdateId.value = requestAnimationFrame(() => {
    scrollUpdateId.value = null;
    evaluateActiveVideo();
  });
};

const handleResize = () => {
  checkMobile();
  updateViewportHeight();
  scheduleActiveVideoUpdate();
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize, { passive: true });
  nextTick(() => {
    scheduleActiveVideoUpdate();
    if (videoRefs.value.length) {
      playVideoAtIndex(
        Math.min(activeVideoIndex.value, videoRefs.value.length - 1)
      );
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (scrollUpdateId.value !== null) {
    cancelAnimationFrame(scrollUpdateId.value);
  }
});

watch(
  () => cleintStore.filteredMenuItems.length,
  () => {
    const itemCount = cleintStore.filteredMenuItems.length;
    if (!itemCount) {
      activeVideoIndex.value = 0;
    } else if (activeVideoIndex.value > itemCount - 1) {
      activeVideoIndex.value = 0;
    }

    videoRefs.value = new Array(itemCount).fill(null);
    videoWrappers.value = new Array(itemCount).fill(null);
    nextTick(() => {
      scheduleActiveVideoUpdate();
      if (itemCount) {
        playVideoAtIndex(Math.min(activeVideoIndex.value, itemCount - 1));
      }
    });
  },
  { immediate: true }
);

const FALLBACK_NAVBAR_HEIGHT = 80;

const videoDimensions = computed(() => {
  // On mobile, navbar is hidden so no offset
  if (isMobile.value) {
    const heightValue =
      viewportHeight.value > 0 ? `${viewportHeight.value}px` : "100dvh";
    return {
      height: heightValue,
      minHeight: heightValue,
      offset: 0,
    };
  }

  const navHeight = navbarHeight?.value ?? FALLBACK_NAVBAR_HEIGHT;
  const offset =
    isNavbarVisible?.value ?? true ? navHeight || FALLBACK_NAVBAR_HEIGHT : 0;

  const size = `calc(100vh - ${offset}px)`;

  return {
    height: size,
    minHeight: size,
    offset,
  };
});

const videoContainerStyle = computed(() => {
  const { height, minHeight } = videoDimensions.value;

  return {
    height,
    minHeight,
  };
});

const videoSectionStyle = computed(() => {
  const padding = videoDimensions.value.offset
    ? `${videoDimensions.value.offset}px`
    : "0px";

  return {
    paddingTop: padding,
    scrollPaddingTop: padding,
  };
});

// Animation state
const addingToCart = ref<number | null>(null);

function handlePlaceOrder(item: any) {
  // Start animation
  addingToCart.value = item.id;

  // Add to cart
  cleintStore.addToCart(item);
  notifyStore.notify.success(`${item.title} added to cart!`);

  // End animation after a short delay
  setTimeout(() => {
    addingToCart.value = null;
  }, 1000);
}

// Handle scroll events on the video container
const onVideoContainerScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (handleVideoScroll) {
    handleVideoScroll({
      scrollTop: target.scrollTop,
      isScrolling: true,
    });
  }
  scheduleActiveVideoUpdate();
};
</script>

<template>
  <main class="h-full w-full relative">
    <!-- Floating Category Dropdown (Top Left - Mobile Only) -->
    <div v-if="isMobile" class="fixed top-4 left-4 z-50">
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg flex items-center justify-center"
        >
          <i class="fa-solid fa-filter text-white text-lg"></i>
        </button>

        <!-- Dropdown Menu -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-2"
        >
          <div
            v-if="isDropdownOpen"
            class="absolute top-full mt-2 left-0 min-w-[200px] bg-[#1a1a1a]/95 backdrop-blur-md border border-white/30 rounded-lg shadow-xl overflow-hidden"
          >
            <button
              v-for="category in cleintStore.pizzaCategories"
              :key="category.id"
              @click="selectCategory(category)"
              :class="[
                'w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 flex items-center justify-between',
                activeCategory === category.key ? 'bg-red-600/20' : '',
              ]"
            >
              <span class="text-sm font-medium">{{ category.title }}</span>
              <i
                v-if="activeCategory === category.key"
                class="fa-solid fa-check text-red-500 text-xs"
              ></i>
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Floating Cart Icon (Mobile Only) -->
    <div v-if="isMobile" class="fixed top-4 right-4 z-50">
      <div class="relative">
        <button
          @click="router.push('/cart-page')"
          class="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg"
        >
          <i class="fa-solid fa-cart-shopping text-white text-lg"></i>
        </button>

        <span
          v-if="cleintStore.cartItemCount"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white"
        >
          {{ cleintStore.cartItemCount }}
        </span>
      </div>
    </div>

    <section
      v-if="cleintStore.filteredMenuItems.length"
      ref="videoSectionRef"
      @scroll="onVideoContainerScroll"
      class="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      style="scrollbar-width: none; -ms-overflow-style: none; -webkit-scrollbar: { display: none; }"
    >
      <div
        v-for="(item, index) in cleintStore.filteredMenuItems"
        :key="item.id"
        class="h-screen w-full snap-start snap-always relative"
        :ref="(el) => setVideoWrapperRef(el, index)"
      >
        <!-- Full-screen video background -->
        <video
          :src="item.video"
          class="absolute inset-0 w-full h-full object-cover"
          :ref="(el) => setVideoRef(el, index)"
          autoplay
          muted
          loop
          playsinline
        ></video>

        <!-- Gradient overlay for better text readability -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        <!-- Content overlay positioned at bottom -->
        <div
          class="absolute inset-x-0 bottom-0 z-10 transition-all duration-300"
          :class="
            activeVideoIndex === index
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          "
        >
          <!-- Content container with proper spacing from bottom -->
          <div class="px-4 pb-8 space-y-4">
            <!-- User info and price -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3 flex-1">
                <img :src="mediaData.user" class="w-12 h-12 rounded-full border-2 border-white/20" />
                <div class="flex-1">
                  <h3 class="font-bold text-white text-lg leading-tight">{{ item.title }}</h3>
                  <p class="text-gray-300 text-sm">{{ item.subtitle }}</p>
                </div>
              </div>
              <div class="text-right">
                <h2 class="font-bold text-white text-2xl">{{ item.price }}</h2>
              </div>
            </div>

            <!-- Description -->
            <p class="text-white text-sm leading-relaxed line-clamp-3 max-w-[85%]">
              {{ item.description }}
            </p>

            <!-- Order button -->
            <div class="pt-2">
              <BaseButton
                @click="handlePlaceOrder(item)"
                :class="[
                  'w-full py-4 text-lg font-semibold transition-all duration-300 rounded-xl',
                  addingToCart === item.id
                    ? 'scale-95 bg-green-600 shadow-lg'
                    : 'scale-100 shadow-xl',
                ]"
              >
                <span
                  v-if="addingToCart === item.id"
                  class="flex items-center justify-center gap-2"
                >
                  <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                      class="opacity-25"
                    ></circle>
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      class="opacity-75"
                    ></path>
                  </svg>
                  Adding to Cart...
                </span>
                <span v-else>Order Now</span>
              </BaseButton>

              <!-- Success notification -->
              <Transition
                enter-active-class="transition-all duration-500"
                enter-from-class="opacity-0 scale-50 translate-y-0"
                enter-to-class="opacity-100 scale-100 -translate-y-16"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 scale-100 -translate-y-16"
                leave-to-class="opacity-0 scale-150 -translate-y-32"
              >
                <div
                  v-if="addingToCart === item.id"
                  class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  ✓ Added to Cart!
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-else class="h-screen w-full flex items-center justify-center">
      <h1 class="text-white text-center text-xl">
        No menu items available at the moment
      </h1>
    </div>
  </main>
</template>
