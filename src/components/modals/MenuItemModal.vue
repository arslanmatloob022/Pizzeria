<template>
  <BaseModal 
    title="Add Item"
    modal-class="max-w-2xl"
    @close="$emit('close')"
  >
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Enter Dish Name"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              v-model="formData.price"
              type="text"
              placeholder="Enter Dish Price"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.description"
            rows="2"
            placeholder="Enter description here..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Upload Video</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <svg class="w-6 h-6 text-gray-400 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            <p class="text-sm text-gray-500">Upload Video in MP4 Format</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tiktok Video URL</label>
            <input
              v-model="formData.tiktokUrl"
              type="text"
              placeholder="Paste Video Link"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Instagram Video URL</label>
            <input
              v-model="formData.instagramUrl"
              type="text"
              placeholder="Paste Video Link"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ingredients (Optional)</label>
          <textarea
            v-model="formData.ingredients"
            rows="2"
            placeholder="Enter Dish Ingredients"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          ></textarea>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              v-model="formData.position"
              type="text"
              placeholder="Enter Position"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              v-model="formData.category"
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
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseModal from './BaseModal.vue';

interface MenuItemData {
  name: string;
  price: string;
  description: string;
  tiktokUrl: string;
  instagramUrl: string;
  ingredients: string;
  position: string;
  category: string;
}

interface Props {
  initialData?: MenuItemData;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
    name: '',
    price: '',
    description: '',
    tiktokUrl: '',
    instagramUrl: '',
    ingredients: '',
    position: '',
    category: ''
  })
});

const emit = defineEmits<{
  close: [];
  submit: [data: MenuItemData];
}>();

const formData = ref<MenuItemData>({
  name: '',
  price: '',
  description: '',
  tiktokUrl: '',
  instagramUrl: '',
  ingredients: '',
  position: '',
  category: ''
});

watch(() => props.initialData, (newData) => {
  formData.value = { ...newData };
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', { ...formData.value });
};
</script>