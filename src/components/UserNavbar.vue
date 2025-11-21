<script setup lang="ts">
import { mediaData } from "@/lib/mediaData";
import { useClientStore } from "@/store/clientStore";
const clientStore = useClientStore();
const activeMenu = ref(clientStore.pizzaCategories[0]!!.title);

const handleMenuSelect = (item: { id: number; title: string; key: string }) => {
  activeMenu.value = item.title;
  clientStore.selectedCategory = item.key;
};
</script>

<template>
  <nav
    class="flex flex-wrap items-center lg:border border-lightbg/25 justify-between w-full max-w-7xl mx-auto lg:mt-2 px-4 py-1 rounded-lg lg:bg-gradient-to-b from-[#2b2b2b] to-[#1a1a1a] text-white lg:shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
  >
    <div class="hidden md:flex items-center gap-2">
      <div
        class="flex items-center justify-center rounded-full w-10 h-10 text-black text-sm font-bold"
      >
        <img :src="mediaData.logo" class="object-cover" />
      </div>
      <h4
        @click="$router.push('/')"
        class="font-semibold text-white mt-3 text-xl cursor-pointer"
      >
        restaurant
      </h4>
    </div>

    <!-- Right Section -->
    <div
      class="flex w-full lg:w-auto justify-between items-center lg:gap-4 lg:mt-3 sm:mt-0"
    >
      <div class="block lg:hidden"></div>
      <!-- Dropdown -->
      <DropdownMenu
        :label="activeMenu"
        :items="clientStore.pizzaCategories"
        @select="handleMenuSelect"
      />

      <!-- Cart -->
      <div class="relative">
        <button
          @click="$router.push('/cart-page')"
          class="p-2 rounded-md transition flex items-center justify-center cart-button"
        >
          <i class="fa-solid fa-cart-shopping"></i>
          <!-- <img :src="mediaData.cart" /> -->
        </button>

        <span
          v-if="clientStore.cartItemCount"
          class="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
        >
          {{ clientStore.cartItemCount }}
        </span>
      </div>
    </div>
  </nav>
</template>
<style>
.cart-button {
  padding: 14px;
  margin: 10px;
  position: relative;
  transform: scale(1.1);
  border-radius: 50%;
  background: linear-gradient(135deg, #40404073, #89898960, #e0e0e079);
}

.cart-button::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  transform: rotate(140deg);
  border-radius: 50%;
  border: 1px solid rgba(194, 194, 194, 0.415);
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}

.cart-button:hover {
  transform: scale(1.2);
  cursor: pointer;
  border-radius: 50%;
  background: linear-gradient(135deg, #40404073, #89898960, #b9b6b679);
}
</style>
