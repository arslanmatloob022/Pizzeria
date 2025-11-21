<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import type { Component } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    icon?: Component;
    iconPosition?: "left" | "right";
    rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  }>(),
  {
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    type: "button",
    iconPosition: "left",
    rounded: "lg", // default
  }
);

const emit = defineEmits<{
  (e: "click", evt: MouseEvent): void;
}>();

const baseClasses =
  "inline-flex items-center justify-center gap-2 h-12 font-medium transition-colors  focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<string, string> = {
  primary: "bg-red text-white hover:bg-red-800 focus:ring-blue-500 w-full",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 w-full",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 w-full",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400 w-full",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const roundedClasses: Record<string, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :class="[
      baseClasses,
      variantClasses[props.variant],
      sizeClasses[props.size],
      roundedClasses[props.rounded],
    ]"
    @click="(e) => emit('click', e)"
  >
    <Loader2 v-if="props.loading" class="w-4 h-4 animate-spin" />

    <component
      v-if="props.icon && !props.loading && props.iconPosition === 'left'"
      :is="props.icon"
      class="w-5 h-5 text-white"
    />

    <slot />

    <component
      v-if="props.icon && !props.loading && props.iconPosition === 'right'"
      :is="props.icon"
      class="w-4 h-4"
    />
  </button>
</template>
