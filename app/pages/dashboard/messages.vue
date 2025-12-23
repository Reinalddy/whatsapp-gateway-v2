<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

interface Message {
  id: number
  to: string
  content: string
  status: 'sent' | 'failed' | 'pending'
  time: string
  device: string
}

const search = ref('')
const filterStatus = ref('all')

const messages = ref<Message[]>([
  {
    id: 1,
    to: '+1 555 123 4567',
    content: 'Hello! Your order #12345 has been confirmed...',
    status: 'sent',
    time: 'Dec 22, 2:45 PM',
    device: 'Device Primary'
  },
  {
    id: 2,
    to: '+1 555 456 7890',
    content: 'Your appointment is scheduled tomorrow at 10:00 AM',
    status: 'failed',
    time: 'Dec 22, 2:15 PM',
    device: 'Device Secondary'
  }
])

const filteredMessages = computed(() =>
  messages.value.filter(m => {
    const matchText =
      m.to.includes(search.value) ||
      m.content.toLowerCase().includes(search.value.toLowerCase())

    const matchStatus =
      filterStatus.value === 'all' || m.status === filterStatus.value

    return matchText && matchStatus
  })
)
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Message History</h2>

      <div class="flex gap-3">
        <input
          v-model="search"
          placeholder="Search messages..."
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
        />

        <select
          v-model="filterStatus"
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="sent">Sent</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-700 text-xs uppercase text-gray-300">
          <tr>
            <th class="px-6 py-4 text-left">Recipient</th>
            <th class="px-6 py-4 text-left">Message</th>
            <th class="px-6 py-4 text-left">Status</th>
            <th class="px-6 py-4 text-left">Time</th>
            <th class="px-6 py-4 text-left">Device</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-700">
          <tr v-for="msg in filteredMessages" :key="msg.id" class="hover:bg-gray-750">
            <td class="px-6 py-4 text-gray-300">{{ msg.to }}</td>

            <td class="px-6 py-4 max-w-xs truncate text-gray-400">
              {{ msg.content }}
            </td>

            <td class="px-6 py-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-500/20 text-green-500': msg.status === 'sent',
                  'bg-red-500/20 text-red-500': msg.status === 'failed',
                  'bg-yellow-500/20 text-yellow-500': msg.status === 'pending'
                }"
              >
                {{ msg.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-gray-400">{{ msg.time }}</td>
            <td class="px-6 py-4 text-gray-400">{{ msg.device }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
