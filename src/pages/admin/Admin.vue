<script setup lang="ts">
import { adminCategoriesColumns, adminMenuColumns } from "@/lib/staticData";
import { useAdminStore } from "@/store/adminStore";
import { useNotifyStore } from "@/store/notify";

const adminStore = useAdminStore();
const notify = useNotifyStore();

const showCategoryModal = ref(false);
const showMenuModal = ref(false);
const deleteCategoryModal = ref(false);
const deleteMenuModal = ref(false);
const viewCategoryModal = ref(false);

const activeItem = ref<any>({});

const disableCategoryModal = ref(false);

function handleStatusChange(payload: { row: any; value: boolean }) {
  // Determine which array to update based on active tab
  const isCategory = adminStore.activeTab === 'categories';
  const items = isCategory ? adminStore.adminCategoriesRows : adminStore.adminMenuitemsRows;
  const itemType = isCategory ? 'Category' : 'Menu item';
  
  // If trying to enable (value is true), allow it directly
  if (payload.value === true) {
    const item = items.find((item) => item.uuid === payload.row.uuid);
    if (item) {
      item.status = true;
      notify.notify.success(`${itemType} enabled successfully!`);
    }
    return;
  }
  
  // If trying to disable (value is false), show confirmation modal
  disableCategoryModal.value = true;
  activeItem.value = payload.row;
}

function handleCategoryEdit(item: any) {
  activeItem.value = item;
  showCategoryModal.value = true;
}

function handleMenuitemEdit(item: any) {
  activeItem.value = item;
  showMenuModal.value = true;
}

function handleCategoryDelete(item: any) {
  activeItem.value = item;
  deleteCategoryModal.value = true;
}
function handleMenuItemDelete(item: any) {
  activeItem.value = item;
  deleteMenuModal.value = true;
}

function handleCategorySubmit(data: any) {
  console.log(data);
  showCategoryModal.value = false;
  notify.notify.success("Category added successfully");
}

function confirmCategoryDelete() {
  activeItem.value = {};
  deleteCategoryModal.value = false;
  notify.notify.success("Category Deleted Successfully");
}

function confirmMenuitemDelete() {
  activeItem.value = {};
  deleteMenuModal.value = false;
  notify.notify.success("Menu Item Deleted Successfully");
}

function handleMenuItemSubmit(payload: any) {
  console.log(payload);
  showMenuModal.value = false;
  notify.notify.success("Menu Item added successfully");
}

function handleEnableDisableCategory() {
  disableCategoryModal.value = false;
  
  const isCategory = adminStore.activeTab === 'categories';
  const items = isCategory ? adminStore.adminCategoriesRows : adminStore.adminMenuitemsRows;
  const itemType = isCategory ? 'Category' : 'Menu item';
  
  const res = items.find((item) => item.uuid === activeItem.value.uuid);
  if (res) {
    res.status = false;
    notify.notify.success(`${itemType} disabled successfully!`);
  }
  activeItem.value = {};
}

function handleAddCategory() {
  activeItem.value = {};
  showCategoryModal.value = true;
}
function handleAddMenu() {
  activeItem.value = {};
  showMenuModal.value = true;
}

function handleViewCategory(item: any) {
  activeItem.value = item;
  viewCategoryModal.value = true;
}
</script>

<template>
  <div>
    <div class="bg-white overflow-y-hidden rounded-xl shadow p-2 lg:p-0">
      <AdminActionBar
        :button-title="adminStore.buttonText"
        @update:add-category="handleAddCategory"
        @update:add-menu="handleAddMenu"
      />
      <CommonDataTable
        class="lg:px-4"
        v-if="adminStore.activeTab === 'categories'"
        :columns="adminCategoriesColumns"
        :rows="adminStore.filteredCategories"
        :show-view-icon="true"
        @status-change="handleStatusChange"
        @view="handleViewCategory"
        @edit="handleCategoryEdit"
        @delete="handleCategoryDelete"
      />
      <CommonDataTable
        class="lg:px-4"
        v-if="adminStore.activeTab === 'menuItems'"
        :columns="adminMenuColumns"
        :rows="adminStore.filteredMenuItems"
        :show-view-icon="false"
        @status-change="handleStatusChange"
        @view="adminStore.ViewCategory"
        @edit="handleMenuitemEdit"
        @delete="handleMenuItemDelete"
      />
    </div>
    <AddEditCategoryModal
      v-if="showCategoryModal"
      :id="activeItem?.uuid ?? ''"
      :open="showCategoryModal"
      @submit="handleCategorySubmit"
      @close="showCategoryModal = false"
    />
    <AddEditMenuItemsModal
      v-if="showMenuModal"
      :id="activeItem?.uuid ?? ''"
      :open="showMenuModal"
      @submit="handleMenuItemSubmit"
      @close="showMenuModal = false"
    />
    <DeleteResurantModal
      v-if="deleteCategoryModal"
      :open="deleteCategoryModal"
      title="Are you sure you want to delete the category?"
      @confirm-delete="confirmCategoryDelete"
      @close="deleteCategoryModal = false"
    />
    <DeleteResurantModal
      v-if="deleteMenuModal"
      :open="deleteMenuModal"
      title="Are you sure you want to delete the Menu item?"
      @confirm-delete="confirmMenuitemDelete"
      @close="deleteMenuModal = false"
    />
    <EnableDisableCategoryModal
      v-if="disableCategoryModal"
      :open="disableCategoryModal"
      :title="
        activeItem.status
          ? `Are you sure you want to disable this ${adminStore.activeTab === 'categories' ? 'Category' : 'Menu item'}?`
          : `Are you sure you want to enable this ${adminStore.activeTab === 'categories' ? 'Category' : 'Menu item'}?`
      "
      :status="activeItem.status"
      @close="disableCategoryModal = false"
      @success="handleEnableDisableCategory"
    />
    
    <!-- View Category Modal -->
    <BaseModal
      v-if="viewCategoryModal"
      :open="viewCategoryModal"
      title="Category Details"
      @close="viewCategoryModal = false"
    >
      <div class="space-y-4">
        <!-- UUID -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">UUID</h3>
          <p class="text-lg font-semibold text-gray-700">{{ activeItem.uuid || 'N/A' }}</p>
        </div>

        <!-- Company Name -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Company Name</h3>
          <p class="text-lg font-semibold text-gray-700">{{ activeItem.companyName || 'N/A' }}</p>
        </div>

        <!-- Description -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Description</h3>
          <p class="text-lg font-semibold text-gray-700">{{ activeItem.description || 'N/A' }}</p>
        </div>

        <!-- Status -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Status</h3>
          <span 
            :class="[
              'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
              activeItem.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            ]"
          >
            {{ activeItem.status ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
