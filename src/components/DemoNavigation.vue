<template>
  <div class="fixed top-5 right-5 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg z-50 md:block hidden">
    <h2 class="text-sm font-medium text-gray-700 mb-3 text-center">Pizza Restaurant UI Demo</h2>
    <div class="flex gap-2">
      <router-link to="/" class="px-3 py-2 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors router-link-active:bg-blue-500">Login Screen</router-link>
      <router-link to="/dashboard" class="px-3 py-2 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors router-link-active:bg-blue-500">Dashboard</router-link>
    </div>
  </div>
</template>

