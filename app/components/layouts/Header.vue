<script setup lang="ts">
const { toggle } = useSidebar()
</script>

<template>
  <header class="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
    <!-- Hamburger -->
    <button
      class="md:hidden text-gray-300 hover:text-white"
      @click="toggle"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div class="flex items-center gap-4 ml-auto">
      <button class="relative">
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        🔔
      </button>
      <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold">
        AD
      </div>
    </div>
  </header>
</template>
