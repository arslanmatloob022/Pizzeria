<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="flex-1 ml-20 lg:ml-24">
      <!-- Header -->
      <header class="bg-white px-6 py-4 flex items-center justify-between border-b">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-semibold text-gray-900">Menu Management</h1>
          <div class="text-sm text-gray-500">
            <span>Home</span>
            <span class="mx-2">›</span>
            <span>Menu Management</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <div class="relative">
            <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
          </div>
          
          <!-- User Profile -->
          <div class="flex items-center space-x-3">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Shane Watson" class="w-8 h-8 rounded-full"/>
            <div class="text-sm">
              <div class="font-medium text-gray-900">Shane Watson</div>
              <div class="text-gray-500">Admin</div>
            </div>
            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="p-6">
        <!-- Top Section -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <!-- Categories/Menu Items Toggle -->
            <div class="flex bg-black rounded-lg p-1">
              <button class="px-4 py-2 text-white bg-black rounded-md text-sm font-medium">
                <svg class="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                Categories
              </button>
              <button class="px-4 py-2 text-gray-400 hover:text-white text-sm font-medium">
                <svg class="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="4" width="18" height="2"/>
                  <rect x="3" y="10" width="18" height="2"/>
                  <rect x="3" y="16" width="18" height="2"/>
                </svg>
                Menu Items
              </button>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="relative">
              <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input type="text" placeholder="Search" class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-500"/>
            </div>
            
            <!-- Date -->
            <div class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <span class="text-sm text-gray-700">31 December, 2025</span>
            </div>
            
            <!-- Add Button -->
            <button @click="openModal" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              <span>Add New Restaurant</span>
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">UUID</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Restaurant Name</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Phone No</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Address</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Square Account Status</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="restaurant in restaurants" :key="restaurant.uuid" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-600">#{{ restaurant.uuid }}</td>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ restaurant.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ restaurant.phone }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ restaurant.address }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(restaurant.status)" class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ restaurant.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <div class="relative" @click="toggleStatus(restaurant.uuid)">
                      <input type="checkbox" :checked="restaurant.enabled" class="sr-only"/>
                      <div :class="restaurant.enabled ? 'bg-green-500' : 'bg-gray-300'" class="w-10 h-6 rounded-full transition-colors">
                        <div :class="restaurant.enabled ? 'translate-x-4' : 'translate-x-0'" class="w-6 h-6 bg-white rounded-full shadow transform transition-transform"></div>
                      </div>
                    </div>
                    <span class="text-sm" :class="restaurant.enabled ? 'text-green-600' : 'text-gray-400'">
                      {{ restaurant.enabled ? 'Enable' : 'Disable' }}
                    </span>
                  </label>
                </td>
                <td class="px-6 py-4">
                  <div class="flex space-x-2">
                    <button class="p-2 text-gray-500 hover:text-blue-600 border border-gray-300 rounded hover:border-blue-300 transition-colors">
                      <font-awesome-icon icon="copy" class="w-4 h-4" />
                    </button>
                    <button @click="editRestaurant(restaurant)" class="p-2 text-gray-500 hover:text-green-600 border border-gray-300 rounded hover:border-green-300 transition-colors">
                      <font-awesome-icon icon="edit" class="w-4 h-4" />
                    </button>
                    <button @click="showDeleteAlert(restaurant.uuid)" class="p-2 text-gray-500 hover:text-red-600 border border-gray-300 rounded hover:border-red-300 transition-colors">
                      <font-awesome-icon icon="trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add Restaurant Modal -->
    <AddRestaurantModal 
      :is-open="isModalOpen"
      :edit-data="editingRestaurant"
      @close="closeModal" 
      @submit="handleAddRestaurant" 
    />

    <!-- Delete Confirmation Alert -->
    <ConfirmationAlert
      :is-open="isAlertOpen"
      title="Are you sure you want to delete the Restaurant?"
      message=""
      confirm-text="Yes, Delete"
      cancel-text="Cancel"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import AddRestaurantModal from './AddRestaurantModal.vue'
import ConfirmationAlert from './ConfirmationAlert.vue'

interface Restaurant {
  uuid: string
  name: string
  phone: string
  address: string
  status: string
  enabled: boolean
}

const restaurants = ref<Restaurant[]>([
  { uuid: '32156', name: 'Zazzo Pizza Co', phone: '(843) 461-5941', address: 'Apt 4B, The Grandview', status: 'Connected', enabled: true },
  { uuid: '32157', name: 'The Daily Grind', phone: '(212) 555-0182', address: '145 Bleecker St', status: 'Pending', enabled: false },
  { uuid: '32162', name: 'The Woven Thread', phone: '(615) 555-0134', address: 'Studio 9, The Artisan Lo', status: 'Connected', enabled: false },
  { uuid: '32159', name: 'Innovatech Soluti', phone: '(415) 555-0199', address: '3rd Floor, 800 Market St', status: 'Error', enabled: true },
  { uuid: '32160', name: 'Pawsitive Groomin', phone: '(773) 555-0112', address: '456 Maple Avenue', status: 'Disconnect...', enabled: true },
  { uuid: '32161', name: 'QuickFix Bike Repair', phone: '(512) 555-0178', address: 'Unit 7, The Bike Path', status: 'Connected', enabled: true },
  { uuid: '32163', name: 'Sunrise Bakery', phone: '(206) 555-0161', address: '2121 Pike Place', status: 'Pending', enabled: false },
  { uuid: '32158', name: 'Bloom & Stem Flori', phone: '(310) 555-0145', address: 'Suite 201, The Blossom', status: 'Connected', enabled: true },
  { uuid: '32164', name: 'Quantum Queries', phone: '(617) 555-0122', address: 'PO Box 4501', status: 'Connected', enabled: true }
])

const isModalOpen = ref(false)
const isAlertOpen = ref(false)
const restaurantToDelete = ref<string | null>(null)
const editingRestaurant = ref<any>(null)

const openModal = () => {
  editingRestaurant.value = null
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingRestaurant.value = null
}

const handleAddRestaurant = (data: any) => {
  console.log('Restaurant data:', data)
  if (editingRestaurant.value) {
    // Update existing restaurant
    const index = restaurants.value.findIndex(r => r.uuid === editingRestaurant.value.uuid)
    if (index !== -1) {
      restaurants.value[index] = { ...restaurants.value[index], ...data }
    }
  } else {
    // Add new restaurant
    const newRestaurant = {
      uuid: Math.random().toString().substr(2, 5),
      name: data.restaurantName,
      phone: data.phoneNumber,
      address: 'New Address',
      status: 'Pending',
      enabled: true
    }
    restaurants.value.push(newRestaurant)
  }
}

const editRestaurant = (restaurant: any) => {
  editingRestaurant.value = restaurant
  isModalOpen.value = true
}

const toggleStatus = (uuid: string) => {
  const restaurant = restaurants.value.find(r => r.uuid === uuid)
  if (restaurant) {
    restaurant.enabled = !restaurant.enabled
  }
}

const showDeleteAlert = (uuid: string) => {
  restaurantToDelete.value = uuid
  isAlertOpen.value = true
}

const handleDeleteConfirm = () => {
  if (restaurantToDelete.value) {
    console.log('Deleting restaurant:', restaurantToDelete.value)
    // Delete restaurant logic here
    restaurants.value = restaurants.value.filter(r => r.uuid !== restaurantToDelete.value)
  }
  isAlertOpen.value = false
  restaurantToDelete.value = null
}

const handleDeleteCancel = () => {
  isAlertOpen.value = false
  restaurantToDelete.value = null
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Connected':
      return 'bg-green-100 text-green-800'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Error':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>