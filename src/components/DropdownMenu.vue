<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  label: string;
  items: { id: number; title: string; key: string }[];
}>();

const emit = defineEmits<{
  (e: "select", item: { id: number; title: string; key: string }): void;
}>();

const isOpen = ref(false);

const toggle = () => (isOpen.value = !isOpen.value);

const selectItem = (item: { id: number; title: string; key: string }) => {
  emit("select", item);
  isOpen.value = false;
};
</script>

<template>
  <div class="relative">
    <button
      @click="toggle"
      class="flex font-semibold cursor-pointer items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-white bg-gradient-to-r from-[#232323] to-[#1a1a1a] hover:from-[#2a2a2a] hover:to-[#222] border border-[#3a3a3a] hover:border-red-600 rounded-lg transition-all duration-200 shadow-sm"
    >
      <span class="truncate max-w-[120px] sm:max-w-none">{{ label }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        :class="['w-4 h-4 transition-transform duration-200', isOpen && 'rotate-180']"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 sm:w-56 bg-gradient-to-b from-[#232323] to-[#1a1a1a] border border-[#3a3a3a] rounded-lg shadow-xl text-sm overflow-hidden z-50"
      >
        <li
          v-for="(item, index) in props.items"
          :key="item.id"
          @click="selectItem(item)"
          class="px-4 py-3 sm:py-4 hover:bg-red-600/20 hover:border-l-2 hover:border-l-red-600 cursor-pointer transition-all duration-150 flex items-center gap-2"
          :class="index !== props.items.length - 1 && 'border-b border-[#2a2a2a]'"
        >
          <div class="w-2 h-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span class="text-[#D2D2D2] group-hover:text-white">{{ item.title }}</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>
