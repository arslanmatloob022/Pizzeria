<script setup lang="ts">
import { X } from "lucide-vue-next";

const { open, title } = defineProps<{
  open: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

function handleOverlayClick() {
  emit("close");
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    @click.self="handleOverlayClick"
  >
    <div
      class="bg-white m-4 lg:m-0 rounded-2xl shadow-lg w-full max-w-lg p-6 relative"
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-center">
        <h1 class="text-2xl mt-4 text-center">{{ title }}</h1>
        <button
          class="cursor-pointer absolute right-4 top-3 text-gray-500 hover:text-gray-700"
          @click="emit('close')"
        >
          <X class="w-8 h-8 bg-lightborders rounded-full p-1" />
        </button>
      </div>

      <!-- Modal Content -->
      <div class="mt-4">
        <slot />
      </div>
    </div>
  </div>
</template>
