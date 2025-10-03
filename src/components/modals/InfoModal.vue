<template>
  <BaseModal :title="title" @close="$emit('close')">
    <div class="text-gray-600 mb-6">
      <slot>
        <p>{{ message }}</p>
      </slot>
    </div>
    <div class="flex justify-end">
      <button
        @click="$emit('close')"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        {{ buttonText }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue';

interface Props {
  title: string;
  message?: string;
  buttonText?: string;
}

withDefaults(defineProps<Props>(), {
  message: '',
  buttonText: 'OK'
});

defineEmits<{
  close: [];
}>();
</script>