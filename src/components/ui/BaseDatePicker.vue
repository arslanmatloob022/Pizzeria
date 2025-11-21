<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: Date | null;
    placeholder?: string;
    type?: "date" | "datetime" | "time";
    class?: string;
  }>(),
  {
    modelValue: null,
    type: "datetime",
    placeholder: "Select date",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: Date | null): void;
}>();

const value = ref<Date | null>(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    value.value = val;
  }
);

const updateValue = (val: Date | null) => {
  emit("update:modelValue", val);
};
</script>

<template>
  <VueDatePicker
    v-model="value"
    :enable-time-picker="props.type !== 'date'"
    :placeholder="props.placeholder"
    :format="
      props.type === 'time'
        ? 'HH:mm'
        : props.type === 'date'
        ? 'dd MMM yyyy'
        : 'dd MMM yyyy HH:mm'
    "
    :time-picker="props.type === 'time'"
    @update:model-value="updateValue"
    :class="props.class"
  />
</template>
