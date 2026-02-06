<script setup lang="ts">
import { useDevices, type Device } from '~/composables/useDevices'
import { useSocket } from '~/composables/useSocket'

definePageMeta({
    layout: 'dashboard'
})

const { devices, loading, error, fetchDevices, createDevice, getDeviceQR, deleteDevice, reconnectDevice } = useDevices()
const { connect, disconnect, joinSession, leaveSession, onQR, onConnection, offQR, offConnection } = useSocket()

// Modal state
const showCreateModal = ref(false)
const showQRModal = ref(false)
const newSessionName = ref('')
const createLoading = ref(false)
const createError = ref('')

// QR state
const selectedDevice = ref<Device | null>(null)
const qrImage = ref<string | null>(null)
const qrLoading = ref(false)
const connectionStatus = ref<string>('pending')

// Fetch devices on mount
onMounted(async () => {
    await fetchDevices()
    connect()
})

onUnmounted(() => {
    disconnect()
})

// Create device
const handleCreateDevice = async () => {
    if (!newSessionName.value.trim()) return

    createLoading.value = true
    createError.value = ''

    try {
        const device = await createDevice(newSessionName.value.trim())
        showCreateModal.value = false
        newSessionName.value = ''

        // Open QR modal for the new device
        if (device) {
            openQRModal(device)
        }
    } catch (err: any) {
        createError.value = err?.data?.message || 'Failed to create device'
    } finally {
        createLoading.value = false
    }
}

// Open QR modal
const openQRModal = async (device: Device) => {
    selectedDevice.value = device
    showQRModal.value = true
    qrImage.value = null
    connectionStatus.value = device.liveStatus || 'pending'
    qrLoading.value = true

    // Join socket room for real-time updates
    joinSession(device.sessionName)

    // Setup socket listeners
    onQR((data) => {
        if (data.sessionName === device.sessionName) {
            // Generate QR image from string (socket sends raw string)
            fetchQRImage(device.id)
        }
    })

    onConnection((data) => {
        if (data.sessionName === device.sessionName) {
            connectionStatus.value = data.status
            if (data.status === 'connected') {
                qrImage.value = null
                fetchDevices() // Refresh device list
            }
        }
    })

    // Fetch initial QR
    await fetchQRImage(device.id)
}

const fetchQRImage = async (deviceId: number) => {
    qrLoading.value = true
    try {
        const data = await getDeviceQR(deviceId, 'image')
        if (data.isConnected) {
            connectionStatus.value = 'connected'
            qrImage.value = null
        } else {
            qrImage.value = data.qrImage
            connectionStatus.value = 'pending'
        }
    } catch (err) {
        console.error('Failed to fetch QR:', err)
    } finally {
        qrLoading.value = false
    }
}

// Close QR modal
const closeQRModal = () => {
    if (selectedDevice.value) {
        leaveSession(selectedDevice.value.sessionName)
    }
    offQR()
    offConnection()
    showQRModal.value = false
    selectedDevice.value = null
    qrImage.value = null
}

// Delete device
const handleDeleteDevice = async (device: Device) => {
    if (!confirm(`Are you sure you want to delete "${device.sessionName}"?`)) return
    await deleteDevice(device.id)
}

// Reconnect device
const handleReconnectDevice = async (device: Device) => {
    await reconnectDevice(device.id)
    openQRModal(device)
}

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Poll for QR updates (fallback for third-party without WebSocket)
let qrPollInterval: ReturnType<typeof setInterval> | null = null

watch(showQRModal, (isOpen) => {
    if (isOpen && selectedDevice.value && connectionStatus.value !== 'connected') {
        // Poll every 3 seconds
        qrPollInterval = setInterval(() => {
            if (selectedDevice.value && connectionStatus.value !== 'connected') {
                fetchQRImage(selectedDevice.value.id)
            }
        }, 3000)
    } else {
        if (qrPollInterval) {
            clearInterval(qrPollInterval)
            qrPollInterval = null
        }
    }
})

onUnmounted(() => {
    if (qrPollInterval) {
        clearInterval(qrPollInterval)
    }
})
</script>

<template>
    <div>
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h2 class="text-2xl font-bold">Connected Devices</h2>
                <p class="text-gray-400 text-sm mt-1">Manage your WhatsApp sessions</p>
            </div>
            <button @click="showCreateModal = true"
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium transition flex items-center gap-2">
                <span class="text-lg">+</span> Add Device
            </button>
        </div>

        <!-- Error -->
        <div v-if="error" class="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
            {{ error }}
        </div>

        <!-- Loading -->
        <div v-if="loading && devices.length === 0" class="text-center py-12">
            <div class="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p class="text-gray-400 mt-3">Loading devices...</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="devices.length === 0"
            class="text-center py-16 bg-gray-800 rounded-lg border border-gray-700">
            <div class="text-5xl mb-4">📱</div>
            <h3 class="text-xl font-semibold mb-2">No devices connected</h3>
            <p class="text-gray-400 mb-6">Add your first WhatsApp device to start sending messages</p>
            <button @click="showCreateModal = true"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition">
                Add Your First Device
            </button>
        </div>

        <!-- Devices table -->
        <div v-else class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-700 text-xs uppercase text-gray-300">
                    <tr>
                        <th class="px-6 py-4 text-left">Device</th>
                        <th class="px-6 py-4 text-left">Phone</th>
                        <th class="px-6 py-4 text-left">Status</th>
                        <th class="px-6 py-4 text-left">Created</th>
                        <th class="px-6 py-4 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-700">
                    <tr v-for="device in devices" :key="device.id" class="hover:bg-gray-750 transition">
                        <td class="px-6 py-4">
                            <div class="font-medium">{{ device.sessionName }}</div>
                        </td>
                        <td class="px-6 py-4 text-gray-300">
                            {{ device.phoneNumber || '—' }}
                        </td>

                        <td class="px-6 py-4">
                            <span class="flex items-center gap-2" :class="{
                                'text-green-500': device.isOnline,
                                'text-yellow-500': device.liveStatus === 'pending',
                                'text-gray-400': !device.isOnline && device.liveStatus !== 'pending'
                            }">
                                <span class="w-2 h-2 rounded-full" :class="{
                                    'bg-green-500 animate-pulse': device.isOnline,
                                    'bg-yellow-500 animate-pulse': device.liveStatus === 'pending',
                                    'bg-gray-500': !device.isOnline && device.liveStatus !== 'pending'
                                }" />
                                {{ device.isOnline ? 'Online' : device.liveStatus === 'pending' ? 'Pending' : 'Offline' }}
                            </span>
                        </td>

                        <td class="px-6 py-4 text-gray-400">{{ formatDate(device.createdAt) }}</td>

                        <td class="px-6 py-4 text-sm space-x-3">
                            <button v-if="!device.isOnline" @click="openQRModal(device)"
                                class="text-blue-400 hover:text-blue-300 transition">
                                Scan QR
                            </button>
                            <button @click="handleReconnectDevice(device)"
                                class="text-yellow-400 hover:text-yellow-300 transition">
                                Reconnect
                            </button>
                            <button @click="handleDeleteDevice(device)"
                                class="text-red-400 hover:text-red-300 transition">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Create Device Modal -->
        <Teleport to="body">
            <div v-if="showCreateModal"
                class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div class="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
                    <h3 class="text-xl font-bold mb-4">Add New Device</h3>

                    <form @submit.prevent="handleCreateDevice">
                        <div class="mb-4">
                            <label class="text-sm text-gray-400 block mb-2">Session Name</label>
                            <input v-model="newSessionName" type="text" placeholder="e.g., my-device"
                                class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                                required />
                            <p class="text-xs text-gray-500 mt-1">Letters, numbers, hyphens, and underscores only</p>
                        </div>

                        <div v-if="createError"
                            class="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded-lg">
                            {{ createError }}
                        </div>

                        <div class="flex gap-3">
                            <button type="button" @click="showCreateModal = false"
                                class="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                                Cancel
                            </button>
                            <button type="submit" :disabled="createLoading"
                                class="flex-1 px-4 py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-gray-900 font-semibold rounded-lg transition flex items-center justify-center gap-2">
                                <span v-if="createLoading"
                                    class="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                                {{ createLoading ? 'Creating...' : 'Create Device' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Teleport>

        <!-- QR Code Modal -->
        <Teleport to="body">
            <div v-if="showQRModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div class="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md text-center">
                    <h3 class="text-xl font-bold mb-2">Scan QR Code</h3>
                    <p class="text-gray-400 text-sm mb-6">
                        Open WhatsApp on your phone and scan this QR code
                    </p>

                    <!-- Connected state -->
                    <div v-if="connectionStatus === 'connected'" class="py-8">
                        <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-4xl">✓</span>
                        </div>
                        <h4 class="text-lg font-semibold text-green-500">Connected!</h4>
                        <p class="text-gray-400 text-sm mt-1">Device is now ready to send messages</p>
                    </div>

                    <!-- QR loading -->
                    <div v-else-if="qrLoading && !qrImage" class="py-12">
                        <div
                            class="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto">
                        </div>
                        <p class="text-gray-400 mt-4">Generating QR code...</p>
                    </div>

                    <!-- QR Image -->
                    <div v-else-if="qrImage" class="py-4">
                        <div class="bg-white p-4 rounded-xl inline-block">
                            <img :src="qrImage" alt="QR Code" class="w-64 h-64" />
                        </div>
                        <p class="text-gray-400 text-sm mt-4">
                            QR code expires in 60 seconds
                        </p>
                    </div>

                    <!-- No QR yet -->
                    <div v-else class="py-12">
                        <p class="text-gray-400">Waiting for QR code...</p>
                        <p class="text-gray-500 text-sm mt-2">This may take a few seconds</p>
                    </div>

                    <button @click="closeQRModal"
                        class="mt-6 px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition w-full">
                        Close
                    </button>
                </div>
            </div>
        </Teleport>
    </div>
</template>
