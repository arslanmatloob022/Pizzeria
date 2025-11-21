<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const email = decodeURIComponent(route.params.email as string);

const otp = ref<string[]>(["", "", "", ""]);
const error = ref("");
const countdown = ref<number | null>(null);
let timer: ReturnType<typeof setInterval> | null = null;

function handleInput(index: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value.replace(/\D/g, "").slice(-1);
  otp.value[index] = value;

  if (value && index < 3) {
    const next = document.getElementById(`otp-${index + 1}`);
    next && (next as HTMLInputElement).focus();
  }
}

function handleBackspace(index: number, event: KeyboardEvent) {
  if (event.key === "Backspace" && !otp.value[index] && index > 0) {
    const prev = document.getElementById(`otp-${index - 1}`);
    prev && (prev as HTMLInputElement).focus();
  }
}

function startCountdown() {
  countdown.value = 60;
  error.value = `Invalid OTP, resend in ${countdown.value}s`;

  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (countdown.value && countdown.value > 1) {
      countdown.value--;
      error.value = `Invalid OTP, resend in ${countdown.value}s`;
    } else {
      clearInterval(timer!);
      timer = null;
      countdown.value = null;
      error.value = "";
    }
  }, 1000);
}

function handleVerifyOTP() {
  const code = otp.value.join("");

  if (!code) {
    error.value = "OTP is required";
    return;
  }

  if (code !== "1234") {
    startCountdown();
    return;
  }

  // success
  if (timer) clearInterval(timer);
  error.value = "";
  router.push(`/reset-password/${encodeURIComponent(email)}`);
}

function handleResend() {
  console.log(`Resending OTP to ${email}`);
  // Reset countdown (optional)
  if (timer) clearInterval(timer);
  countdown.value = null;
  error.value = "";
}
</script>

<template>
  <AuthLayout
    title="OTP Verification"
    subtitle="Please fill in the information requested below."
  >
    <form class="space-y-6" @submit.prevent="handleVerifyOTP">
      <div class="flex gap-4">
        <input
          v-for="(_, index) in otp"
          :key="index"
          :id="`otp-${index}`"
          v-model="otp[index]"
          @input="handleInput(index, $event)"
          @keydown="handleBackspace(index, $event)"
          maxlength="1"
          :class="error ? 'bg-red/10 border border-red' : 'bg-white'"
          type="text"
          class="w-14 h-14 text-center text-2xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <p v-if="error" class="text-red-600 text-sm mt-1 py-1 rounded">
        {{ error }}
      </p>

      <div class="space-y-4 mt-6">
        <BaseButton
          type="submit"
          class="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Verify OTP
        </BaseButton>

        <BaseButton
          type="button"
          variant="secondary"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
          :disabled="!!countdown"
          @click="handleResend"
        >
          {{ countdown ? `Resend in ${countdown}s` : "Resend OTP" }}
        </BaseButton>
      </div>
    </form>
  </AuthLayout>
</template>
