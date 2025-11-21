<script setup lang="ts">
import { LockIcon, UserCircle } from "lucide-vue-next";
import { useAuthStore } from "@/store/auth";
import { useNotifyStore } from "@/store/notify";

const authStore = useAuthStore();
const notifyStore = useNotifyStore();

const tabs = ref([
  {
    id: 1,
    title: "Personal Information",
    value: "personalInfo",
    icon: UserCircle,
  },
  { id: 2, title: "Change Password", value: "password", icon: LockIcon },
]);
const activeTab = ref("personalInfo");

const name = ref(authStore.user?.name || "");
const email = ref(authStore.user?.email || "");
const currentpass = ref("");
const newPass = ref("");
const confirmnewPass = ref("");

function handleTabChange(val: string) {
  activeTab.value = val;
}

function handleSaveProfile() {
  const success = authStore.updateProfile(name.value, email.value);
  if (success) {
    notifyStore.notify.success("Profile updated successfully!");
  } else {
    notifyStore.notify.error("Failed to update profile");
  }
}

function handleChangePassword() {
  if (newPass.value !== confirmnewPass.value) {
    notifyStore.notify.error("Passwords do not match");
    return;
  }
  const success = authStore.updatePassword(currentpass.value, newPass.value);
  if (success) {
    notifyStore.notify.success("Password changed successfully!");
    currentpass.value = "";
    newPass.value = "";
    confirmnewPass.value = "";
  } else {
    notifyStore.notify.error("Current password is incorrect");
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-3 lg:p-6">
    <Tabs :tabs="tabs" :active-tab="activeTab" @update-tab="handleTabChange" />
    <Notification class="mt-5" />
    <section v-if="activeTab === 'personalInfo'" class="mt-10 space-y-10">
      <div class="flex flex-col md:flex-row items-stretch lg:gap-20 gap-3">
        <Baseinput
          v-model="name"
          label="Name"
          placeholder="John Doe"
          type="text"
          rounded="md"
        />
        <Baseinput
          v-model="email"
          label="Email"
          placeholder="Enter Email"
          type="email"
          rounded="md"
        />
      </div>
      <div class="flex justify-end">
        <BaseButton @click="handleSaveProfile" class="w-full lg:w-72" size="lg"
          >Save Changes</BaseButton
        >
      </div>
    </section>

    <section v-if="activeTab === 'password'" class="mt-10 space-y-10">
      <div class="flex flex-col md:flex-row items-stretch lg:gap-20 gap-3">
        <Baseinput
          v-model="currentpass"
          label="Current Password"
          placeholder="Enter Current password"
          type="password"
          rounded="md"
        />
        <Baseinput
          v-model="newPass"
          label="New Password"
          placeholder="Enter new password"
          type="password"
          rounded="md"
        />
        <Baseinput
          v-model="confirmnewPass"
          label="Confirm New Password"
          placeholder="Enter new password"
          type="password"
          rounded="md"
        />
      </div>
      <div class="flex justify-end">
        <BaseButton
          @click="handleChangePassword"
          class="w-full lg:w-72"
          size="lg"
          >Save Changes</BaseButton
        >
      </div>
    </section>
  </div>
</template>
