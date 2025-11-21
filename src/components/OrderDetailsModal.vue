<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { orderStatusOptions } from "@/lib/staticData";

const props = defineProps<{
  open: boolean;
  orderDetails: {
    orderId: string;
    customer: string;
    totalAmount: string;
    address: string;
    itemSummary: string;
    dateTime: string;
    payment: string;
    orderStatus: string;
  };
}>();

const emit = defineEmits(["close", "updateStatus"]);

const showStatusDropdown = ref(false);

const statusOptions = orderStatusOptions;

const currentStatus = computed(() => {
  return statusOptions.find(status => status.value === props.orderDetails.orderStatus);
});

const handleStatusChange = (status: string) => {
  emit("updateStatus", { orderId: props.orderDetails.orderId, newStatus: status });
  showStatusDropdown.value = false;
};
</script>

<template>
  <BaseModal :open="props.open" title="Order Details" @close="emit('close')">
    <div class="p-6 bg-white rounded-2xl w-full max-w-lg mx-auto space-y-6">
      <!-- Customer Name -->
      <div>
        <h3 class="text-sm font-medium text-gray-500 mb-2">Customer Name</h3>
        <p class="text-lg font-semibold text-gray-500">
          {{ props.orderDetails.customer }}
        </p>
      </div>

      <!-- Address -->
      <div>
        <h3 class="text-sm font-medium text-gray-500 mb-2">Address</h3>
        <p class="text-lg font-semibold text-gray-500">
          {{ props.orderDetails.address }}
        </p>
      </div>

      <!-- Item Summary -->
      <div>
        <h3 class="text-sm font-medium text-gray-500 mb-2">Item Summary</h3>
        <div class="text-lg font-semibold text-gray-500 space-y-1">
          <div
            v-for="item in props.orderDetails.itemSummary.split(', ')"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <!-- Order Date/Time -->
      <div>
        <h3 class="text-sm font-medium text-gray-500 mb-2">Order Date/Time</h3>
        <p class="text-lg font-semibold text-gray-500">
          {{ props.orderDetails.dateTime }}
        </p>
      </div>

      <!-- Total Amount -->
      <div>
        <h3 class="text-sm font-medium text-gray-500 mb-2">Total Amount</h3>
        <p class="text-lg font-semibold text-gray-500">
          {{ props.orderDetails.totalAmount }}
        </p>
      </div>

      <!-- Status Dropdown -->
      <div class="pt-4">
        <h3 class="text-sm font-medium text-gray-500 mb-2">Order Status</h3>
        <div class="relative">
          <button
            @click.stop="showStatusDropdown = !showStatusDropdown"
            class="w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-between transition-all duration-200 hover:opacity-90"
            :class="currentStatus?.color || 'bg-gray-400'"
          >
            <span class=" text-black">{{ props.orderDetails.orderStatus }}</span>
            <ChevronDown 
              :size="20" 
              :class="['transition-transform duration-200', showStatusDropdown && 'rotate-180']"
            />
          </button>

          <!-- Dropdown Menu (Opens Upward) -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0 translate-y-2"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 translate-y-2"
          >
            <div
              v-if="showStatusDropdown"
              @click.stop
              class="absolute z-50 w-full bottom-full mb-2 bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden"
            >
              <button
                v-for="status in statusOptions"
                :key="status.value"
                @click.stop="handleStatusChange(status.value)"
                class="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-150 flex items-center gap-3 border-b border-gray-200 last:border-b-0"
                :class="status.value === props.orderDetails.orderStatus && 'bg-gray-100'"
              >
                <div 
                  class="w-3 h-3 rounded-full flex-shrink-0"
                  :class="status.color"
                ></div>
                <span class="font-semibold text-gray-800">{{ status.label }}</span>
                <span 
                  v-if="status.value === props.orderDetails.orderStatus"
                  class="ml-auto text-green-600 text-lg font-bold"
                >
                  ✓
                </span>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
