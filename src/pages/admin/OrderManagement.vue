<script setup lang="ts">
import { orderColumns } from "@/lib/staticData";
import { userOrderStore } from "@/store/orderStore";
import { useNotifyStore } from "@/store/notify";

const orderStore = userOrderStore();
const notifyStore = useNotifyStore();

const showCategoryModal = ref(false);
const orderDetailsModal = ref(false);
const activeOrder = ref<any>({});

function handleClick(item: any) {
  console.log(item);
  activeOrder.value = item;
  orderDetailsModal.value = true;
}

function handleStatusUpdate(data: { orderId: string; newStatus: string }) {
  // Find the order in the store and update its status
  const order = orderStore.orders.find(o => o.orderId === data.orderId);
  if (order) {
    order.orderStatus = data.newStatus;
    activeOrder.value.orderStatus = data.newStatus;
    notifyStore.notify.success(`Order status updated to ${data.newStatus}`);
  }
}

function handleapprove(item: any) {
  console.log("handleapprove called with:", item);
  // Handle status progression from table icons
  if (item.nextStatus) {
    console.log("Next status detected:", item.nextStatus);
    const order = orderStore.orders.find(o => o.orderId === item.orderId);
    console.log("Found order:", order);
    if (order) {
      const oldStatus = order.orderStatus;
      order.orderStatus = item.nextStatus;
      console.log(`Updated order status from ${oldStatus} to ${order.orderStatus}`);
      notifyStore.notify.success(`Order status updated to ${item.nextStatus}`);
    } else {
      console.log("Order not found with orderId:", item.orderId);
    }
  } else {
    console.log("No nextStatus in item, regular action");
  }
}

</script>

<template>
  <div>
    <div class="bg-white rounded-xl shadow p-3 lg:p-6">
      <OrdersActionBar
        button-title="Add new Category"
        @update:add-category="showCategoryModal = true"
      />
      <OrderManagmentTable
        :columns="orderColumns"
        :rows="orderStore.orders"
        :show-view-icon="false"
        :show-arrows="true"
        @row-click="handleClick"
        @edit="handleapprove"
        @view="handleClick"
      />
    </div>
    <OrderDetailsModal
      v-if="orderDetailsModal"
      :open="orderDetailsModal"
      :order-details="activeOrder"
      @close="orderDetailsModal = false"
      @update-status="handleStatusUpdate"
    />
  </div>
</template>
