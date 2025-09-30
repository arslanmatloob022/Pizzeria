<template>
  <div class="min-h-screen flex bg-black-50">
    <!-- Left Side - OTP Verification Form -->
    <div class="w-1/2 bg-white flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Brand Logo -->
        <div class="flex items-center justify-center mb-8">
          <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="8" r="3" />
              <circle cx="12" cy="16" r="2" />
            </svg>
          </div>
        </div>

        <!-- OTP Verification Form -->
        <div class="space-y-6">
          <div class="text-center">
            <h1 class="text-3xl font-semibold text-gray-900 mb-2">OTP Verification</h1>
            <p class="text-gray-600">Please fill in the information requested below.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- OTP Fields -->
            <div class="flex justify-center space-x-4">
              <input
                v-for="(digit, index) in otpDigits"
                :key="index"
:ref="(el: any) => otpInputs[index] = el as HTMLInputElement"
                v-model="otpDigits[index]"
                type="text"
                maxlength="1"
                :class="[
                  'w-16 h-16 text-center text-2xl font-semibold border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors',
                  otpError ? 'border-red-500' : 'border-gray-300'
                ]"
                @input="handleOtpInput(index, $event)"
                @keydown="handleKeydown(index, $event)"
                @paste="handlePaste"
              />
            </div>
            
            <p v-if="otpError" class="text-red-500 text-sm text-center">{{ otpError }}</p>

            <!-- Verify OTP Button -->
            <button
              type="submit"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Verify OTP
            </button>

            <!-- Resend OTP Button -->
            <button
              type="button"
              @click="resendOtp"
              class="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Resend OTP
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Right Side - Brand Image -->
    <div class="w-1/2 bg-gray-50 flex items-center justify-center">
      <img
        src="/src/assets/images/login-image.png"
        alt="OTP Verification"
        class="max-w-full max-h-full object-contain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";

const otpDigits = ref(["", "", "", ""]);
const otpError = ref("");
const otpInputs = ref<(HTMLInputElement | null)[]>([]);
const router = useRouter();

const handleOtpInput = async (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (value && /^\d$/.test(value)) {
    otpDigits.value[index] = value;
    otpError.value = "";
    
    // Move to next input
    if (index < 3) {
      await nextTick();
      const nextInput = otpInputs.value[index + 1];
      if (nextInput) nextInput.focus();
    }
  } else if (value) {
    // Clear invalid input
    otpDigits.value[index] = "";
  }
};

const handleKeydown = async (index: number, event: KeyboardEvent) => {
  if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
    await nextTick();
    const prevInput = otpInputs.value[index - 1];
    if (prevInput) prevInput.focus();
  }
};

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pastedData = event.clipboardData?.getData("text") || "";
  const digits = pastedData.replace(/\D/g, "").slice(0, 4).split("");
  
  digits.forEach((digit, index) => {
    if (index < 4) {
      otpDigits.value[index] = digit;
    }
  });
  
  otpError.value = "";
};

const validateOtp = () => {
  const otp = otpDigits.value.join("");
  if (otp.length !== 4) {
    otpError.value = "Please enter all 4 digits";
    return false;
  }
  if (!/^\d{4}$/.test(otp)) {
    otpError.value = "OTP must contain only numbers";
    return false;
  }
  return true;
};

const handleSubmit = () => {
  if (validateOtp()) {
    const otp = otpDigits.value.join("");
    // For testing: accept dummy OTP "1234"
    if (otp === "1234") {
      router.push("/new-password");
    } else {
      otpError.value = "Invalid OTP. Resend in 54sec. Use 1234 for testing.";
    }
  }
};

const resendOtp = () => {
  otpDigits.value = ["", "", "", ""];
  otpError.value = "";
  const firstInput = otpInputs.value[0];
  if (firstInput) firstInput.focus();
  console.log("OTP resent");
};
</script>