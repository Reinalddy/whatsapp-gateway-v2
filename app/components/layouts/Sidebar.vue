<script setup lang="ts">
const { isOpen, close } = useSidebar()
const { logout, user } = useAuth()

const links = [
    { name: 'Dashboard', path: '/client/dashboard', icon: '📊' },
    { name: 'Devices', path: '/client/devices', icon: '📱' },
    { name: 'Send Message', path: '/client/messages', icon: '💬' },
    { name: 'Settings', path: '/client/settings', icon: '⚙️' },
]

const handleLogout = () => {
    logout()
}
</script>

<template>
    <!-- Overlay (mobile) -->
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="close" />

    <!-- Sidebar -->
    <aside class="fixed md:relative z-40 w-64 h-full bg-gray-800 border-r border-gray-700
           transition-transform duration-300 flex flex-col"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'">

        <!-- Header -->
        <div class="p-6 border-b border-gray-700">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center font-bold">
                    WA
                </div>
                <div>
                    <h1 class="font-bold text-white">WhatsApp Gateway</h1>
                    <p class="text-xs text-gray-400">Dashboard</p>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1">
            <NuxtLink v-for="link in links" :key="link.path" :to="link.path" @click="close"
                class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition"
                active-class="bg-green-500/10 text-green-400 border-l-2 border-green-500">
                <span class="text-lg">{{ link.icon }}</span>
                {{ link.name }}
            </NuxtLink>
        </nav>

        <!-- User section -->
        <div class="p-4 border-t border-gray-700">
            <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold text-gray-900">
                    {{ user?.name?.charAt(0)?.toUpperCase() || 'U' }}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="font-medium truncate">{{ user?.name || 'User' }}</p>
                    <p class="text-xs text-gray-400 truncate">{{ user?.email }}</p>
                </div>
            </div>
            <button @click="handleLogout"
                class="w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition text-left">
                🚪 Logout
            </button>
        </div>
    </aside>
</template>