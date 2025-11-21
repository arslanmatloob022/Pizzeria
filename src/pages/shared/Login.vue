<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { Eye, EyeOff } from "lucide-vue-next";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const error = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = () => {
  const success = authStore.login(email.value, password.value);

  if (success) {
    const role = authStore.user?.role;
    router.push(role === "admin" ? "/dashboard/menu-management" : "/dashboard");
  } else {
    error.value = "Required";
  }
};

function handleForgotPassword() {
  router.push("/forgot-password");
}
</script>

<template>
  <AuthLayout
    title="Login"
    subtitle="Welcome back! Please enter your credentials."
  >
    <form class="space-y-6" @submit.prevent="handleLogin">
      <Baseinput
        required
        :error="error"
        label="Email"
        type="email"
        rounded="md"
        placeholder="Enter Your Email"
        v-model="email"
      />

      <div class="relative">
        <Baseinput
          label="Password"
          :error="error"
          required
          :type="showPassword ? 'text' : 'password'"
          rounded="md"
          placeholder="Enter Your Password"
          v-model="password"
          class="pr-10"
        />

        <button
          type="button"
          class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          @click="showPassword = !showPassword"
        >
          <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
        </button>
        <span
          @click="handleForgotPassword"
          class="flex justify-end mt-2 underline cursor-pointer"
          >Forgot Password?</span
        >
      </div>

      <!-- <div v-if="error" class="text-red-600 text-sm text-center md:text-left">
        {{ error }}
      </div> -->

      <BaseButton type="submit" class="w-full">Login</BaseButton>
    </form>
  </AuthLayout>
</template>
