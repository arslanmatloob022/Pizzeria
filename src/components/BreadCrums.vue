<script setup lang="ts">
import { useBreadcrumbStore } from "@/store/breadcrumb";
import { ChevronRight } from "lucide-vue-next";

const breadcrumbStore = useBreadcrumbStore();
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 text-sm text-gray-600">
      <li
        v-for="(item, index) in breadcrumbStore.breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <router-link
          v-if="index < breadcrumbStore.breadcrumbs.length - 1"
          :to="item.url"
          class="hover:text-blue-600 transition-colors"
        >
          {{ item.label }}
        </router-link>
        <span v-else>
          {{ item.label }}
        </span>

        <span
          v-if="index < breadcrumbStore.breadcrumbs.length - 1"
          class="mr-0 ml-2 text-gray-400"
        >
          <ChevronRight :size="16" />
        </span>
      </li>
    </ol>
  </nav>
</template>
