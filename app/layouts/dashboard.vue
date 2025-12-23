<script setup lang="ts">
import Sidebar from '~/components/layouts/Sidebar.vue'
import Header from '~/components/layouts/Header.vue'
</script>

<template>
  <div class="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>