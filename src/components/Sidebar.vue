<template>
  <div class="bg-black text-white w-20 lg:w-24 flex flex-col items-center py-6 fixed left-0 top-0 h-full z-40">
    <!-- Logo -->
    <div class="mb-8">
      <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
        <svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="8" r="3"/>
          <circle cx="12" cy="16" r="2"/>
        </svg>
      </div>
    </div>

    <!-- Navigation Icons -->
    <nav class="flex flex-col space-y-6">
      <!-- Categories (Active) -->
      <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
        <svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>

      <!-- Pizza Icon -->
      <div class="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>

      <!-- Document Icon -->
      <div class="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
          <polyline points="14,2 14,8 20,8"/>
        </svg>
      </div>

      <!-- User Icon -->
      <div class="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    </nav>

    <!-- Logout Icon at Bottom -->
    <div class="mt-auto">
      <div class="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16,17 21,12 16,7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </div>
    </div>
  </div>
</template>