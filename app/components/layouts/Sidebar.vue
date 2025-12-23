<script setup lang="ts">
const { isOpen, close } = useSidebar()

const links = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Devices', path: '/dashboard/devices' },
  { name: 'Messages', path: '/dashboard/messages' },
  { name: 'Settings', path: '/dashboard/settings' },
]
</script>

<template>
  <!-- Overlay (mobile) -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-30 md:hidden"
    @click="close"
  />

  <!-- Sidebar -->
  <aside
    class="fixed md:relative z-40 w-64 h-full bg-gray-800 border-r border-gray-700
           transition-transform duration-300"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >
    <div class="p-6 border-b border-gray-700 font-bold">
      WhatsApp Gateway
      <p class="text-xs text-gray-400">Admin Panel</p>
    </div>

    <nav class="p-4 space-y-2">
      <NuxtLink
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        @click="close"
        class="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition"
        active-class="bg-gray-700 text-white"
      >
        {{ link.name }}
      </NuxtLink>
    </nav>
  </aside>
</template>