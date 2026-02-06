<script setup lang="ts">
const { toggle } = useSidebar()
const { user } = useAuth()
</script>

<template>
    <header class="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <!-- Hamburger -->
        <button class="md:hidden text-gray-300 hover:text-white" @click="toggle">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <!-- Breadcrumb / Page title -->
        <div class="hidden md:block">
            <h2 class="text-lg font-semibold text-white">Dashboard</h2>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button class="relative p-2 text-gray-400 hover:text-white transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- User -->
            <div class="flex items-center gap-3">
                <div class="hidden sm:block text-right">
                    <p class="text-sm font-medium text-white">{{ user?.name || 'User' }}</p>
                    <p class="text-xs text-gray-400">{{ user?.email }}</p>
                </div>
                <div
                    class="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center font-bold text-gray-900 text-sm">
                    {{ user?.name?.charAt(0)?.toUpperCase() || 'U' }}
                </div>
            </div>
        </div>
    </header>
</template>
