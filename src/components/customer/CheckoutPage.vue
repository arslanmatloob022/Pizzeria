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
      <button @click="$router.push('/cart')" class="relative">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
      </button>
    </header>

    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <h1 class="text-3xl font-bold text-center mb-2">Check-Out</h1>
      <p class="text-gray-400 text-center mb-8">Delivered Order Check-Out Process.</p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - Forms -->
        <div class="space-y-6">
          <!-- Delivery Method -->
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Delivery Method</h3>
            <div class="flex space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="delivery"
                  class="w-4 h-4 text-red-500"
                />
                <span class="bg-red-500 text-white px-3 py-1 rounded">Delivery</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="pickup"
                  class="w-4 h-4 text-red-500"
                />
                <span class="bg-gray-600 text-white px-3 py-1 rounded">Pickup</span>
              </label>
            </div>
          </div>

          <!-- Personal Information -->
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Personal Information</h3>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm text-gray-400 mb-1">Full Name</label>
                <input
                  v-model="personalInfo.fullName"
                  type="text"
                  placeholder="Enter your name"
                  class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Phone Number</label>
                <input
                  v-model="personalInfo.phone"
                  type="text"
                  placeholder="Enter your phone number"
                  class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm text-gray-400 mb-1">Delivery Address</label>
              <input
                v-model="personalInfo.address"
                type="text"
                placeholder="Enter your Address"
                class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Additional Note *Optional</label>
              <textarea
                v-model="personalInfo.note"
                placeholder="Enter here"
                rows="3"
                class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              ></textarea>
            </div>
          </div>

          <!-- Account Details (for card payment) -->
          <div v-if="paymentMethod === 'card'" class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Account Details</h3>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm text-gray-400 mb-1">Name on Card</label>
                <input
                  v-model="cardInfo.nameOnCard"
                  type="text"
                  placeholder="Enter your name"
                  class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Email *optional</label>
                <input
                  v-model="cardInfo.email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm text-gray-400 mb-1">CVV</label>
                <input
                  v-model="cardInfo.cvv"
                  type="text"
                  placeholder="Enter your CVV"
                  class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Postal Code</label>
                <input
                  v-model="cardInfo.postalCode"
                  type="text"
                  placeholder="Enter your Postal Code"
                  class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Card Number</label>
              <input
                v-model="cardInfo.cardNumber"
                type="text"
                placeholder="Enter your Card Number"
                class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div class="flex items-center mt-4 text-sm text-gray-400">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              Secure payment by Plover
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="space-y-6">
          <!-- Order Items -->
          <div class="bg-gray-800 rounded-lg p-6">
            <div v-for="(item, index) in orderItems" :key="item.id" class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-lg font-semibold">{{ index + 1 }}. Sicilian Pizza</span>
                <button class="text-red-500 hover:text-red-400 text-sm">
                  🗑 Remove Item
                </button>
              </div>
              <div class="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Pizza Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img
                    :src="item.image || 'https://via.placeholder.com/50x50'"
                    :alt="item.name"
                    class="w-12 h-12 rounded object-cover"
                  />
                  <span class="text-white">{{ item.name }}</span>
                </div>
                <div class="flex items-center space-x-8">
                  <span class="text-white">${{ item.price }}</span>
                  <div class="flex items-center space-x-2">
                    <button class="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm">+</button>
                    <span class="w-6 text-center">{{ item.quantity }}</span>
                    <button class="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm">-</button>
                  </div>
                  <span class="text-white">${{ item.price }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Payment Method</h3>
            <div class="flex space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="cod"
                  class="w-4 h-4 text-red-500"
                />
                <span class="bg-red-500 text-white px-3 py-1 rounded">COD</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="card"
                  class="w-4 h-4 text-red-500"
                />
                <span class="bg-gray-600 text-white px-3 py-1 rounded">Via Plover</span>
              </label>
            </div>
          </div>

          <!-- Complete Order Button -->
          <button
            @click="completeOrder"
            class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const deliveryMethod = ref('delivery');
const paymentMethod = ref('cod');

const personalInfo = ref({
  fullName: '',
  phone: '',
  address: '',
  note: ''
});

const cardInfo = ref({
  nameOnCard: '',
  email: '',
  cvv: '',
  postalCode: '',
  cardNumber: ''
});

const orderItems = ref([
  {
    id: 1,
    name: 'Double Cheese Garlic Mushroom Pizza',
    price: '26.90',
    quantity: 1,
    image: 'https://via.placeholder.com/50x50'
  },
  {
    id: 2,
    name: 'Double Cheese Garlic Mushroom Pizza',
    price: '26.90',
    quantity: 1,
    image: 'https://via.placeholder.com/50x50'
  }
]);

const completeOrder = () => {
  // Process order logic here
  router.push('/order-confirmation');
};
</script>