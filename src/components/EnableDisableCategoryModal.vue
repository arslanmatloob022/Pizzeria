<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  id?: string;
  status?: boolean;
  title?: string;
}>();

const emit = defineEmits(["close", "success"]);

function closeModal() {
  emit("close");
}
</script>

<template>
  <BaseModal :open="props.open" title="" @close="closeModal">
    <h1 class="text-center">{{ props.title }}</h1>
    <div class="flex gap-4 mt-8">
      <BaseButton variant="secondary" @click="emit('close')">Cancel</BaseButton>
      <BaseButton @click="emit('success')"
        >Yes,
        {{ props.title?.includes("enable") ? "Enable" : "Disable" }}</BaseButton
      >
    </div>
  </BaseModal>
</template>
