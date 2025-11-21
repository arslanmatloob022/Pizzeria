<script setup lang="ts">
import ActionBar from "@/components/ActionBar.vue";
import { superAdminColumns } from "@/lib/staticData";
import { useResturantStore } from "@/store/resturantStore";
import { ref } from "vue";

const resturantStore = useResturantStore();

const showEnableDisableModal = ref(false);
const activeItem = ref<any>(null);

// handle toggle switch change
const handleStatusChange = (payload: { row: any; value: boolean }) => {
  const { row, value } = payload;

  // If enabling directly, just update
  if (value === true) {
    resturantStore.updateRestaurantStatus(row.uuid, true);
    return;
  }

  // If disabling, show confirmation modal
  activeItem.value = row;
  showEnableDisableModal.value = true;
};

// confirm disable after modal
const confirmDisable = () => {
  if (activeItem.value) {
    resturantStore.updateRestaurantStatus(activeItem.value.uuid, false);
  }
  showEnableDisableModal.value = false;
  activeItem.value = null;
};

const handleEdit = (row: any) => {
  resturantStore.handleEditResturant(row);
};

const handleDelete = (row: any) => {
  resturantStore.openDeleteModal(row.uuid);
};
</script>

<template>
  <div>
    <div class="bg-white rounded-lg shadow p-3 lg:p-6">
      <ActionBar />
      <CommonDataTable
        :columns="superAdminColumns"
        :rows="resturantStore.resturantsData"
        @status-change="handleStatusChange"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- Delete Modal -->
    <DeleteResurantModal
      v-if="resturantStore.deleteResturantModal"
      title="Are you sure you want to delete the Restaurant?"
      :open="resturantStore.deleteResturantModal"
      @confirm-delete="resturantStore.deleteRestaurant"
      @close="resturantStore.deleteResturantModal = false"
    />

    <!-- Enable / Disable Confirmation Modal -->
    <EnableDisableCategoryModal
      v-if="showEnableDisableModal"
      :open="showEnableDisableModal"
      title="Are you sure you want to disable this restaurant?"
      @close="showEnableDisableModal = false"
      @success="confirmDisable"
    />
  </div>
</template>
