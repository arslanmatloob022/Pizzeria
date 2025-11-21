<script setup lang="ts">
import { CheckCircle, XCircle, Info } from "lucide-vue-next";
import { useNotifyStore } from "@/store/notify";

const notifyStore = useNotifyStore();

const notificationConfig = {
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
  },
  info: {
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
  },
};

const currentNotification = computed(
  () =>
    notificationConfig[notifyStore.notification.type] ||
    notificationConfig.success
);
</script>

<template>
  <!-- Toast Notification positioned at top-right -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="transform translate-x-full opacity-0"
    enter-to-class="transform translate-x-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="transform translate-x-0 opacity-100"
    leave-to-class="transform translate-x-full opacity-0"
  >
    <div
      v-if="notifyStore.notification.show"
      class="fixed top-5 right-5 z-50 flex items-center gap-3 p-4 border rounded-lg shadow-lg transition-all duration-300 min-w-80 max-w-96"
      :class="currentNotification.bg"
    >
      <component
        :is="currentNotification.icon"
        :class="currentNotification.color"
        class="w-5 h-5 flex-shrink-0"
      />
      <span :class="currentNotification.color" class="text-sm font-medium flex-1">
        {{ notifyStore.notification.message }}
      </span>
      
      <!-- Close button -->
      <button
        @click="notifyStore.notification.show = false"
        :class="currentNotification.color"
        class="ml-2 hover:opacity-70 transition-opacity flex-shrink-0"
      >
        <XCircle class="w-4 h-4" />
      </button>
    </div>
  </Transition>
</template>
