<script setup lang="ts">
import { type Component } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    icon?: Component;
    class?: string;
    label?: string;
    rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    rows?: number; // 👈 control textarea height
  }>(),
  {
    rounded: "2xl",
    rows: 3, // 👈 default height
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "input", event: Event): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
  emit("input", event);
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <!-- Label -->
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Textarea wrapper -->
    <div
      class="flex items-start gap-2 border border-gray-300 px-2 py-1 sm:px-3 sm:py-2 bg-lightbg focus-within:ring-2 focus-within:ring-blue-500"
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
    >
      <!-- Icon -->
      <component v-if="icon" :is="icon" class="w-5 h-5 text-gray-700 mt-1" />

      <!-- Textarea -->
      <textarea
        :placeholder="placeholder"
        :rows="rows"
        class="flex-1 outline-none text-gray-700 placeholder-gray-400 resize-none text-sm sm:text-base bg-transparent"
        :value="modelValue"
        @input="onInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      ></textarea>
    </div>
  </div>
</template>
