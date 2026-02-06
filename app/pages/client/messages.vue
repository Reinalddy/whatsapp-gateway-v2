<script setup lang="ts">
import { useDevices, type Device } from '~/composables/useDevices'
import { useMessages } from '~/composables/useMessages'

definePageMeta({
    layout: 'dashboard'
})

const { devices, fetchDevices } = useDevices()
const { sendMessage, fileToBase64, loading, error } = useMessages()

// Form state
const selectedDeviceId = ref<number | null>(null)
const recipient = ref('')
const messageType = ref<'text' | 'image' | 'document'>('text')
const textMessage = ref('')
const caption = ref('')
const selectedFile = ref<File | null>(null)
const filePreview = ref<string | null>(null)

// Success state
const showSuccess = ref(false)
const lastMessageId = ref<string | null>(null)

// Message history (local only for demo)
const messageHistory = ref<Array<{
    id: string
    to: string
    type: string
    content: string
    status: 'sent' | 'failed'
    time: Date
    device: string
}>>([])

// Fetch devices on mount
onMounted(async () => {
    await fetchDevices()
    // Auto-select first online device
    const onlineDevice = devices.value.find(d => d.isOnline)
    if (onlineDevice) {
        selectedDeviceId.value = onlineDevice.id
    }
})

// Filter online devices
const onlineDevices = computed(() => devices.value.filter(d => d.isOnline))

// Get selected device
const selectedDevice = computed(() =>
    devices.value.find(d => d.id === selectedDeviceId.value)
)

// Handle file selection
const handleFileSelect = async (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (file) {
        selectedFile.value = file

        // Create preview for images
        if (messageType.value === 'image') {
            const reader = new FileReader()
            reader.onload = (e) => {
                filePreview.value = e.target?.result as string
            }
            reader.readAsDataURL(file)
        } else {
            filePreview.value = null
        }
    }
}

// Clear file
const clearFile = () => {
    selectedFile.value = null
    filePreview.value = null
}

// Reset form when message type changes
watch(messageType, () => {
    clearFile()
    caption.value = ''
    textMessage.value = ''
})

// Send message
const handleSendMessage = async () => {
    if (!selectedDeviceId.value || !recipient.value) return

    try {
        let payload: any = {
            deviceId: selectedDeviceId.value,
            to: recipient.value.replace(/\D/g, ''), // Remove non-digits
            type: messageType.value
        }

        if (messageType.value === 'text') {
            if (!textMessage.value.trim()) return
            payload.message = textMessage.value
        } else {
            if (!selectedFile.value) return
            const base64 = await fileToBase64(selectedFile.value)
            payload.mediaBase64 = base64

            if (messageType.value === 'image') {
                payload.caption = caption.value
            } else {
                payload.filename = selectedFile.value.name
                payload.mimetype = selectedFile.value.type
            }
        }

        const result = await sendMessage(payload)
        lastMessageId.value = result.messageId
        showSuccess.value = true

        // Add to history
        messageHistory.value.unshift({
            id: result.messageId,
            to: recipient.value,
            type: messageType.value,
            content: messageType.value === 'text' ? textMessage.value : selectedFile.value?.name || 'Media',
            status: 'sent',
            time: new Date(),
            device: selectedDevice.value?.sessionName || 'Unknown'
        })

        // Reset form
        textMessage.value = ''
        caption.value = ''
        clearFile()

        // Hide success after 3 seconds
        setTimeout(() => {
            showSuccess.value = false
        }, 3000)

    } catch (err: any) {
        // Add failed to history
        messageHistory.value.unshift({
            id: Date.now().toString(),
            to: recipient.value,
            type: messageType.value,
            content: messageType.value === 'text' ? textMessage.value : selectedFile.value?.name || 'Media',
            status: 'failed',
            time: new Date(),
            device: selectedDevice.value?.sessionName || 'Unknown'
        })
    }
}

// Format time
const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Send Message Form -->
        <div class="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 class="text-xl font-bold mb-6">Send Message</h2>

            <!-- No online devices warning -->
            <div v-if="onlineDevices.length === 0"
                class="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-lg mb-6">
                <p class="font-medium">No devices online</p>
                <p class="text-sm mt-1">Connect a device first to send messages</p>
                <NuxtLink to="/client/devices"
                    class="text-sm underline hover:text-yellow-300 mt-2 inline-block">
                    Go to Devices →
                </NuxtLink>
            </div>

            <form v-else @submit.prevent="handleSendMessage" class="space-y-5">
                <!-- Device Selection -->
                <div>
                    <label class="text-sm text-gray-400 block mb-2">Device</label>
                    <select v-model="selectedDeviceId"
                        class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white">
                        <option :value="null" disabled>Select a device</option>
                        <option v-for="device in onlineDevices" :key="device.id" :value="device.id">
                            {{ device.sessionName }} ({{ device.phoneNumber || 'No phone' }})
                        </option>
                    </select>
                </div>

                <!-- Recipient -->
                <div>
                    <label class="text-sm text-gray-400 block mb-2">Recipient Phone Number</label>
                    <input v-model="recipient" type="text" placeholder="e.g., 6281234567890"
                        class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white" />
                    <p class="text-xs text-gray-500 mt-1">Include country code without + or spaces</p>
                </div>

                <!-- Message Type -->
                <div>
                    <label class="text-sm text-gray-400 block mb-2">Message Type</label>
                    <div class="flex gap-2">
                        <button type="button" @click="messageType = 'text'" :class="[
                            'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition',
                            messageType === 'text'
                                ? 'bg-green-500 text-gray-900'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        ]">
                            📝 Text
                        </button>
                        <button type="button" @click="messageType = 'image'" :class="[
                            'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition',
                            messageType === 'image'
                                ? 'bg-green-500 text-gray-900'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        ]">
                            🖼️ Image
                        </button>
                        <button type="button" @click="messageType = 'document'" :class="[
                            'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition',
                            messageType === 'document'
                                ? 'bg-green-500 text-gray-900'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        ]">
                            📄 Document
                        </button>
                    </div>
                </div>

                <!-- Text Message -->
                <div v-if="messageType === 'text'">
                    <label class="text-sm text-gray-400 block mb-2">Message</label>
                    <textarea v-model="textMessage" rows="4" placeholder="Type your message..."
                        class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none" />
                </div>

                <!-- Image Upload -->
                <div v-if="messageType === 'image'">
                    <label class="text-sm text-gray-400 block mb-2">Image</label>
                    <div v-if="!selectedFile"
                        class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition cursor-pointer"
                        @click="($refs.fileInput as HTMLInputElement).click()">
                        <div class="text-4xl mb-2">🖼️</div>
                        <p class="text-gray-400">Click to select an image</p>
                        <p class="text-xs text-gray-500 mt-1">JPEG, PNG, GIF up to 10MB</p>
                    </div>
                    <div v-else class="relative">
                        <img :src="filePreview!" alt="Preview" class="w-full max-h-48 object-cover rounded-lg" />
                        <button type="button" @click="clearFile"
                            class="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full text-white">
                            ×
                        </button>
                    </div>
                    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect" />

                    <div class="mt-3">
                        <label class="text-sm text-gray-400 block mb-2">Caption (optional)</label>
                        <input v-model="caption" type="text" placeholder="Add a caption..."
                            class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white" />
                    </div>
                </div>

                <!-- Document Upload -->
                <div v-if="messageType === 'document'">
                    <label class="text-sm text-gray-400 block mb-2">Document</label>
                    <div v-if="!selectedFile"
                        class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition cursor-pointer"
                        @click="($refs.docInput as HTMLInputElement).click()">
                        <div class="text-4xl mb-2">📄</div>
                        <p class="text-gray-400">Click to select a document</p>
                        <p class="text-xs text-gray-500 mt-1">PDF, DOC, XLS, etc.</p>
                    </div>
                    <div v-else class="flex items-center gap-3 bg-gray-900 p-4 rounded-lg">
                        <span class="text-3xl">📄</span>
                        <div class="flex-1 min-w-0">
                            <p class="font-medium truncate">{{ selectedFile.name }}</p>
                            <p class="text-xs text-gray-500">{{ (selectedFile.size / 1024).toFixed(1) }} KB</p>
                        </div>
                        <button type="button" @click="clearFile"
                            class="text-red-400 hover:text-red-300">
                            Remove
                        </button>
                    </div>
                    <input ref="docInput" type="file" class="hidden" @change="handleFileSelect" />
                </div>

                <!-- Error -->
                <div v-if="error"
                    class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
                    {{ error }}
                </div>

                <!-- Success -->
                <div v-if="showSuccess"
                    class="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg">
                    ✓ Message sent successfully!
                </div>

                <!-- Submit -->
                <button type="submit" :disabled="loading || !selectedDeviceId || !recipient"
                    class="w-full px-4 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <span v-if="loading"
                        class="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    {{ loading ? 'Sending...' : 'Send Message' }}
                </button>
            </form>
        </div>

        <!-- Message History -->
        <div class="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 class="text-xl font-bold mb-6">Recent Messages</h2>

            <div v-if="messageHistory.length === 0" class="text-center py-12 text-gray-500">
                <div class="text-4xl mb-3">💬</div>
                <p>No messages sent yet</p>
            </div>

            <div v-else class="space-y-3 max-h-[500px] overflow-y-auto">
                <div v-for="msg in messageHistory" :key="msg.id"
                    class="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div class="flex items-start justify-between">
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="font-medium">{{ msg.to }}</span>
                                <span class="px-2 py-0.5 rounded text-xs" :class="{
                                    'bg-green-500/20 text-green-500': msg.status === 'sent',
                                    'bg-red-500/20 text-red-500': msg.status === 'failed'
                                }">
                                    {{ msg.status }}
                                </span>
                            </div>
                            <p class="text-gray-400 text-sm truncate">{{ msg.content }}</p>
                            <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <span>{{ msg.type }}</span>
                                <span>{{ msg.device }}</span>
                                <span>{{ formatTime(msg.time) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
