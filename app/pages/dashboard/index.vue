<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

import StatsCard from '@/components/dashboard/StatsCard.vue'
import SentChart from '@/components/dashboard/SentChart.vue'
import FailedChart from '@/components/dashboard/FailedChart.vue'
</script>

<template>
  <h2 class="text-2xl font-bold mb-6">Dashboard Overview</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatsCard title="Total Messages" value="24,567" color="green" />
    <StatsCard title="Failed" value="342" color="red" />
    <StatsCard title="Active Devices" value="8" color="blue" />
    <StatsCard title="Success Rate" value="98.6%" color="purple" />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <SentChart />
    <FailedChart />
  </div>
</template>
