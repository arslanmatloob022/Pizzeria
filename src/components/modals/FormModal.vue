<template>
  <BaseModal :title="title" :modal-class="modalClass" @close="$emit('close')">
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <div v-for="field in fields" :key="field.name" :class="field.containerClass">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ field.label }}
          </label>
          <input
            v-if="field.type !== 'textarea' && field.type !== 'select'"
            v-model="formData[field.name]"
            :type="field.type || 'text'"
            :placeholder="field.placeholder"
            :required="field.required"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
          <textarea
            v-else-if="field.type === 'textarea'"
            v-model="formData[field.name]"
            :rows="field.rows || 3"
            :placeholder="field.placeholder"
            :required="field.required"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          ></textarea>
          <select
            v-else-if="field.type === 'select'"
            v-model="formData[field.name]"
            :required="field.required"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          >
            <option value="">{{ field.placeholder || 'Select an option' }}</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
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
          {{ submitText }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseModal from './BaseModal.vue';

interface FormField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  containerClass?: string;
  options?: { value: string; label: string }[];
}

interface Props {
  title: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  submitText?: string;
  modalClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({}),
  submitText: 'Submit',
  modalClass: 'max-w-md'
});

const emit = defineEmits<{
  close: [];
  submit: [data: Record<string, any>];
}>();

const formData = ref<Record<string, any>>({});

// Initialize form data
const initializeFormData = () => {
  const data: Record<string, any> = {};
  props.fields.forEach(field => {
    data[field.name] = props.initialData[field.name] || '';
  });
  formData.value = data;
};

watch(() => props.initialData, initializeFormData, { immediate: true });
watch(() => props.fields, initializeFormData, { immediate: true });

const handleSubmit = () => {
  emit('submit', { ...formData.value });
};
</script>