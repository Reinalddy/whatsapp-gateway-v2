<script setup lang="ts">
    
</script>

<template>
    <header class="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
        <button class="md:hidden text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>
        <div class="flex-1 md:flex-none"></div>
        <div class="flex items-center space-x-4">
            <button class="relative text-gray-400 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">
                AD
            </div>
        </div>
    </header>

    <!-- Content Area -->
    <main class="flex-1 overflow-y-auto p-6">
        <!-- Dashboard Section -->
        <div id="dashboard" class="section">
            <h2 class="text-2xl font-bold mb-6">Dashboard Overview</h2>
            
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="card bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Total Messages Sent</p>
                            <p class="text-3xl font-bold text-green-500">24,567</p>
                            <p class="text-xs text-gray-500 mt-2">↑ 12% from last month</p>
                        </div>
                        <div class="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="card bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Messages Failed</p>
                            <p class="text-3xl font-bold text-red-500">342</p>
                            <p class="text-xs text-gray-500 mt-2">↓ 3% from last month</p>
                        </div>
                        <div class="w-12 h-12 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="card bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Active Devices</p>
                            <p class="text-3xl font-bold text-blue-500">8</p>
                            <p class="text-xs text-gray-500 mt-2">2 offline</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="card bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Success Rate</p>
                            <p class="text-3xl font-bold text-purple-500">98.6%</p>
                            <p class="text-xs text-gray-500 mt-2">Last 30 days</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 class="text-lg font-semibold mb-4">Messages Sent (Last 7 Days)</h3>
                    <canvas id="sentChart"></canvas>
                </div>
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 class="text-lg font-semibold mb-4">Messages Failed (Last 7 Days)</h3>
                    <canvas id="failedChart"></canvas>
                </div>
            </div>
        </div>
    </main>
</template>