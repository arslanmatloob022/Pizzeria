<script setup lang="ts">
import { PlusIcon, Search } from "lucide-vue-next";
import Baseinput from "./ui/Baseinput.vue";
import { useAdminStore } from "@/store/adminStore";

const props = defineProps<{
  buttonTitle?: string;
}>();

const adminStore = useAdminStore();

const emit = defineEmits(["update:addCategory", "update:addMenu"]);


// Use store's search query with two-way binding
const search = computed({
  get: () => adminStore.searchQuery,
  set: (value) => adminStore.setSearchQuery(value),
});

function handleButtonClick() {
  if (adminStore.activeTab === "categories") {
    emit("update:addCategory", true);
  } else if (adminStore.activeTab === "menuItems") {
    emit("update:addMenu", true);
  }
}
</script>

<template>
  <div class="space-y-3 relative">
    <!-- <Notification /> -->

    <Tabs
      :tabs="adminStore.tabs"
      :active-tab="adminStore.activeTab"
      @update-tab="adminStore.setActiveTab"
    />

    <div
      class="flex justify-between flex-col md:flex-row items-stretch md:items-center gap-3 lg:px-4"
    >
      <div>
        <Baseinput
          class="w-full lg:w-96"
          v-model="search"
          placeholder="Search"
          :icon="Search"
        />
      </div>

      <div
        class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <!-- <BaseDatePicker
          v-model="dateValue"
          type="datetime"
          placeholder="Select date and time"
          class="w-full sm:w-auto"
        /> -->
        <BaseButton @click="handleButtonClick" :icon="PlusIcon">
          {{ props.buttonTitle }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
