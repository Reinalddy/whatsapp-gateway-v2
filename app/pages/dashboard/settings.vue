<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const settings = ref({
  webhookUrl: '',
  retryFailed: true,
  rateLimit: 60
})
</script>

<template>
  <div class="max-w-2xl">
    <h2 class="text-2xl font-bold mb-6">Settings</h2>

    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
      <div>
        <label class="block text-sm text-gray-400 mb-1">Webhook URL</label>
        <input
          v-model="settings.webhookUrl"
          placeholder="https://example.com/webhook"
          class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
        />
      </div>

      <div class="flex items-center gap-3">
        <input type="checkbox" v-model="settings.retryFailed" />
        <label class="text-gray-300">Retry failed messages automatically</label>
      </div>

      <div>
        <label class="block text-sm text-gray-400 mb-1">Rate Limit (msg/min)</label>
        <input
          type="number"
          v-model="settings.rateLimit"
          class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
        />
      </div>

      <button class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
        Save Settings
      </button>
    </div>
  </div>
</template>
