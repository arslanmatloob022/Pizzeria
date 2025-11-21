<script setup lang="ts">
import { ref } from "vue";
import { type Component } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    items: { id: string | number; title: string; value: string | number }[];
    placeholder?: string;
    icon?: Component;
    class?: string;
    label?: string;
    rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  }>(),
  {
    rounded: "2xl",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (
    e: "select",
    item: { id: string | number; title: string; value: string | number }
  ): void;
}>();

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectItem(item: {
  id: string | number;
  title: string;
  value: string | number;
}) {
  emit("update:modelValue", item.value);
  emit("select", item);
  isOpen.value = false;
}
</script>

<template>
  <div class="flex flex-col gap-1 w-full relative">
    <!-- Label -->
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Dropdown wrapper -->
    <div
      class="flex items-center justify-between border border-gray-300 px-2 py-1 sm:px-3 sm:py-2 bg-lightbg focus-within:ring-2 focus-within:ring-blue-500 cursor-pointer"
      :class="[
        props.class,
        {
          'rounded-sm': rounded === 'sm',
          'rounded-md': rounded === 'md',
          'rounded-lg': rounded === 'lg',
          'rounded-xl': rounded === 'xl',
          'rounded-2xl': rounded === '2xl',
          'rounded-full': rounded === 'full',
        },
      ]"
      @click="toggleDropdown"
    >
      <div class="flex items-center gap-2 flex-1">
        <component v-if="icon" :is="icon" class="w-5 h-5 text-gray-700" />
        <span class="text-gray-700 text-sm sm:text-base truncate">
          {{
            modelValue
              ? items.find((i) => i.value === modelValue)?.title
              : placeholder || "Select an option"
          }}
        </span>
      </div>

      <!-- Chevron -->
      <svg
        class="w-4 h-4 text-gray-500 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <!-- Dropdown list -->
    <ul
      v-if="isOpen"
      class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto"
    >
      <li
        v-for="item in items"
        :key="item.id"
        @click.stop="selectItem(item)"
        class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        :class="{
          'bg-blue-50 text-blue-700 font-medium': modelValue === item.value,
        }"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
