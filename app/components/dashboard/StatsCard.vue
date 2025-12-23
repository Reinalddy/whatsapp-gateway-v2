<script setup lang="ts">
defineProps<{
  title: string
  value: string
  color: 'green' | 'red' | 'blue' | 'purple'
}>()
</script>

<template>
  <div class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:-translate-y-1 transition">
    <p class="text-gray-400 text-sm">{{ title }}</p>
    <p :class="`text-3xl font-bold text-${color}-500`">
      {{ value }}
    </p>
  </div>
</template>
