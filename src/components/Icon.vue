<script setup lang="ts">
import { type Component } from "vue";

const props = withDefaults(
  defineProps<{
    icon: Component;
    size?: number | string;
    color?: string;
    wrapperClass?: string;
  }>(),
  {
    size: 24,
    color: "currentColor",
    wrapperClass:
      "border border-lightborders cursor-pointer rounded-xl p-2 bg-white",
  }
);

const normalizedSize = computed(() => Number(props.size));
</script>

<template>
  <div :class="wrapperClass">
    <component
      :is="icon"
      :size="normalizedSize"
      :color="color"
      class="inline-block"
    />
  </div>
</template>
