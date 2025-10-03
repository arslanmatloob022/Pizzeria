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
        <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {{ cartCount }}
        </span>
      </button>
    </header>

    <!-- Menu Content -->
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Our Menu</h1>
      
      <!-- Categories -->
      <div class="flex justify-center space-x-4 mb-8">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            selectedCategory === category
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        >
          <img
            :src="item.image || 'https://via.placeholder.com/300x200'"
            :alt="item.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{{ item.name }}</h3>
            <p class="text-gray-400 text-sm mb-3">{{ item.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-red-500">${{ item.price }}</span>
              <button
                @click="addToCart(item)"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
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

const selectedCategory = ref('All');
const cart = ref<any[]>([]);

const categories = ['All', 'Pizza', 'Pasta', 'Salad', 'Dessert'];

const menuItems = ref([
  {
    id: 1,
    name: 'Double Cheese Garlic Mushroom Pizza',
    description: 'Delicious pizza with double cheese, garlic, and mushrooms',
    price: '26.90',
    category: 'Pizza',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: '22.50',
    category: 'Pizza',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 3,
    name: 'Pepperoni Pizza',
    description: 'Traditional pizza topped with spicy pepperoni slices',
    price: '24.90',
    category: 'Pizza',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 4,
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan cheese and croutons',
    price: '12.90',
    category: 'Salad',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 5,
    name: 'Chicken Alfredo',
    description: 'Creamy alfredo sauce with grilled chicken over fettuccine',
    price: '18.90',
    category: 'Pasta',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 6,
    name: 'Tiramisu',
    description: 'Classic Italian dessert made with coffee-soaked ladyfingers',
    price: '8.90',
    category: 'Dessert',
    image: 'https://via.placeholder.com/300x200'
  }
]);

const filteredItems = computed(() => {
  if (selectedCategory.value === 'All') {
    return menuItems.value;
  }
  return menuItems.value.filter(item => item.category === selectedCategory.value);
});

const cartCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const addToCart = (item: any) => {
  const existingItem = cart.value.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
};
</script>