<script setup lang="ts">
const email = ref("");
const router = useRouter();
const error = ref("");

function handleSendOTP() {
  if (!email.value) {
    error.value = "Required";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = "Please enter a valid email address";
    return;
  }

  error.value = "";

  console.log(`Sending OTP to ${email.value}`);
  router.push(`/otp-verification/${encodeURIComponent(email.value)}`);
}
</script>

<template>
  <AuthLayout
    title="Forgot Password"
    subtitle="Please fill in the information requested below."
  >
    <form class="space-y-6" @submit.prevent="handleSendOTP">
      <Baseinput
        label="Email"
        type="email"
        rounded="md"
        placeholder="Enter Your Email"
        v-model="email"
        :required="true"
        :error="error"
      />

      <BaseButton type="submit" class="w-full">Send OTP</BaseButton>
    </form>
  </AuthLayout>
</template>
