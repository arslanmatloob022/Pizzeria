<script setup lang="ts">
import { useClientStore } from "@/store/clientStore";

const deliveryMethod = ref<"delivery" | "pickup" | null>(null);
const paymentMethod = ref<"clover">("clover"); // Default to clover, remove COD

const formData = ref({
  fullname: "",
  phone: "",
  address: "",
  notes: "",
  nameOnCard: "",
  email: "",
  cvv: "",
  postalCode: "",
  cardNumber: "",
});

const errors = ref<Record<string, string>>({});

const clientStore = useClientStore();
const router = useRouter();

// 🔹 Simple Validation Helper
const validateForm = () => {
  const e: Record<string, string> = {};

  if (!deliveryMethod.value)
    e.deliveryMethod = "Please select a delivery method.";
  if (!formData.value.fullname.trim()) e.fullname = "Full name is required.";
  if (!formData.value.phone) e.phone = "Phone number is required.";
  else if (!/^[0-9]{10,15}$/.test(formData.value.phone))
    e.phone = "Enter a valid phone number.";

  if (!formData.value.address.trim()) e.address = "Address is required.";

  // Only validate payment details if delivery method is NOT pickup
  if (deliveryMethod.value !== "pickup") {
    if (!formData.value.nameOnCard.trim())
      e.nameOnCard = "Name on card is required.";
    if (!formData.value.cvv.trim()) e.cvv = "CVV is required.";
    else if (!/^[0-9]{3,4}$/.test(formData.value.cvv))
      e.cvv = "Enter a valid CVV.";
    if (!formData.value.postalCode.trim())
      e.postalCode = "Postal code is required.";
    if (!formData.value.cardNumber.trim())
      e.cardNumber = "Card number is required.";
    else if (
      !/^[0-9]{12,19}$/.test(formData.value.cardNumber.replace(/\s/g, ""))
    )
      e.cardNumber = "Enter a valid card number.";
  }

  errors.value = e;
  return Object.keys(e).length === 0;
};

const handleCompleteOrder = () => {
  if (!validateForm()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  clientStore.saveOrder({
    deliveryMethod: deliveryMethod.value,
    paymentMethod: paymentMethod.value,
    formData: formData.value,
    items: clientStore.cart,
    total: clientStore.cartTotal,
  });
  router.push("/order-confirmation");
};
</script>

<template>
  <main class="min-h-screen max-w-4xl mx-auto px-4 py-8 overflow-y-auto relative">
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

    <!-- Header Section -->
    <section class="text-center mb-12 mt-4">
      <h1 class="text-white text-4xl lg:text-5xl font-bold mb-4">Checkout</h1>
      <p class="text-[#D2D2D2] text-lg">Complete your order with secure payment</p>
    </section>

    <!-- Main Checkout Content -->
    <div class="space-y-8 pb-20">
   

      <!-- Delivery Method Card -->
      <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 shadow-lg">
        <h2 class="text-white text-2xl font-semibold mb-6 flex items-center gap-3">
          <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
          Delivery Method
        </h2>

        <div class="grid grid-cols-2 gap-4">
          <div
            @click="deliveryMethod = 'delivery'"
            :class="[
              'border-2 rounded-lg p-4 cursor-pointer transition-all',
              deliveryMethod === 'delivery' 
                ? 'border-red-600 bg-red-600/10' 
                : 'border-[#3a3a3a] hover:border-[#4a4a4a]'
            ]"
          >
            <div class="text-center">
              <div class="text-2xl mb-2">🚚</div>
              <h3 class="text-white font-semibold">Delivery</h3>
              <p class="text-[#D2D2D2] text-sm">To your address</p>
            </div>
          </div>

          <div
            @click="deliveryMethod = 'pickup'"
            :class="[
              'border-2 rounded-lg p-4 cursor-pointer transition-all',
              deliveryMethod === 'pickup' 
                ? 'border-red-600 bg-red-600/10' 
                : 'border-[#3a3a3a] hover:border-[#4a4a4a]'
            ]"
          >
            <div class="text-center">
              <div class="text-2xl mb-2">🏪</div>
              <h3 class="text-white font-semibold">Pickup</h3>
              <p class="text-[#D2D2D2] text-sm">From restaurant</p>
            </div>
          </div>
        </div>

        <p v-if="errors.deliveryMethod" class="text-red-500 text-sm mt-3">
          {{ errors.deliveryMethod }}
        </p>
      </div>

      <!-- Personal Information Card -->
      <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 shadow-lg">
        <h2 class="text-white text-2xl font-semibold mb-6 flex items-center gap-3">
          <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
          Personal Information
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-white text-sm font-medium mb-2 block">Full Name</label>
            <input
              type="text"
              v-model="formData.fullname"
              placeholder="Enter your full name"
              class="w-full h-12 bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors"
            />
            <p v-if="errors.fullname" class="text-red-500 text-sm mt-1">{{ errors.fullname }}</p>
          </div>

          <div>
            <label class="text-white text-sm font-medium mb-2 block">Phone Number</label>
            <input
              type="tel"
              v-model="formData.phone"
              placeholder="Enter your phone number"
              class="w-full h-12 bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors no-spinner"
            />
            <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
          </div>

          <div class="md:col-span-2">
            <label class="text-white text-sm font-medium mb-2 block">Delivery Address</label>
            <input
              type="text"
              v-model="formData.address"
              placeholder="Enter your complete address"
              class="w-full h-12 bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors"
            />
            <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
          </div>

          <div class="md:col-span-2">
            <label class="text-white text-sm font-medium mb-2 block">Additional Notes <span class="text-[#888]">(Optional)</span></label>
            <textarea
              v-model="formData.notes"
              placeholder="Any special instructions or notes"
              rows="3"
              class="w-full bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 py-3 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Payment Details Card (Hidden for Pickup) -->
      <div v-if="deliveryMethod === 'delivery'" class="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 shadow-lg">
        <div class="flex items-center flex-col md:flex-row  gap-3 justify-between mb-6">
          <h2 class="text-white text-2xl font-semibold flex items-center gap-3">
            <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
            Payment Details
          </h2>
          <div class="flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
            <div class="w-2 h-2 bg-green-400 rounded-full"></div>
            Secure Payment via Clover
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-white text-sm font-medium mb-2 block">Name on Card</label>
            <input
              type="text"
              v-model="formData.nameOnCard"
              placeholder="Enter cardholder name"
              class="w-full h-12 bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors"
            />
            <p v-if="errors.nameOnCard" class="text-red-500 text-sm mt-1">{{ errors.nameOnCard }}</p>
          </div>

          <div>
            <label class="text-white text-sm font-medium mb-2 block">Email <span class="text-[#888]">(Optional)</span></label>
            <input
              type="email"
              v-model="formData.email"
              placeholder="Enter your email"
              class="w-full h-12 bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors"
            />
          </div>

          <div class="md:col-span-2">
            <label class="text-white text-sm font-medium mb-2 block">Card Number</label>
            <input
              type="text"
              v-model="formData.cardNumber"
              placeholder="1234 5678 9012 3456"
              class="w-full h-12 bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors no-spinner"
            />
            <p v-if="errors.cardNumber" class="text-red-500 text-sm mt-1">{{ errors.cardNumber }}</p>
          </div>

          <div>
            <label class="text-white text-sm font-medium mb-2 block">CVV</label>
            <input
              type="text"
              v-model="formData.cvv"
              placeholder="123"
              maxlength="4"
              class="w-full h-12 bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors"
            />
            <p v-if="errors.cvv" class="text-red-500 text-sm mt-1">{{ errors.cvv }}</p>
          </div>

          <div>
            <label class="text-white text-sm font-medium mb-2 block">Postal Code</label>
            <input
              type="text"
              v-model="formData.postalCode"
              placeholder="12345"
              class="w-full h-12 bg-[#232323] border border-[#3a3a3a] rounded-lg px-4 text-white placeholder-[#888] focus:border-red-600 focus:outline-none transition-colors"
            />
            <p v-if="errors.postalCode" class="text-red-500 text-sm mt-1">{{ errors.postalCode }}</p>
          </div>
        </div>
      </div>

      <!-- Complete Order Button -->
      <div class="flex justify-center pt-6">
        <BaseButton 
          @click="handleCompleteOrder" 
          class="w-full max-w-md h-14 text-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
        >
          Complete Order - ${{ clientStore.cartTotal }}
        </BaseButton>
      </div>
    </div>
  </main>
</template>

<style scoped>
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
