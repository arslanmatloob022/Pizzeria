<script setup lang="ts">
import { type Component } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    type?: string;
    icon?: Component;
    class?: string;
    label?: string;
    required?: boolean;
    error?: string; // <-- new prop for parent-controlled error
    rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  }>(),
  {
    rounded: "2xl",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "input", event: Event): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  emit("input", event);
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <!-- Label -->
    <label
      v-if="label"
      class="text-sm font-medium text-gray-700 flex items-center gap-1"
    >
      {{ label }}

      <span v-if="error" class="text-red-500 text-xs font-medium mt-0">
        *{{ error }}
      </span>
    </label>

    <!-- Input wrapper -->
    <div
      class="flex items-center gap-2 border px-2 py-1 sm:px-3 sm:py-2 bg-lightbg focus-within:ring-2 transition-all"
      :class="[
        props.class,
        {
          'border-gray-300 focus-within:ring-blue-500': !error,
          'border-red-500 focus-within:ring-red-500': error,
          'rounded-sm': rounded === 'sm',
          'rounded-md': rounded === 'md',
          'rounded-lg': rounded === 'lg',
          'rounded-xl': rounded === 'xl',
          'rounded-2xl': rounded === '2xl',
          'rounded-full': rounded === 'full',
        },
      ]"
    >
      <!-- Icon -->
      <component v-if="icon" :is="icon" class="w-5 h-5 text-gray-700" />

      <!-- Input -->
      <input
        :type="type || 'text'"
        :placeholder="placeholder"
        class="flex-1 outline-none text-gray-700 placeholder-gray-400 h-7 text-sm sm:text-base bg-transparent"
        :value="modelValue"
        @input="onInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
    </div>

    <!-- Error Message -->
  </div>
</template>
