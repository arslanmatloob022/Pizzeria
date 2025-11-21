<script setup lang="ts">
import { useClientStore } from "@/store/clientStore";
import { mediaData } from "@/lib/mediaData";

const clientStore = useClientStore();
const router = useRouter();

const orderNumber = `#${Math.floor(Math.random() * 900000) + 100000}`;
const deliveryTime = new Date(Date.now() + 45 * 60000).toLocaleString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-[80vh] px-4 relative">
    <!-- Floating Cart Icon -->
    <div class="fixed top-4 right-4 z-50">
      <div class="relative">
        <button
          @click="router.push('/cart-page')"
          class="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg"
        >
          <i class="fa-solid fa-cart-shopping text-white text-lg"></i>
        </button>

        <span
          v-if="clientStore.cartItemCount"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white"
        >
          {{ clientStore.cartItemCount }}
        </span>
      </div>
    </div>

    <div class="max-w-4xl w-full space-y-8">
      <div class="text-center space-y-2">
        <h1 class="text-white text-4xl font-bold">Order Confirmation!</h1>
        <p class="text-gray-400">Check your order here.</p>
      </div>

      <div class="flex justify-center">
        <img :src="mediaData.pizzaIcon" class="w-48 h-48 object-contain" />
      </div>

      <div class="grid grid-cols-3 gap-6 text-center">
        <div>
          <p class="text-gray-400 text-sm mb-2">Order Number</p>
          <p class="text-white font-semibold">{{ orderNumber }}</p>
        </div>
        <div>
          <p class="text-gray-400 text-sm mb-2">No of Pizzas</p>
          <p class="text-white font-semibold">
            {{ clientStore.currentOrder?.items?.length || 0 }} Pizzas
          </p>
        </div>
        <div>
          <p class="text-gray-400 text-sm mb-2">Delivery Time</p>
          <p class="text-white font-semibold text-xs">{{ deliveryTime }}</p>
        </div>
      </div>

      <hr class="border-gray-700" />

      <div class="grid grid-cols-2 gap-6">
        <div>
          <p class="text-gray-400 text-sm mb-2">Total Amount</p>
          <p class="text-white font-semibold text-xl">
            ${{ clientStore.currentOrder?.total || "0.00" }}
          </p>
        </div>
        <div>
          <p class="text-gray-400 text-sm mb-2">Delivery/Pickup Details</p>
          <p class="text-white text-sm">
            {{ clientStore.currentOrder?.formData?.address || "N/A" }}
          </p>
        </div>
      </div>

      <hr class="border-gray-700" />

      <div class="grid grid-cols-2 gap-6">
        <div>
          <p class="text-gray-400 text-sm mb-2">Payment Method</p>
          <p class="text-white font-semibold">
            {{
              clientStore.currentOrder?.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Via Plover"
            }}
          </p>
        </div>
        <div>
          <p class="text-gray-400 text-sm mb-2">Payment</p>
          <p class="text-white font-semibold">Not Paid</p>
        </div>
      </div>

      <BaseButton
        @click="router.push('/')"
        class="w-full bg-red hover:bg-red/90"
        >Back to Home</BaseButton
      >
    </div>
  </main>
</template>
