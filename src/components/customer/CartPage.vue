<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header -->
    <header class="bg-gray-800 p-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span class="text-gray-900 font-bold">🍕</span>
        </div>
        <span class="text-xl font-semibold">restaurant</span>
      </div>
      <button @click="$router.push('/menu')" class="relative">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
        <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {{ cartCount }}
        </span>
      </button>
    </header>

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-center mb-2">My Cart</h1>
      <p class="text-gray-400 text-center mb-8">Total {{ cartCount }} Pizza in the Cart.</p>

      <div v-if="cartItems.length === 0" class="text-center py-12">
        <p class="text-gray-400 text-xl mb-4">Your cart is empty</p>
        <button
          @click="$router.push('/menu')"
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
            class="bg-gray-800 rounded-lg p-4"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <span class="text-lg font-semibold">{{ index + 1 }}. Sicilian Pizza</span>
                <button
                  @click="removeItem(item.id)"
                  class="text-red-500 hover:text-red-400 text-sm"
                >
                  🗑 Remove Item
                </button>
              </div>
              <div class="flex items-center space-x-8">
                <span class="text-sm text-gray-400">Pizza Price</span>
                <span class="text-sm text-gray-400">Quantity</span>
                <span class="text-sm text-gray-400">Total</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center space-x-4">
                <img
                  :src="item.image || 'https://via.placeholder.com/60x60'"
                  :alt="item.name"
                  class="w-12 h-12 rounded-lg object-cover"
                />
                <span class="text-white">{{ item.name }}</span>
              </div>
              <div class="flex items-center space-x-8">
                <span class="text-white">${{ item.price }}</span>
                <div class="flex items-center space-x-2">
                  <button
                    @click="decreaseQuantity(item.id)"
                    class="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white"
                  >
                    -
                  </button>
                  <span class="w-8 text-center">{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(item.id)"
                    class="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white"
                  >
                    +
                  </button>
                </div>
                <span class="text-white w-16 text-right">${{ (parseFloat(item.price) * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="bg-gray-800 rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg">Sub-Total</span>
            <span class="text-lg">${{ subTotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg">Sales Tax</span>
            <span class="text-lg">${{ salesTax.toFixed(2) }}</span>
          </div>
          <div class="border-t border-gray-600 pt-4">
            <div class="flex justify-between items-center mb-6">
              <span class="text-xl font-bold">Grand Total</span>
              <span class="text-xl font-bold">${{ grandTotal.toFixed(2) }}</span>
            </div>
            <button
              @click="$router.push('/checkout')"
              class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-lg font-semibold"
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const cartItems = ref([
  {
    id: 1,
    name: 'Double Cheese Garlic Mushroom Pizza',
    price: '26.90',
    quantity: 1,
    image: 'https://via.placeholder.com/60x60'
  },
  {
    id: 2,
    name: 'Double Cheese Garlic Mushroom Pizza',
    price: '26.90',
    quantity: 1,
    image: 'https://via.placeholder.com/60x60'
  }
]);

const cartCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const subTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
});

const salesTax = computed(() => {
  return subTotal.value * 0.08; // 8% tax
});

const grandTotal = computed(() => {
  return subTotal.value + salesTax.value;
});

const removeItem = (id: number) => {
  const index = cartItems.value.findIndex(item => item.id === id);
  if (index > -1) {
    cartItems.value.splice(index, 1);
  }
};

const increaseQuantity = (id: number) => {
  const item = cartItems.value.find(item => item.id === id);
  if (item) {
    item.quantity++;
  }
};

const decreaseQuantity = (id: number) => {
  const item = cartItems.value.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
  }
};
</script>