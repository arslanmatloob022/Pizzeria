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
  name: "",
  price: "",
  description: "",
  tiktokVideo: "",
  instaVideo: "",
  ingredients: "",
  position: "",
  category: "",
});

function handleSubmit() {
  emit("submit", formData.value);
  closeModal();
}
</script>

<template>
  <BaseModal
    :open="props.open"
    :title="props.id ? 'Edit item' : 'Add item'"
    @close="closeModal"
  >
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col items-stretch gap-3 h-[70vh] overflow-y-auto p-2"
    >
      <Baseinput
        v-model="formData.name"
        rounded="md"
        label="Name"
        type="text"
        placeholder="Enter dish name"
      />
      <Baseinput
        v-model="formData.price"
        rounded="md"
        label="Price"
        type="number"
        placeholder="Enter dish price"
      />
      <BaseTextArea
        rounded="md"
        :rows="5"
        v-model="formData.description"
        label="Description"
        placeholder="Enter Description Here"
      />
      <Baseinput
        v-model="formData.tiktokVideo"
        label="Tik Tok video URL"
        rounded="md"
        type="text"
        placeholder="Paste video link"
      />
      <Baseinput
        v-model="formData.instaVideo"
        rounded="md"
        label="Insta video URL"
        type="text"
        placeholder="Paste video link"
      />
      <Baseinput
        v-model="formData.ingredients"
        rounded="md"
        label="Ingredients (Optional)"
        type="text"
        placeholder="Enter dish ingredients"
      />
      <Baseinput
        v-model="formData.position"
        rounded="md"
        label="Position"
        type="text"
        placeholder="Enter position"
      />
      <BaseDropdown
        rounded="md"
        v-model="formData.category"
        :items="[
          { id: 1, title: 'Pizza', value: 'pizza' },
          { id: 2, title: 'Pasta', value: 'pasta' },
          { id: 3, title: 'Drinks', value: 'drinks' },
        ]"
        label="Category"
        placeholder="Choose a category"
      />
      <BaseButton type="submit">{{
        props.id ? "Update" : "Add item"
      }}</BaseButton>
    </form>
  </BaseModal>
</template>
