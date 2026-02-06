<script setup lang="ts">
import { useDevices } from '~/composables/useDevices'

definePageMeta({
    layout: 'dashboard'
})

const { devices, fetchDevices } = useDevices()
const { user } = useAuth()

// Stats
const onlineDevices = computed(() => devices.value.filter(d => d.isOnline).length)
const pendingDevices = computed(() => devices.value.filter(d => d.liveStatus === 'pending').length)
const totalDevices = computed(() => devices.value.length)

onMounted(async () => {
    await fetchDevices()
})
</script>

<template>
    <div>
        <!-- Welcome -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold">Welcome back, {{ user?.name || 'User' }}! 👋</h1>
            <p class="text-gray-400 mt-1">Here's your WhatsApp Gateway overview</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Online Devices -->
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 text-sm">Online Devices</p>
                        <p class="text-3xl font-bold text-green-500 mt-1">{{ onlineDevices }}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl">
                        📱
                    </div>
                </div>
                <div class="mt-4 text-xs text-gray-500">
                    <span class="text-green-400">{{ onlineDevices }}</span> of {{ totalDevices }} devices online
                </div>
            </div>

            <!-- Pending Devices -->
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 text-sm">Pending Scan</p>
                        <p class="text-3xl font-bold text-yellow-500 mt-1">{{ pendingDevices }}</p>
                    </div>
                    <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl">
                        ⏳
                    </div>
                </div>
                <div class="mt-4 text-xs text-gray-500">
                    Waiting for QR scan
                </div>
            </div>

            <!-- Total Devices -->
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 text-sm">Total Devices</p>
                        <p class="text-3xl font-bold text-blue-400 mt-1">{{ totalDevices }}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl">
                        📊
                    </div>
                </div>
                <div class="mt-4 text-xs text-gray-500">
                    All registered devices
                </div>
            </div>

            <!-- API Status -->
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 text-sm">API Status</p>
                        <p class="text-lg font-bold text-green-500 mt-1 flex items-center gap-2">
                            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Operational
                        </p>
                    </div>
                    <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl">
                        ⚡
                    </div>
                </div>
                <div class="mt-4 text-xs text-gray-500">
                    All systems running
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Devices -->
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold">Your Devices</h3>
                    <NuxtLink to="/client/devices" class="text-sm text-green-400 hover:underline">
                        View all →
                    </NuxtLink>
                </div>

                <div v-if="devices.length === 0" class="text-center py-8 text-gray-500">
                    <p>No devices yet</p>
                    <NuxtLink to="/client/devices"
                        class="inline-block mt-2 text-green-400 hover:underline text-sm">
                        Add your first device
                    </NuxtLink>
                </div>

                <div v-else class="space-y-3">
                    <div v-for="device in devices.slice(0, 4)" :key="device.id"
                        class="flex items-center justify-between bg-gray-900 rounded-lg p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="{
                                'bg-green-500/20 text-green-400': device.isOnline,
                                'bg-yellow-500/20 text-yellow-400': device.liveStatus === 'pending',
                                'bg-gray-700 text-gray-400': !device.isOnline && device.liveStatus !== 'pending'
                            }">
                                📱
                            </div>
                            <div>
                                <p class="font-medium">{{ device.sessionName }}</p>
                                <p class="text-xs text-gray-500">{{ device.phoneNumber || 'No phone' }}</p>
                            </div>
                        </div>
                        <span class="flex items-center gap-1.5 text-sm" :class="{
                            'text-green-400': device.isOnline,
                            'text-yellow-400': device.liveStatus === 'pending',
                            'text-gray-500': !device.isOnline && device.liveStatus !== 'pending'
                        }">
                            <span class="w-2 h-2 rounded-full" :class="{
                                'bg-green-500': device.isOnline,
                                'bg-yellow-500 animate-pulse': device.liveStatus === 'pending',
                                'bg-gray-500': !device.isOnline && device.liveStatus !== 'pending'
                            }"></span>
                            {{ device.isOnline ? 'Online' : device.liveStatus === 'pending' ? 'Pending' : 'Offline' }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Quick Send -->
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold">Quick Actions</h3>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <NuxtLink to="/client/devices"
                        class="bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 text-center transition group">
                        <div class="text-3xl mb-2 group-hover:scale-110 transition">📱</div>
                        <p class="font-medium">Add Device</p>
                        <p class="text-xs text-gray-500 mt-1">Connect WhatsApp</p>
                    </NuxtLink>

                    <NuxtLink to="/client/messages"
                        class="bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 text-center transition group">
                        <div class="text-3xl mb-2 group-hover:scale-110 transition">💬</div>
                        <p class="font-medium">Send Message</p>
                        <p class="text-xs text-gray-500 mt-1">Text, Image, Doc</p>
                    </NuxtLink>

                    <NuxtLink to="/client/settings"
                        class="bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 text-center transition group">
                        <div class="text-3xl mb-2 group-hover:scale-110 transition">⚙️</div>
                        <p class="font-medium">Settings</p>
                        <p class="text-xs text-gray-500 mt-1">Configure API</p>
                    </NuxtLink>

                    <a href="https://docs.example.com" target="_blank"
                        class="bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 text-center transition group">
                        <div class="text-3xl mb-2 group-hover:scale-110 transition">📚</div>
                        <p class="font-medium">API Docs</p>
                        <p class="text-xs text-gray-500 mt-1">Integration guide</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
