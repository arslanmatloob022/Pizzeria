<script setup lang="ts">
import { mediaData } from "@/lib/mediaData";

const props = defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left: Form Slot -->
    <div class="flex-1 flex items-center justify-center bg-white p-8">
      <div class="w-full max-w-md space-y-8">
        <!-- Header -->
        <div class="text-center md:text-left">
          <img
            :src="mediaData.logo"
            alt="Logo"
            class="mx-auto md:mx-0 mb-4 w-22 h-auto"
          />
          <h1 class="text-3xl font-bold mb-2">
            {{ props.title || "Welcome" }}
          </h1>
          <p v-if="subtitle" class="text-gray-600">
            {{ props.subtitle }}
          </p>
        </div>

        <!-- Slot for form -->
        <div class="mt-6">
          <slot />
        </div>
      </div>
    </div>

    <!-- Right: Image -->
    <div
      class="hidden md:flex flex-1 items-center justify-center bg-black max-h-screen"
    >
      <img
        :src="mediaData.loginImage"
        alt="Auth Illustration"
        class="max-w-full h-[95vh] object-cover"
      />
    </div>
  </div>
</template>
