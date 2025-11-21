<script setup lang="ts">
import { useResturantStore } from "@/store/resturantStore";
import { ArrowRight } from "lucide-vue-next";

const props = defineProps<{
  open: boolean;
  title: string;
}>();

const emit = defineEmits(["close"]);
const resturantStore = useResturantStore();
function closeModal() {
  emit("close");
}

const formData = ref({
  name: "",
  address: "",
  phone: "",
});

// Pre-fill form if editing
watchEffect(() => {
  if (resturantStore.editMode && resturantStore.editingRestaurant) {
    formData.value = {
      name: resturantStore.editingRestaurant.restaurantName || "",
      address: resturantStore.editingRestaurant.address || "",
      phone: resturantStore.editingRestaurant.phoneNo || "",
    };
  } else {
    formData.value = { name: "", address: "", phone: "" };
  }
});

function handleSubmit() {
  resturantStore.handleformSubmit(formData.value);
  formData.value = { name: "", address: "", phone: "" };
  closeModal();
}
</script>

<template>
  <BaseModal
    :open="props.open"
    @close="closeModal"
    :title="resturantStore.editMode ? 'Edit Restaurant' : 'Add New Restaurant'"
  >
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-10">
      <Baseinput
        class="h-10"
        v-model="formData.name"
        placeholder="Enter Restaurant name"
        type="text"
        rounded="md"
        label="Restaurant name"
      />

      <Baseinput
        class="h-10"
        v-model="formData.address"
        placeholder="Enter Restaurant Address"
        type="text"
        rounded="md"
        label="Restaurant Address"
      />

      <Baseinput
        class="h-10"
        v-model="formData.phone"
        placeholder="Enter Restaurant Phone No"
        type="number"
        rounded="md"
        label="Restaurant Phone No"
      />
      <BaseButton
        icon-position="right"
        :icon="ArrowRight"
        variant="outline"
        rounded="full"
        >Connect Clover Account</BaseButton
      >

      <BaseButton type="submit">
        {{ resturantStore.editMode ? "Update Restaurant" : "Add Restaurant" }}
      </BaseButton>
    </form>
  </BaseModal>
</template>
