<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvas.value) return

  new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{
        label: 'Messages Sent',
        data: [120, 190, 300, 250, 220, 320, 400],
        borderColor: '#22c55e',
      }]
    }
  })
})
</script>

<template>
  <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <h3 class="mb-4 font-semibold">Messages Sent</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>
