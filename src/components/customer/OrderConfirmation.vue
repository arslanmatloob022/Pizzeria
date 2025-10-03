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
      <button class="relative">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
      </button>
    </header>

    <div class="container mx-auto px-4 py-8 max-w-4xl text-center">
      <h1 class="text-4xl font-bold mb-2">Order Confirmation!</h1>
      <p class="text-gray-400 mb-12">Check your order here.</p>

      <!-- Pizza Animation/Icon -->
      <div class="flex justify-center mb-12">
        <div class="relative">
          <!-- Pizza Box -->
          <div class="w-48 h-32 bg-yellow-600 rounded-lg transform perspective-1000 rotate-x-12 shadow-2xl">
            <div class="absolute inset-2 bg-yellow-500 rounded-lg">
              <div class="absolute top-2 left-2 right-2 bottom-2 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span class="text-red-600 font-bold text-xl">PIZZA</span>
              </div>
            </div>
          </div>
          <!-- Pizza -->
          <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div class="w-32 h-32 bg-yellow-400 rounded-full border-8 border-yellow-500 relative">
              <!-- Pizza toppings -->
              <div class="absolute top-2 left-4 w-4 h-4 bg-red-500 rounded-full"></div>
              <div class="absolute top-6 right-4 w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="absolute bottom-4 left-6 w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="absolute bottom-2 right-6 w-4 h-4 bg-red-500 rounded-full"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <!-- Steam lines -->
            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div class="w-1 h-6 bg-gray-300 rounded animate-pulse"></div>
              <div class="w-1 h-8 bg-gray-300 rounded animate-pulse delay-100"></div>
              <div class="w-1 h-6 bg-gray-300 rounded animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-400 mb-2">Order Number</h3>
          <p class="text-2xl font-bold">#890011</p>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-400 mb-2">No of Pizzas</h3>
          <p class="text-2xl font-bold">2 Pizzas</p>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-400 mb-2">Delivery Time</h3>
          <p class="text-2xl font-bold">8th January 2025, 11:09 PM</p>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8 mb-8"></div>

      <!-- Additional Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="text-left">
          <h3 class="text-lg font-semibold text-gray-400 mb-2">Total Amount</h3>
          <p class="text-2xl font-bold">$68.63</p>
        </div>
        <div class="text-left">
          <h3 class="text-lg font-semibold text-gray-400 mb-2">Delivery/Pickup Details</h3>
          <p class="text-gray-300">The description of the delivery goes here....</p>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8 mb-12"></div>

      <!-- Payment Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="text-left">
          <h3 class="text-lg font-semibold text-gray-400 mb-2">Payment Method</h3>
          <p class="text-xl">Cash on Delivery</p>
        </div>
        <div class="text-left">
          <h3 class="text-lg font-semibold text-gray-400 mb-2">Payment</h3>
          <p class="text-xl">Not Paid</p>
        </div>
      </div>

      <!-- Back to Home Button -->
      <button
        @click="$router.push('/menu')"
        class="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.rotate-x-12 {
  transform: rotateX(12deg);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>