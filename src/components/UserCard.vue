<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { ChevronDown } from "lucide-vue-next";

const userSession = useAuthStore();
const router = useRouter();
const user = useAuthStore();
function handleNavigate() {
  if (user.user!!.role === "superadmin") {
    router.push("/super-admin-profile");
  }
}
</script>

<template>
  <div
    class="bg-white px-3 py-2 cursor-pointer rounded-2xl shadow flex items-center gap-4"
  >
    <div @click="handleNavigate">
      <img
        :src="userSession.user?.image"
        class="rounded-lg w-12 h-12 object-cover"
        alt="userimage"
      />
    </div>

    <div class="hidden md:block">
      <h3 class="font-medium">{{ userSession.user?.name }}</h3>
      <span class="text-gray-500 text-sm">{{ userSession.user?.role }}</span>
    </div>

    <div class="hidden md:block">
      <ChevronDown />
    </div>
  </div>
</template>
