<script setup lang="ts">
import { PlusIcon, Search } from "lucide-vue-next";
import Baseinput from "./ui/Baseinput.vue";
import { useResturantStore } from "@/store/resturantStore";

const resturantStore = useResturantStore();

const search = ref("");
</script>

<template>
  <div class="space-y-3">
    <!-- Action Bar -->
    <div
      class="flex justify-between flex-col md:flex-row items-stretch md:items-center gap-3"
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
        <BaseButton @click="resturantStore.handleAddResturant" :icon="PlusIcon">
          New Resturant
        </BaseButton>
      </div>

      <AddEditResturantModal
        v-if="resturantStore.addResturantModal"
        :open="resturantStore.addResturantModal"
        @close="resturantStore.addResturantModal = false"
        title="Add New Restaurant"
      />
    </div>
  </div>
</template>
