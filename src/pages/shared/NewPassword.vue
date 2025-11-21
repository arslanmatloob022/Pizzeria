<script setup lang="ts">
import { ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const newPassword = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const error = ref("");
const errorColor = ref("text-red-600");

function handleChangePassword() {
  error.value = "";
  errorColor.value = "text-red-600";

  // Rule 1: At least 7 characters
  if (newPassword.value.length < 7) {
    error.value = "At least 7 characters";
    errorColor.value = "text-[#3FCE4E]";
    return;
  }

  // Rule 2: Must include 1 capital letter, 1 symbol, and 1 number
  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/;
  if (!strongPasswordRegex.test(newPassword.value)) {
    error.value = "Must add 1 capital letter, 1 symbol & 1 number";
    errorColor.value = "text-red-600";
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    errorColor.value = "text-red-600";
    return;
  }

  console.log("Password changed successfully:", newPassword.value);
  router.push("/login");
}
</script>

<template>
  <AuthLayout
    title="New Password"
    subtitle="Welcome back! Please enter the following details."
  >
    <form class="space-y-6" @submit.prevent="handleChangePassword">
      <!-- New Password -->
      <div class="relative">
        <Baseinput
          label="New Password"
          :type="showPassword ? 'text' : 'password'"
          rounded="md"
          placeholder="Enter New Password"
          v-model="newPassword"
          required
        />
        <button
          type="button"
          class="absolute right-3 top-10.5 text-gray-500 hover:text-gray-700"
          @click="showPassword = !showPassword"
        >
          <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
        </button>
      </div>

      <div class="relative">
        <Baseinput
          label="Confirm Password"
          :type="showConfirmPassword ? 'text' : 'password'"
          rounded="md"
          placeholder="Confirm New Password"
          v-model="confirmPassword"
          required
        />
        <button
          type="button"
          class="absolute right-3 top-10.5 text-gray-500 hover:text-gray-700"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <component :is="showConfirmPassword ? EyeOff : Eye" class="w-5 h-5" />
        </button>
      </div>

      <p v-if="error" :class="`${errorColor} text-sm py-1 rounded`">
        {{ error }}
      </p>

      <!-- Submit -->
      <BaseButton type="submit" class="w-full">Change Password</BaseButton>
    </form>
  </AuthLayout>
</template>
