<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="flex-1 ml-20 lg:ml-24">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Order Management</h1>
          <div class="flex items-center text-sm text-gray-500 mt-1">
            <span>Home</span>
            <svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Order Management</span>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-gray-600">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            31 December, 2025
          </div>
          <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            Add New Category
          </button>
          <div class="flex items-center">
            <img src="https://via.placeholder.com/32" alt="Shane Watson" class="w-8 h-8 rounded-full mr-2">
            <div class="text-sm">
              <div class="font-medium text-gray-900">Shane Watson</div>
              <div class="text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white px-6 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search"
              class="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            >
          </div>
          <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white mx-6 rounded-lg shadow-sm border border-gray-200">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Summary</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date / time</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ (order as any).orderId }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.customer }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ order.totalAmount }}</td>
                <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ order.address }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ order.itemSummary }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.dateTime }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getPaymentStatusClass(order.paymentStatus)" class="px-2 py-1 text-xs font-medium rounded">
                    {{ order.paymentStatus }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getOrderStatusClass(order.status)" class="px-2 py-1 text-xs font-medium rounded">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="confirmOrder(order)" class="text-green-500 hover:text-green-700">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    <button @click="rejectOrder(order)" class="text-red-500 hover:text-red-700">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div class="text-sm text-gray-700">
            Showing {{ startIndex }} to {{ endIndex }} out of {{ totalOrders }} records
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="goToPage(page)"
              :class="['px-3 py-1 text-sm border rounded', 
                       page === currentPage ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-50']"
            >
              {{ page }}
            </button>
            <button 
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <!-- Confirmation Modal -->
      <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 class="text-lg font-semibold mb-4">{{ confirmAction === 'confirm' ? 'Confirm Order' : 'Reject Order' }}</h3>
          <p class="text-gray-600 mb-6">
            Are you sure you want to {{ confirmAction === 'confirm' ? 'confirm' : 'reject' }} order {{ selectedOrder?.orderId }}?
          </p>
          <div class="flex justify-end space-x-3">
            <button 
              @click="closeConfirmModal"
              class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              @click="executeAction"
              :class="['px-4 py-2 rounded-lg', 
                       confirmAction === 'confirm' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white']"
            >
              {{ confirmAction === 'confirm' ? 'Confirm' : 'Reject' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from './Sidebar.vue'

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showConfirmModal = ref(false)
const confirmAction = ref('')
const selectedOrder = ref<any>(null)

const orders = ref([
  { id: 1, orderId: '#32156', customer: 'John Doe', totalAmount: '12.65', address: 'Block C, Sector 2', itemSummary: '2 Large Pizza', dateTime: 'Oct 5, 12:25 PM', paymentStatus: 'Not Paid', status: 'Received' },
  { id: 2, orderId: '#32159', customer: 'Carlos Ramirez', totalAmount: '31.20', address: '789 Oak Avenue', itemSummary: 'Family Bucket, 2 Drinks', dateTime: 'Oct 5, 12:35 PM', paymentStatus: 'Not Paid', status: 'Delivered' },
  { id: 3, orderId: '#32158', customer: 'Aisha Khan', totalAmount: '8.99', address: 'Apt 4B, The Grand', itemSummary: '1 Chicken Wrap', dateTime: 'Oct 5, 12:32 PM', paymentStatus: 'Paid', status: 'Out for Delivery' },
  { id: 4, orderId: '#32161', customer: 'David Lee', totalAmount: '19.99', address: 'Suite 202, Tech Tower', itemSummary: '1 Pepperoni Pizza', dateTime: 'Oct 5, 12:45 PM', paymentStatus: 'Not Paid', status: 'Preparing' },
  { id: 5, orderId: '#32162', customer: 'Fatima Al-Sayed', totalAmount: '22.00', address: 'House 5, Green Valley', itemSummary: '3 Shawarma Plates', dateTime: 'Oct 5, 12:48 PM', paymentStatus: 'Paid', status: 'Out for Delivery' },
  { id: 6, orderId: '#32160', customer: 'Emily Chen', totalAmount: '15.75', address: 'Unit 15, Business Park', itemSummary: '2 Veggie Burgers', dateTime: 'Oct 5, 12:41 PM', paymentStatus: 'Paid', status: 'Received' },
  { id: 7, orderId: '#32157', customer: 'Jane Smith', totalAmount: '25.50', address: '123 Maple Street', itemSummary: '1 Combo Meal', dateTime: 'Oct 5, 12:30 PM', paymentStatus: 'Paid', status: 'Preparing' },
  { id: 8, orderId: '#32163', customer: 'Kenji Tanaka', totalAmount: '5.50', address: 'Dorm Room 301, North Campus', itemSummary: '1 Coffee, 1 Muffin', dateTime: 'Oct 5, 12:51 PM', paymentStatus: 'Paid', status: 'Completed' },
  { id: 9, orderId: '#32156', customer: 'John Doe', totalAmount: '12.65', address: 'Block C, Sector 2', itemSummary: '2 Large Pizza', dateTime: 'Oct 5, 12:25 PM', paymentStatus: 'Not Paid', status: 'Received' }
])

const filteredOrders = computed(() => {
  if (!searchQuery.value) return orders.value
  return orders.value.filter(order => 
    order.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    order.orderId.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    order.itemSummary.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalOrders = computed(() => filteredOrders.value.length)
const totalPages = computed(() => Math.ceil(totalOrders.value / itemsPerPage.value))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

const startIndex = computed(() => {
  return totalOrders.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1
})

const endIndex = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > totalOrders.value ? totalOrders.value : end
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const getPaymentStatusClass = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-blue-100 text-blue-800'
    case 'Not Paid':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getOrderStatusClass = (status: string) => {
  switch (status) {
    case 'Received':
      return 'bg-green-100 text-green-800'
    case 'Preparing':
      return 'bg-yellow-100 text-yellow-800'
    case 'Out for Delivery':
      return 'bg-blue-100 text-blue-800'
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'Completed':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const confirmOrder = (order: any) => {
  selectedOrder.value = order
  confirmAction.value = 'confirm'
  showConfirmModal.value = true
}

const rejectOrder = (order: any) => {
  selectedOrder.value = order
  confirmAction.value = 'reject'
  showConfirmModal.value = true
}

const executeAction = () => {
  if (selectedOrder.value) {
    if (confirmAction.value === 'confirm') {
      (selectedOrder.value as any).status = 'Confirmed'
    } else {
      (selectedOrder.value as any).status = 'Rejected'
    }
  }
  closeConfirmModal()
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  selectedOrder.value = null
  confirmAction.value = ''
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page: number) => {
  currentPage.value = page
}
</script>