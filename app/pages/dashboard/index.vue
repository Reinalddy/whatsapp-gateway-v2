<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

import StatsCard from '@/components/dashboard/StatsCard.vue'
import SentChart from '@/components/dashboard/SentChart.vue'
import FailedChart from '@/components/dashboard/FailedChart.vue'
import TotalMessagesChart from '@/components/dashboard/TotalMessagesChart.vue'
</script>

<template>
  <h2 class="text-2xl font-bold mb-6">Dashboard Overview</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatsCard title="Messages Sent" value="24,567" color="green" />
    <StatsCard title="Messages Failed" value="342" color="red" />
    <StatsCard title="Total Messages" value="5000" color="green" />
    <StatsCard title="Active Devices" value="8" color="blue" />
    <StatsCard title="Success Rate" value="98.6%" color="purple" />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <SentChart />
    <FailedChart />
    <TotalMessagesChart />
  </div>
</template>
