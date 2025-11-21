<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronLeft, ChevronRight, Truck, Check, X, Eye } from "lucide-vue-next";
import { mediaData } from "@/lib/mediaData";
import { useNotifyStore } from "@/store/notify";
import { ORDER_STATUS } from "@/lib/staticData";

const notifyStore = useNotifyStore();

// Props
const props = defineProps<{
  columns: { key: string; label: string }[];
  rows: any[];
  showViewIcon?: boolean;
  showArrows?: boolean;
  showStatusNotification?: boolean;
}>();

// Emit events
const emit = defineEmits<{
  (e: "status-change", payload: { row: any; value: boolean }): void;
  (e: "edit", row: any): void;
  (e: "view", row: any): void;
  (e: "delete", row: any): void;
  (e: "videoPlay", row: any): void;
  (e: "rowClick", row: any): void;
}>();

const currentPage = ref(1);
const rowsPerPage = ref(10);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return props.rows.slice(start, start + rowsPerPage.value);
});

const totalPages = computed(() =>
  Math.ceil(props.rows.length / rowsPerPage.value)
);

const changePage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleStatusChange = (payload: { row: any; value: boolean }) => {
  emit('status-change', payload);
  // Only show notification if showStatusNotification prop is true
  if (props.showStatusNotification) {
    const statusText = payload.value ? 'enabled' : 'disabled';
    notifyStore.notify.success(`Status ${statusText} successfully!`);
  }
};

// Get the next status
const getNextStatus = (currentStatus: string) => {
  switch (currentStatus) {
    case ORDER_STATUS.RECEIVED:
      return ORDER_STATUS.PREPARING;
    case ORDER_STATUS.PREPARING:
      return ORDER_STATUS.COMPLETED;
    case ORDER_STATUS.COMPLETED:
      return ORDER_STATUS.COMPLETED; // Already completed
    default:
      return currentStatus;
  }
};

// Handle icon click to advance status
const handleStatusIconClick = (row: any, action: 'approve' | 'reject') => {
  if (action === 'approve') {
    const nextStatus = getNextStatus(row.orderStatus);
    if (nextStatus !== row.orderStatus) {
      emit('edit', { ...row, nextStatus });
    }
  } else if (action === 'reject') {
    // Handle reject action - you can emit a different event or handle cancellation
    emit('delete', row);
  }
};
</script>
<template>
  <main class="py-5">
    <div class="overflow-x-auto">
      <table class="min-w-full text-left border-collapse">
        <thead>
          <tr class="bg-lightbg">
            <th
              v-for="col in props.columns"
              :key="col.key"
              class="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap"
            >
              <h3>{{ col.label }}</h3>
            </th>
            <th
              class="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap"
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, i) in paginatedRows"
            :key="i"
            class="border border-lightborders hover:bg-gray-50"
          >
            <td
              @click="emit('rowClick', row)"
              v-for="col in props.columns"
              :key="col.key"
              class="p-3 text-sm text-gray-600 whitespace-nowrap"
            >
              <Switch
                v-if="col.key === 'status'"
                :model-value="row[col.key]"
                size="md"
                @change="(val) => handleStatusChange({ row, value: val })"
              />
              <div
                v-else-if="
                  col.key === 'tiktokVideo' || col.key === 'instaVideo'
                "
                class="w-10"
              >
                <img
                  class="cursor-pointer"
                  @click="emit('videoPlay', row[col.key])"
                  :src="mediaData.playicon"
                />
                <!-- <Icon
                  :icon="PlayCircleIcon"
                  size="20"
                  class="cursor-pointer text-gray-600 hover:text-blue-600 transition-all"
                  @click="emit('videoPlay', row[col.key])"
                /> -->
              </div>

              <h4 v-else>{{ row[col.key] }}</h4>
            </td>

            <!-- Actions -->
            <td class="p-3 flex items-center gap-3 whitespace-nowrap">
              <img
                v-if="props.showViewIcon"
                :src="mediaData.eyeIcon"
                @click="emit('view', row)"
                class="cursor-pointer"
              />

              <!-- Status-based icons for order management -->
              <template v-if="showArrows">
                <!-- Tick and Cross icons for Received orders -->
                <template v-if="row.orderStatus === ORDER_STATUS.RECEIVED">
                  <Icon
                    :icon="Check"
                    size="20"
                    @click="handleStatusIconClick(row, 'approve')"
                    class="cursor-pointer text-green-600 hover:text-green-700 transition-colors"
                    title="Approve Order"
                  />
                  <Icon
                    :icon="X"
                    size="20"
                    @click="handleStatusIconClick(row, 'reject')"
                    class="cursor-pointer text-red-600 hover:text-red-700 transition-colors"
                    title="Reject Order"
                  />
                </template>
                
                <!-- Van and Cross icons for Preparing orders -->
                <template v-else-if="row.orderStatus === ORDER_STATUS.PREPARING">
                  <Icon
                    :icon="Truck"
                    size="20"
                    @click="handleStatusIconClick(row, 'approve')"
                    class="cursor-pointer text-blue-600 hover:text-blue-700 transition-colors"
                    title="Mark as Delivered"
                  />
                  <Icon
                    :icon="X"
                    size="20"
                    @click="handleStatusIconClick(row, 'reject')"
                    class="cursor-pointer text-red-600 hover:text-red-700 transition-colors"
                    title="Cancel Order"
                  />
                </template>
                
                <!-- Eye icon only for Completed orders -->
                <template v-else-if="row.orderStatus === ORDER_STATUS.COMPLETED">
                  <Icon
                    :icon="Eye"
                    size="20"
                    @click="emit('view', row)"
                    class="cursor-pointer text-gray-600 hover:text-gray-700 transition-colors"
                    title="View Order Details"
                  />
                </template>
              </template>

              <!-- Edit icon for non-order tables -->
              <template v-else>
                <img
                  :src="mediaData.editicon"
                  @click="emit('edit', row)"
                  class="cursor-pointer"
                />
                
                <img
                  :src="mediaData.deleteicon"
                  @click="emit('delete', row)"
                  class="cursor-pointer"
                />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2"
    >
      <p class="text-sm text-gray-500 text-center sm:text-left">
        Showing {{ (currentPage - 1) * rowsPerPage + 1 }} to
        {{ Math.min(currentPage * rowsPerPage, props.rows.length) }} of
        {{ props.rows.length }} records
      </p>

      <div class="flex items-center gap-2">
        <button
          @click="changePage(currentPage - 1)"
          class="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          :disabled="currentPage === 1"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>

        <div class="flex gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="w-8 h-8 rounded-xl flex items-center justify-center"
            :class="
              page === currentPage ? 'bg-black text-white' : 'hover:bg-gray-200'
            "
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="changePage(currentPage + 1)"
          class="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          :disabled="currentPage === totalPages"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </main>
</template>
