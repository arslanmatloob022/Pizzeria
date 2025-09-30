<template>
  <div class="min-h-screen flex bg-black-50">
    <!-- Left Side - Forgot Password Form -->
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

        <!-- Forgot Password Form -->
        <div class="space-y-6">
          <div class="text-center">
            <h1 class="text-3xl font-semibold text-gray-900 mb-2">Forgot Password</h1>
            <p class="text-gray-600">Please fill in the information requested below.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500">*Required</span>
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="Enter your email"
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors',
                  emailError ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateEmail"
                @input="clearEmailError"
              />
              <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
            </div>

            <!-- Send OTP Button -->
            <button
              type="submit"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Right Side - Brand Image -->
    <div class="w-1/2 bg-gray-50 flex items-center justify-center">
      <img
        src="/src/assets/images/login-image.png"
        alt="Forgot Password"
        class="max-w-full max-h-full object-contain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const emailError = ref("");
const router = useRouter();

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = "Email is required";
  } else if (!emailPattern.test(email.value)) {
    emailError.value = "Please enter a valid email address";
  } else {
    emailError.value = "";
  }
};

const clearEmailError = () => {
  if (emailError.value) {
    emailError.value = "";
  }
};

const handleSubmit = () => {
  validateEmail();
  
  if (!emailError.value && email.value) {
    // For testing: accept dummy email "test@example.com"
    if (email.value === "test@example.com") {
      router.push("/otp-verification");
    } else {
      emailError.value = "Email not found. Use test@example.com for testing.";
    }
  }
};
</script>