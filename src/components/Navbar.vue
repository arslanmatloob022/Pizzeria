<script setup lang="ts">
import { mediaData } from "@/lib/mediaData";

const props = defineProps<{
  title: string;
}>();

const showNotificationDropdown = ref(false);

const toggleNotificationDropdown = () => {
  showNotificationDropdown.value = !showNotificationDropdown.value;
};

const closeNotificationDropdown = () => {
  showNotificationDropdown.value = false;
};

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as Element;
    if (!target.closest('.notification-dropdown-container')) {
      closeNotificationDropdown();
    }
  });
});
</script>

<template>
  <nav class="flex items-center justify-between mb-4">
    <div>
      <h1>{{ props.title }}</h1>
      <BreadCrums />
    </div>
    <div class="flex items-center gap-3">
      <!-- Notification Dropdown -->
      <div class="relative notification-dropdown-container">
        <img 
          :src="mediaData.bellicon" 
          class="cursor-pointer hover:opacity-80 transition-opacity" 
          @click="toggleNotificationDropdown"
        />
        
        <!-- Notification Dropdown -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="showNotificationDropdown"
            class="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-3 px-4 z-50"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-semibold text-gray-900">Notifications</h3>
            </div>
            
            <!-- No notifications message -->
            <div class="text-center py-8">
              <div class="text-gray-400 mb-2">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <p class="text-sm text-gray-500">No notifications</p>
            </div>
          </div>
        </Transition>
      </div>
      
      <!-- <Icon :icon="Bell" size="30" /> -->
      <UserCard />
    </div>
  </nav>
</template>
