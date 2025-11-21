<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useNotifyStore } from "@/store/notify";

const notifyStore = useNotifyStore();
const user = useAuthStore();
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="notifyStore.notification.show && user.user?.role === 'user'"
      class="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium"
      :class="{
        'bg-green-500': notifyStore.notification.type === 'success',
        'bg-red-500': notifyStore.notification.type === 'error',
        'bg-blue-500': notifyStore.notification.type === 'info',
      }"
    >
      {{ notifyStore.notification.message }}
    </div>
  </Transition>
</template>
