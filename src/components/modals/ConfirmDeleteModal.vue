<template>
  <BaseModal title="Confirm Delete" @close="$emit('close')">
    <p class="text-gray-600 mb-6">
      Are you sure you want to delete "{{ itemName }}"? This action cannot be undone.
    </p>
    <div class="flex justify-end space-x-3">
      <button
        @click="$emit('close')"
        class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        @click="$emit('confirm')"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue';

interface Props {
  itemName: string;
}

defineProps<Props>();

defineEmits<{
  close: [];
  confirm: [];
}>();
</script>