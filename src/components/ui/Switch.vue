<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "change", value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  size: "md",
});

const emit = defineEmits<Emits>();

const toggle = () => {
  if (props.disabled) return;
  const newValue = !props.modelValue;
  emit("update:modelValue", newValue);
  emit("change", newValue);
};

const sizeClasses = {
  sm: { switch: "h-5 w-9", thumb: "h-3 w-3", translate: "translate-x-4" },
  md: { switch: "h-6 w-11", thumb: "h-4 w-4", translate: "translate-x-5" },
  lg: { switch: "h-8 w-15", thumb: "h-6 w-6", translate: "translate-x-7" },
};
</script>

<template>
  <div class="flex items-center space-x-3">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      @click="toggle"
      :class="[
        'relative inline-flex flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2',
        sizeClasses[size].switch,
        modelValue ? 'bg-green-500' : 'bg-gray-300',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          'pointer-events-none inline-block transform mt-[2px] rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          sizeClasses[size].thumb,
          modelValue ? sizeClasses[size].translate : 'translate-x-0',
        ]"
      />
    </button>
    <span
      :class="[
        'text-sm font-light select-none transition-colors duration-200',
        modelValue ? 'text-green-500' : 'text-gray-600',
        disabled ? 'opacity-50' : '',
      ]"
    >
      {{ modelValue ? "Enable" : "Disable" }}
    </span>
  </div>
</template>
