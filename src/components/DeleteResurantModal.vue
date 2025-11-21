<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  title: string;
}>();

const emit = defineEmits(["close", "confirmDelete"]);

function handleClose() {
  emit("close");
}
</script>

<template>
  <BaseModal :open="props.open" :title="props.title" @close="handleClose">
    <div class="flex gap-2">
      <BaseButton variant="secondary" @click="handleClose">Cancel</BaseButton>
      <BaseButton variant="danger" @click="emit('confirmDelete')"
        >Yes, Delete</BaseButton
      >
    </div>
  </BaseModal>
</template>
