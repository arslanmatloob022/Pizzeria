<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg w-full max-w-md mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ editData ? "Edit Restaurant" : "Add New Restaurant" }}
        </h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Restaurant Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Restaurant Name</label
          >
          <input
            v-model="form.restaurantName"
            type="text"
            placeholder="Enter Restaurant name"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
            required
          />
        </div>

        <!-- Restaurant Registered Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Restaurant Name</label
          >
          <input
            v-model="form.registeredName"
            type="text"
            placeholder="Enter Restaurant name"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
            required
          />
        </div>

        <!-- Restaurant Phone Number -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Restaurant Phone No</label
          >
          <input
            v-model="form.phoneNumber"
            type="tel"
            placeholder="Enter Restaurant Phone No"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
            required
          />
        </div>

        <!-- Connect Square Account -->
        <div class="border border-gray-200 rounded-lg p-4">
          <button
            type="button"
            @click="connectSquareAccount"
            class="w-full flex items-center justify-between text-left"
          >
            <span class="text-gray-700">Connect Square Account</span>
            <svg
              class="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {{ editData ? "Update Restaurant" : "Add Restaurant" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

interface Props {
  isOpen: boolean;
  editData?: any;
}

interface Emits {
  (e: "close"): void;
  (e: "submit", data: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const form = reactive({
  restaurantName: "",
  registeredName: "",
  phoneNumber: "",
});

// Watch for edit data changes
watch(
  () => props.editData,
  (newData) => {
    if (newData) {
      form.restaurantName = newData.name || "";
      form.registeredName = newData.name || "";
      form.phoneNumber = newData.phone || "";
    } else {
      form.restaurantName = "";
      form.registeredName = "";
      form.phoneNumber = "";
    }
  },
  { immediate: true }
);

const closeModal = () => {
  emit("close");
};

const connectSquareAccount = () => {
  console.log("Connect Square Account clicked");
};

const handleSubmit = () => {
  emit("submit", { ...form });
  // Reset form
  form.restaurantName = "";
  form.registeredName = "";
  form.phoneNumber = "";
  closeModal();
};
</script>
