<template>
  <BaseModal 
    :title="isEdit ? 'Edit Category' : 'Add New Category'"
    @close="$emit('close')"
  >
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
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
          @click="$emit('close')"
          class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          {{ isEdit ? "Update" : "Add" }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseModal from './BaseModal.vue';

interface CategoryData {
  title: string;
  description: string;
}

interface Props {
  isEdit?: boolean;
  initialData?: CategoryData;
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
  initialData: () => ({ title: '', description: '' })
});

const emit = defineEmits<{
  close: [];
  submit: [data: CategoryData];
}>();

const formData = ref<CategoryData>({
  title: '',
  description: ''
});

watch(() => props.initialData, (newData) => {
  formData.value = { ...newData };
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', { ...formData.value });
};
</script>