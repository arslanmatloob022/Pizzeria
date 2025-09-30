<template>
  <div class="min-h-screen flex bg-black-50">
    <!-- Left Side - New Password Form -->
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

        <!-- New Password Form -->
        <div class="space-y-6">
          <div class="text-center">
            <h1 class="text-3xl font-semibold text-gray-900 mb-2">New Password</h1>
            <p class="text-gray-600">Welcome back! Please enter the following details.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- New Password Field -->
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div class="relative">
                <input
                  id="newPassword"
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  placeholder="Enter your Password"
                  :class="[
                    'w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors',
                    newPasswordError ? 'border-red-500' : 'border-gray-300'
                  ]"
                  @blur="validateNewPassword"
                  @input="clearNewPasswordError"
                />
                <button
                  type="button"
                  @click="toggleNewPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      v-if="showNewPassword"
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                    />
                    <path
                      v-else
                      d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                    />
                  </svg>
                </button>
              </div>
              <p v-if="newPasswordError" class="text-red-500 text-sm mt-1">{{ newPasswordError }}</p>
            </div>

            <!-- Confirm New Password Field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Enter your Password"
                  :class="[
                    'w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors',
                    confirmPasswordError ? 'border-red-500' : 'border-gray-300'
                  ]"
                  @blur="validateConfirmPassword"
                  @input="clearConfirmPasswordError"
                />
                <button
                  type="button"
                  @click="toggleConfirmPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      v-if="showConfirmPassword"
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                    />
                    <path
                      v-else
                      d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                    />
                  </svg>
                </button>
              </div>
              <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">{{ confirmPasswordError }}</p>
            </div>

            <!-- Change Password Button -->
            <button
              type="submit"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Right Side - Brand Image -->
    <div class="w-1/2 bg-gray-50 flex items-center justify-center">
      <img
        src="/src/assets/images/login-image.png"
        alt="New Password"
        class="max-w-full max-h-full object-contain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const newPassword = ref("");
const confirmPassword = ref("");
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const newPasswordError = ref("");
const confirmPasswordError = ref("");
const router = useRouter();

const toggleNewPassword = () => {
  showNewPassword.value = !showNewPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const validateNewPassword = () => {
  if (!newPassword.value) {
    newPasswordError.value = "Password is required";
  } else if (newPassword.value.length < 6) {
    newPasswordError.value = "Password must be at least 6 characters";
  } else {
    newPasswordError.value = "";
  }
};

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    confirmPasswordError.value = "Please confirm your password";
  } else if (confirmPassword.value !== newPassword.value) {
    confirmPasswordError.value = "Passwords do not match";
  } else {
    confirmPasswordError.value = "";
  }
};

const clearNewPasswordError = () => {
  if (newPasswordError.value) {
    newPasswordError.value = "";
  }
  // Also revalidate confirm password if it exists
  if (confirmPassword.value) {
    validateConfirmPassword();
  }
};

const clearConfirmPasswordError = () => {
  if (confirmPasswordError.value) {
    confirmPasswordError.value = "";
  }
};

const handleSubmit = () => {
  validateNewPassword();
  validateConfirmPassword();
  
  if (!newPasswordError.value && !confirmPasswordError.value && newPassword.value && confirmPassword.value) {
    // For testing: accept any valid password
    console.log("Password changed successfully");
    alert("Password changed successfully! Redirecting to login...");
    router.push("/");
  }
};
</script>