<template>
  <div class="min-h-calc[(100dvh-300px)] text-white relative">
    <!-- Floating Cart Icon -->
    <div class="fixed top-4 right-4 z-50">
      <div class="relative">
        <button
          @click="$router.push('/cart-page')"
          class="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg cursor-default"
        >
          <i class="fa-solid fa-cart-shopping text-white text-lg"></i>
        </button>

        <span
          v-if="cartItems.length"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white"
        >
          {{ cartCount }}
        </span>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-white text-center mb-2">My Cart</h1>
      <p class="text-gray-400 text-center mb-8">
        Total {{ cartCount }} Pizza in the Cart.
      </p>

      <div v-if="cartItems.length === 0" class="text-center py-12">
        <p class="text-gray-400 text-xl mb-4">Your cart is empty</p>
        <button
          @click="$router.push('/')"
          class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Browse Menu
        </button>
      </div>

      <div v-else>
        <!-- Cart Items -->
        <div class="space-y-6 mb-8">
          <div
            v-for="(item, index) in cartItems"
            :key="item.id"
            class="rounded-lg p-4"
          >
            <!-- Header -->
            <div class="flex flex-wrap justify-between items-center gap-4">
              <div class="flex items-center justify-between w-full sm:w-auto gap-3">
                <span class="text-base sm:text-lg font-semibold"
                  >{{ index + 1 }}. {{ item.title.length>=15 ? item.title.slice(0,15) +'...' : item.title }}</span
                >
                <button
                  @click="removeItem(item.id)"
                  class="text-red-500 hover:text-red-400 text-xs sm:text-sm flex items-center gap-1"
                >
                  🗑 <span class="hidden sm:inline">Remove Item</span><span class="sm:hidden">Remove</span>
                </button>
              </div>
              <div
                class="hidden sm:flex items-center justify-between w-[280px] text-gray-400 text-sm"
              >
                <span>Pizza Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
            </div>

            <!-- Item Row -->
            <div class="flex flex-wrap justify-between items-center mt-4 gap-4">
              <div class="flex items-center gap-4">
                <img
                  :src="item.image || 'https://via.placeholder.com/60x60'"
                  :alt="item.title"
                  class="w-12 h-12 rounded-lg object-cover"
                />
                <span>{{ item.title }}</span>
              </div>

              <div
                class="flex items-center justify-between sm:justify-end gap-5 sm:gap-8 w-full sm:w-auto"
              >
                <span class="text-white text-sm sm:text-base"
                  >{{ item.price }}</span
                >
                <div class="flex items-center gap-2">
                  <button
                    @click="decreaseQuantity(item.id)"
                    class="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white"
                  >
                    -
                  </button>
                  <span class="w-4 text-center">{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(item.id)"
                    class="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white"
                  >
                    +
                  </button>
                </div>
                <span class="text-white text-sm sm:text-base w-16 text-right">
                  ${{ (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>

            <hr class="mt-5 opacity-20" />
          </div>
        </div>

        <!-- Cart Summary -->
        <div
          class="pt-6 px-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <!-- Left side: totals stacked -->
          <div class="flex flex-col lg:flex-row gap-6 sm:gap-10 text-center sm:text-left w-full sm:w-auto">
            <div class="flex justify-between sm:block">
              <p class="text-gray-300 text-sm sm:text-base">Sub-Total</p>
              <p class="font-semibold">${{ subTotal.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between sm:block">
              <p class="text-gray-300 text-sm sm:text-base">Sales Tax</p>
              <p class="font-semibold">${{ salesTax.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between sm:block">
              <p class="text-gray-300 text-sm sm:text-base">Grand Total</p>
              <p class="font-bold">${{ grandTotal.toFixed(2) }}</p>
            </div>
          </div>

          <!-- Right side: checkout -->
          <div class="flex justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
            <button
              @click="$router.push('/checkout')"
              class="bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-lg font-semibold w-full sm:w-72"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from "@/store/clientStore";

const clientStore = useClientStore();

const cartItems = computed(() => clientStore.cart);

const cartCount = computed(() =>
  cartItems.value.reduce((total, item) => total + item.quantity, 0)
);

const subTotal = computed(() =>
  cartItems.value.reduce((total, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return total + price * item.quantity;
  }, 0)
);

const salesTax = computed(() => subTotal.value * 0.08);
const grandTotal = computed(() => subTotal.value + salesTax.value);

const removeItem = (id: number) => {
  clientStore.removeFromCart(id);
};

const increaseQuantity = (id: number) => {
  clientStore.increaseQuantity(id);
};

const decreaseQuantity = (id: number) => {
  clientStore.decreaseQuantity(id);
};
</script>
