<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Checkbox",
  },
});

const emit = defineEmits(["update:modelValue"]);

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<template>
  <label
    class="flex items-center gap-2 cursor-pointer select-none"
    @click="toggle"
  >
    <div
      class="w-7 h-7 border border-gray-400 rounded transition-all duration-200 flex items-center justify-center"
      :class="{
        'bg-red-500 border-red-500': modelValue,
        'bg-transparent': !modelValue,
      }"
    >
      <svg
        v-if="modelValue"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="white"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 
          0l8-8a1 1 0 000-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <span class="text-sm text-gray-200">{{ title }}</span>
  </label>
</template>
