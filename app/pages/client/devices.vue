<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

type DeviceStatus = 'online' | 'offline'

interface Device {
  id: number
  name: string
  phone: string
  status: DeviceStatus
  lastActive: string
}

const devices = ref<Device[]>([
  {
    id: 1,
    name: 'Device Primary',
    phone: '+1 234 567 8901',
    status: 'online',
    lastActive: '2 mins ago'
  },
  {
    id: 2,
    name: 'Device Secondary',
    phone: '+1 234 567 8902',
    status: 'online',
    lastActive: '5 mins ago'
  },
  {
    id: 3,
    name: 'Device Backup',
    phone: '+1 234 567 8903',
    status: 'offline',
    lastActive: '2 hours ago'
  }
])
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Connected Devices</h2>
      <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
        + Add Device
      </button>
    </div>

    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-700 text-xs uppercase text-gray-300">
          <tr>
            <th class="px-6 py-4 text-left">Device</th>
            <th class="px-6 py-4 text-left">Phone</th>
            <th class="px-6 py-4 text-left">Status</th>
            <th class="px-6 py-4 text-left">Last Active</th>
            <th class="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-700">
          <tr
            v-for="device in devices"
            :key="device.id"
            class="hover:bg-gray-750 transition"
          >
            <td class="px-6 py-4 font-medium">{{ device.name }}</td>
            <td class="px-6 py-4 text-gray-300">{{ device.phone }}</td>

            <td class="px-6 py-4">
              <span
                class="flex items-center gap-2"
                :class="device.status === 'online'
                  ? 'text-green-500'
                  : 'text-gray-400'"
              >
                <span
                  class="w-2 h-2 rounded-full"
                  :class="device.status === 'online'
                    ? 'bg-green-500 animate-pulse'
                    : 'bg-gray-500'"
                />
                {{ device.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-gray-400">{{ device.lastActive }}</td>

            <td class="px-6 py-4 text-sm space-x-3">
              <button class="text-blue-400 hover:text-blue-300">View</button>
              <button class="text-yellow-400 hover:text-yellow-300">Reconnect</button>
              <button class="text-red-400 hover:text-red-300">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
