<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 ml-20 lg:ml-24">
      <!-- Header -->
      <div
        class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Menu Management</h1>
          <div class="flex items-center text-sm text-gray-500 mt-1">
            <span>Home</span>
            <svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Menu Management</span>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-gray-600">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            31 December, 2025
          </div>
          <div class="flex items-center">
            <img
              src="https://via.placeholder.com/32"
              alt="Shane Watson"
              class="w-8 h-8 rounded-full mr-2"
            />
            <div class="text-sm">
              <div class="font-medium text-gray-900">Shane Watson</div>
              <div class="text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs and Add Button -->
      <div
        class="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200"
      >
        <div class="flex space-x-8">
          <button
            @click="activeTab = 'categories'"
            :class="[
              'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              activeTab === 'categories'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Categories
          </button>
          <button
            @click="activeTab = 'items'"
            :class="[
              'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              activeTab === 'items'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Menu Items
          </button>
        </div>
        <button
          @click="showAddModal = true"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ activeTab === "items" ? "Add New Item" : "Add New Category" }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="bg-white px-6 py-4">
        <div class="relative max-w-md">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
        </div>
      </div>

      <!-- Categories Table -->
      <div
        v-if="activeTab === 'categories'"
        class="bg-white mx-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  UUID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="item in paginatedItems"
                :key="item.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.uuid }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ item.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {{ item.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :checked="item.status === 'Enable'"
                      @change="toggleStatus(item)"
                      class="sr-only peer"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
                    ></div>
                    <span
                      class="ml-3 text-sm font-medium"
                      :class="
                        item.status === 'Enable'
                          ? 'text-green-600'
                          : 'text-gray-500'
                      "
                    >
                      {{ item.status }}
                    </span>
                  </label>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewItem(item)"
                      class="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fill-rule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      @click="editItem(item)"
                      class="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteItem(item)"
                      class="text-red-400 hover:text-red-600"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Categories Pagination -->
        <div
          class="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200"
        >
          <div class="text-sm text-gray-700">
            Showing {{ startIndex }} to {{ endIndex }} out of
            {{ totalItems }} records
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
              :class="[
                'px-3 py-1 text-sm border rounded',
                page === currentPage
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:bg-gray-50',
              ]"
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

      <!-- Menu Items Table -->
      <div
        v-else
        class="bg-white mx-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  UUID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dish name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tik Tok Video
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Insta Video
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Position
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="item in paginatedMenuItems"
                :key="item.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.uuid }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ item.dishName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ item.price }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {{ item.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    class="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    class="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.position }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :checked="item.status === 'Enable'"
                      @change="toggleMenuItemStatus(item)"
                      class="sr-only peer"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
                    ></div>
                    <span
                      class="ml-3 text-sm font-medium"
                      :class="
                        item.status === 'Enable'
                          ? 'text-green-600'
                          : 'text-gray-500'
                      "
                    >
                      {{ item.status }}
                    </span>
                  </label>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-1">
                    <button
                      @click="editMenuItem(item)"
                      class="p-1.5 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <svg
                        class="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteMenuItem(item)"
                      class="p-1.5 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <svg
                        class="w-4 h-4 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Menu Items Pagination -->
        <div
          class="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200"
        >
          <div class="text-sm text-gray-700">
            Showing {{ menuStartIndex }} to {{ menuEndIndex }} out of
            {{ totalMenuItems }} records
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousMenuPage"
              :disabled="menuCurrentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            <button
              v-for="page in visibleMenuPages"
              :key="page"
              @click="goToMenuPage(page)"
              :class="[
                'px-3 py-1 text-sm border rounded',
                page === menuCurrentPage
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextMenuPage"
              :disabled="menuCurrentPage === totalMenuPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div
        v-if="showAddModal || showEditModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg w-full mx-4 relative" :class="activeTab === 'items' ? 'max-w-2xl' : 'max-w-md'">
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div class="p-6">
            <h3 class="text-xl font-semibold mb-6 text-center">
              {{
                activeTab === "items"
                  ? "Add Item"
                  : showEditModal
                  ? "Edit Category"
                  : "Add New Category"
              }}
            </h3>

            <!-- Category Form -->
            <form
              v-if="activeTab === 'categories'"
              @submit.prevent="submitForm"
            >
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Title</label
                  >
                  <input
                    v-model="formData.title"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Description</label
                  >
                  <textarea
                    v-model="formData.description"
                    rows="3"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  ></textarea>
                </div>
              </div>
              <div class="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  @click="closeModal"
                  class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  {{ showEditModal ? "Update" : "Add" }}
                </button>
              </div>
            </form>

            <!-- Item Form -->
            <form v-else @submit.prevent="submitItemForm">
              <div class="space-y-4">
                <!-- Row 1: Name and Price -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      v-model="itemFormData.name"
                      type="text"
                      placeholder="Enter Dish Name"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      v-model="itemFormData.price"
                      type="text"
                      placeholder="Enter Dish Price"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    />
                  </div>
                </div>
                
                <!-- Row 2: Description (Full Width) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="itemFormData.description"
                    rows="2"
                    placeholder="Enter description here..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  ></textarea>
                </div>
                
                <!-- Row 3: Upload Video (Full Width) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Upload Video</label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <svg class="w-6 h-6 text-gray-400 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <p class="text-sm text-gray-500">Upload Video in MP4 Format</p>
                  </div>
                </div>
                
                <!-- Row 4: TikTok and Instagram URLs -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tiktok Video URL</label>
                    <input
                      v-model="itemFormData.tiktokUrl"
                      type="text"
                      placeholder="Paste Video Link"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Instagram Video URL</label>
                    <input
                      v-model="itemFormData.instagramUrl"
                      type="text"
                      placeholder="Paste Video Link"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    />
                  </div>
                </div>
                
                <!-- Row 5: Ingredients (Full Width) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ingredients (Optional)</label>
                  <textarea
                    v-model="itemFormData.ingredients"
                    rows="2"
                    placeholder="Enter Dish Ingredients"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  ></textarea>
                </div>
                
                <!-- Row 6: Position and Category -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      v-model="itemFormData.position"
                      type="text"
                      placeholder="Enter Position"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      v-model="itemFormData.category"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    >
                      <option value="">Select Category</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Salad">Salad</option>
                      <option value="Dessert">Dessert</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 mt-6 font-medium"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
        <!-- Delete Confirmation Modal -->
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 class="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p class="text-gray-600 mb-6">
              Are you sure you want to delete "{{
                selectedDeleteItem?.name || selectedDeleteItem?.dishName
              }}"? This action cannot be undone.
            </p>
            <div class="flex justify-end space-x-3">
              <button
                @click="closeDeleteModal"
                class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Sidebar from "./Sidebar.vue";

const activeTab = ref("categories");
const searchQuery = ref("");
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedDeleteItem = ref(null);
const deleteType = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const menuCurrentPage = ref(1);
const menuItemsPerPage = ref(10);

const formData = ref({
  title: "",
  description: "",
  price: "",
  size: "",
});

const itemFormData = ref({
  name: "",
  price: "",
  description: "",
  tiktokUrl: "",
  instagramUrl: "",
  ingredients: "",
  position: "",
  category: "",
});

const editingItem = ref(null);

const menuItems = ref([
  {
    id: 1,
    uuid: "5400e8400",
    name: "Special Pizza",
    description: "The description goes here...",
    status: "Enable",
  },
  {
    id: 2,
    uuid: "6b86b273",
    name: "Supreme Calzone",
    description: "A folded pizza dough stuffed with pepperoni, sau...",
    status: "Disable",
  },
  {
    id: 3,
    uuid: "880c987e",
    name: "Antipasto Salad",
    description: "A mix of lettuce, cured meats like salami and pro...",
    status: "Enable",
  },
  {
    id: 4,
    uuid: "a5d6b74c",
    name: "Tiramisu",
    description: "A classic Italian dessert made with coffee-soake...",
    status: "Disable",
  },
  {
    id: 5,
    uuid: "c2d7e8f0",
    name: "Bruschetta",
    description: "Toasted bread topped with a fresh mix of diced t...",
    status: "Disable",
  },
  {
    id: 6,
    uuid: "9c1a5a2f",
    name: "Mushroom Risotto",
    description: "Creamy Italian rice dish cooked with a variety of...",
    status: "Enable",
  },
  {
    id: 7,
    uuid: "b3e4f5a1",
    name: "Seafood Linguine",
    description: "Linguine pasta tossed with shrimp, clams, and m...",
    status: "Enable",
  },
  {
    id: 8,
    uuid: "743de45d",
    name: "Garlic Knots",
    description: "Strips of pizza dough tied in a knot, baked and th...",
    status: "Enable",
  },
  {
    id: 9,
    uuid: "f2ca1bb6",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil...",
    status: "Enable",
  },
  {
    id: 10,
    uuid: "e3b0c442",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan cheese and croutons...",
    status: "Enable",
  },
  {
    id: 11,
    uuid: "d4735e3a",
    name: "Chicken Alfredo",
    description: "Creamy alfredo sauce with grilled chicken over fettuccine...",
    status: "Disable",
  },
  {
    id: 12,
    uuid: "c9f0f895",
    name: "Pepperoni Pizza",
    description: "Traditional pizza topped with spicy pepperoni slices...",
    status: "Enable",
  },
  {
    id: 13,
    uuid: "b6589fc6",
    name: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze...",
    status: "Enable",
  },
  {
    id: 14,
    uuid: "a665a45b",
    name: "Lasagna",
    description: "Layers of pasta with meat sauce, ricotta, and mozzarella...",
    status: "Disable",
  },
  {
    id: 15,
    uuid: "9b71d224",
    name: "BBQ Chicken Pizza",
    description: "Pizza with BBQ sauce, grilled chicken, and red onions...",
    status: "Enable",
  },
  {
    id: 16,
    uuid: "8d969eef",
    name: "Minestrone Soup",
    description: "Hearty vegetable soup with beans and pasta...",
    status: "Enable",
  },
  {
    id: 17,
    uuid: "7d865e95",
    name: "Chicken Parmesan",
    description: "Breaded chicken breast with marinara and mozzarella...",
    status: "Disable",
  },
  {
    id: 18,
    uuid: "6c92bf46",
    name: "Greek Salad",
    description: "Mixed greens with olives, feta cheese, and Greek dressing...",
    status: "Enable",
  },
  {
    id: 19,
    uuid: "5b41362b",
    name: "Spaghetti Carbonara",
    description: "Pasta with eggs, cheese, pancetta, and black pepper...",
    status: "Enable",
  },
  {
    id: 20,
    uuid: "4a44dc15",
    name: "Veggie Pizza",
    description: "Pizza loaded with fresh vegetables and herbs...",
    status: "Disable",
  },
  {
    id: 21,
    uuid: "39fa5d5f",
    name: "Chicken Wings",
    description: "Crispy wings with your choice of sauce...",
    status: "Enable",
  },
  {
    id: 22,
    uuid: "28b662a7",
    name: "Ravioli",
    description: "Cheese-filled pasta with marinara or alfredo sauce...",
    status: "Enable",
  },
  {
    id: 23,
    uuid: "17ba0791",
    name: "Hawaiian Pizza",
    description: "Pizza with ham, pineapple, and mozzarella cheese...",
    status: "Disable",
  },
  {
    id: 24,
    uuid: "0677ca7f",
    name: "Gelato",
    description: "Italian-style ice cream in various flavors...",
    status: "Enable",
  },
  {
    id: 25,
    uuid: "f5ca38f7",
    name: "Meat Lovers Pizza",
    description: "Pizza loaded with pepperoni, sausage, ham, and bacon...",
    status: "Enable",
  },
  {
    id: 26,
    uuid: "e4da3b7f",
    name: "Spinach Salad",
    description: "Fresh spinach with strawberries, nuts, and vinaigrette...",
    status: "Disable",
  },
  {
    id: 27,
    uuid: "d3d9446a",
    name: "Eggplant Parmesan",
    description: "Breaded eggplant with marinara sauce and cheese...",
    status: "Enable",
  },
  {
    id: 28,
    uuid: "c2356069",
    name: "White Pizza",
    description: "Pizza with ricotta, mozzarella, and garlic...",
    status: "Enable",
  },
  {
    id: 29,
    uuid: "b1d5781b",
    name: "Cannoli",
    description: "Sicilian pastry filled with sweet ricotta cream...",
    status: "Disable",
  },
  {
    id: 30,
    uuid: "a0b65939",
    name: "Calzone Supreme",
    description: "Folded pizza with multiple meats and vegetables...",
    status: "Enable",
  },
]);

const menuItemsData = ref([
  {
    id: 1,
    uuid: "5400e8400",
    dishName: "Special Pizza",
    price: "12.65",
    description: "The description goes here...",
    position: "A",
    status: "Enable",
  },
  {
    id: 2,
    uuid: "6b12f9a11",
    dishName: "Classic Lasagna",
    price: "14.50",
    description: "Layers of pasta, rich meat sauce, and cheese...",
    position: "B",
    status: "Enable",
  },
  {
    id: 3,
    uuid: "5400e8400",
    dishName: "Special Pizza",
    price: "12.65",
    description: "The description goes here...",
    position: "A",
    status: "Enable",
  },
  {
    id: 4,
    uuid: "9e78f2d44",
    dishName: "Gourmet Burger",
    price: "15.20",
    description: "Angus beef patty with premium toppings...",
    position: "B",
    status: "Enable",
  },
  {
    id: 5,
    uuid: "a09a03e55",
    dishName: "Grilled Salmon",
    price: "18.90",
    description: "Served with roasted vegetables and lemon...",
    position: "A",
    status: "Enable",
  },
  {
    id: 6,
    uuid: "7c34d0b22",
    dishName: "Greek Salad",
    price: "9.75",
    description: "Crisp lettuce, feta, olives, and tomatoes...",
    position: "A",
    status: "Enable",
  },
  {
    id: 7,
    uuid: "b1bc14f66",
    dishName: "Veggie Wrap",
    price: "10.50",
    description: "Grilled vegetables, hummus, and fresh greens...",
    position: "C",
    status: "Enable",
  },
  {
    id: 8,
    uuid: "8d56e1c33",
    dishName: "Tiramisu",
    price: "7.99",
    description: "Coffee-soaked ladyfingers with mascarpone...",
    position: "C",
    status: "Disable",
  },
]);

const filteredItems = computed(() => {
  if (!searchQuery.value) return menuItems.value;
  return menuItems.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalItems = computed(() => filteredItems.value.length);
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

const startIndex = computed(() => {
  return totalItems.value === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1;
});

const endIndex = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return end > totalItems.value ? totalItems.value : end;
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Menu Items computed properties
const filteredMenuItems = computed(() => {
  if (!searchQuery.value) return menuItemsData.value;
  return menuItemsData.value.filter(
    (item) =>
      item.dishName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalMenuItems = computed(() => filteredMenuItems.value.length);
const totalMenuPages = computed(() =>
  Math.ceil(totalMenuItems.value / menuItemsPerPage.value)
);

const paginatedMenuItems = computed(() => {
  const start = (menuCurrentPage.value - 1) * menuItemsPerPage.value;
  const end = start + menuItemsPerPage.value;
  return filteredMenuItems.value.slice(start, end);
});

const menuStartIndex = computed(() => {
  return totalMenuItems.value === 0
    ? 0
    : (menuCurrentPage.value - 1) * menuItemsPerPage.value + 1;
});

const menuEndIndex = computed(() => {
  const end = menuCurrentPage.value * menuItemsPerPage.value;
  return end > totalMenuItems.value ? totalMenuItems.value : end;
});

const visibleMenuPages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, menuCurrentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalMenuPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const toggleStatus = (item: any) => {
  item.status = item.status === "Enable" ? "Disable" : "Enable";
};

const viewItem = (item: any) => {
  alert(`Viewing: ${item.name}`);
};

const editItem = (item: any) => {
  editingItem.value = item;
  formData.value = {
    title: item.name,
    description: item.description,
    price: "12.99",
    size: "Medium",
  };
  showEditModal.value = true;
};

const deleteItem = (item: any) => {
  selectedDeleteItem.value = item;
  deleteType.value = "category";
  showDeleteModal.value = true;
};

const submitForm = () => {
  if (showEditModal.value && editingItem.value) {
    editingItem.value.name = formData.value.title;
    editingItem.value.description = formData.value.description;
  } else {
    const newItem = {
      id: Date.now(),
      uuid: Math.random().toString(36).substr(2, 9),
      name: formData.value.title,
      description: formData.value.description,
      status: "Enable",
    };
    menuItems.value.push(newItem);
  }
  closeModal();
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  editingItem.value = null;
  formData.value = { title: "", description: "", price: "", size: "" };
  itemFormData.value = {
    name: "",
    price: "",
    description: "",
    tiktokUrl: "",
    instagramUrl: "",
    ingredients: "",
    position: "",
    category: "",
  };
};

const submitItemForm = () => {
  const newItem = {
    id: Date.now(),
    uuid: Math.random().toString(36).substr(2, 9),
    dishName: itemFormData.value.name,
    price: itemFormData.value.price,
    description: itemFormData.value.description,
    position: itemFormData.value.position || "A",
    status: "Enable",
  };
  menuItemsData.value.push(newItem);
  closeModal();
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedDeleteItem.value = null;
  deleteType.value = "";
};

const confirmDelete = () => {
  if (selectedDeleteItem.value) {
    if (deleteType.value === "category") {
      const index = menuItems.value.findIndex(
        (i) => i.id === selectedDeleteItem.value.id
      );
      if (index > -1) {
        menuItems.value.splice(index, 1);
      }
    } else if (deleteType.value === "menuItem") {
      const index = menuItemsData.value.findIndex(
        (i) => i.id === selectedDeleteItem.value.id
      );
      if (index > -1) {
        menuItemsData.value.splice(index, 1);
      }
    }
  }
  closeDeleteModal();
};

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

// Menu Items functions
const toggleMenuItemStatus = (item: any) => {
  item.status = item.status === "Enable" ? "Disable" : "Enable";
};

const editMenuItem = (item: any) => {
  alert(`Editing menu item: ${item.dishName}`);
};

const deleteMenuItem = (item: any) => {
  selectedDeleteItem.value = item;
  deleteType.value = "menuItem";
  showDeleteModal.value = true;
};

const previousMenuPage = () => {
  if (menuCurrentPage.value > 1) menuCurrentPage.value--;
};

const nextMenuPage = () => {
  if (menuCurrentPage.value < totalMenuPages.value) menuCurrentPage.value++;
};

const goToMenuPage = (page: number) => {
  menuCurrentPage.value = page;
};
</script>
