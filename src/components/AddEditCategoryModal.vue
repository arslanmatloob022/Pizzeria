<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  id?: string;
}>();

const emit = defineEmits(["close", "submit"]);

function closeModal() {
  emit("close");
}

const formData = ref({
  categoryName: "",
  description: "",
});

function handleSubmit() {
  emit("submit", formData.value);
  closeModal();
}
</script>

<template>
  <BaseModal
    :open="props.open"
    :title="props.id ? 'Edit Category' : 'Add Category'"
    @close="closeModal"
  >
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-10">
      <Baseinput
        v-model="formData.categoryName"
        rounded="sm"
        label="Category Name"
        placeholder="Enter category name"
      />
      <BaseTextArea
        v-model="formData.description"
        label="Category Description"
        placeholder="Enter detailed information..."
        :rows="5"
        rounded="sm"
      />

      <BaseButton type="submit">{{
        props.id ? "Update" : "Add Category"
      }}</BaseButton>
    </form>
  </BaseModal>
</template>
