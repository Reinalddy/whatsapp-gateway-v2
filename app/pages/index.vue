<script setup lang="ts">
definePageMeta({ layout: 'default' })

// Animated counter composable
const useAnimatedCounter = (target: number, duration: number = 2000) => {
  const count = ref(0)
  const isVisible = ref(false)
  
  const startAnimation = () => {
    if (isVisible.value) return
    isVisible.value = true
    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        count.value = target
        clearInterval(timer)
      } else {
        count.value = Math.floor(current)
      }
    }, stepDuration)
  }
  
  return { count, startAnimation }
}

const messagesCounter = useAnimatedCounter(1500000)
const usersCounter = useAnimatedCounter(5000)
const uptimeCounter = useAnimatedCounter(99)

// Features data
const features = [
  {
    icon: '📱',
    title: 'Multi-Device Support',
    description: 'Connect multiple WhatsApp accounts and manage them all from one dashboard.'
  },
  {
    icon: '🚀',
    title: 'Bulk Messaging',
    description: 'Send messages to thousands of contacts with just a few clicks.'
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Track message delivery, read rates, and engagement in real-time.'
  },
  {
    icon: '🔌',
    title: 'API Integration',
    description: 'Seamlessly integrate with your existing systems using our REST API.'
  },
  {
    icon: '⏰',
    title: 'Message Scheduling',
    description: 'Schedule messages for optimal delivery times automatically.'
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee.'
  }
]

// Steps data
const steps = [
  {
    number: '01',
    title: 'Connect Your Device',
    description: 'Scan QR code to link your WhatsApp account securely.'
  },
  {
    number: '02',
    title: 'Configure Settings',
    description: 'Set up your messaging preferences and templates.'
  },
  {
    number: '03',
    title: 'Start Messaging',
    description: 'Send messages, track analytics, and grow your business.'
  }
]

// Intersection observer for stats animation
onMounted(() => {
  const statsSection = document.getElementById('stats-section')
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          messagesCounter.startAnimation()
          usersCounter.startAnimation()
          uptimeCounter.startAnimation()
        }
      })
    }, { threshold: 0.5 })
    observer.observe(statsSection)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white overflow-hidden">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-green-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-50 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/25">
            WA
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            WA Gateway
          </span>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink 
            to="/login" 
            class="px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium"
          >
            Login
          </NuxtLink>
          <NuxtLink 
            to="/register" 
            class="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-gray-900 font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative z-10 px-6 pt-16 pb-24 md:pt-24 md:pb-32">
      <div class="max-w-7xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-8 backdrop-blur-sm">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          WhatsApp Business API Gateway
        </div>
        
        <!-- Main Heading -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span class="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Powerful WhatsApp
          </span>
          <br />
          <span class="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Messaging Platform
          </span>
        </h1>
        
        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Send bulk messages, automate workflows, and grow your business with our enterprise-grade WhatsApp Gateway solution.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink 
            to="/register"
            class="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-gray-900 font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 flex items-center gap-2"
          >
            Start Free Trial
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
          <NuxtLink 
            to="/login"
            class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm"
          >
            View Dashboard
          </NuxtLink>
        </div>

        <!-- Hero Image/Mockup -->
        <div class="mt-16 relative">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10"></div>
          <div class="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-4 md:p-8 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto">
            <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div class="text-green-400 text-2xl font-bold">2.5M+</div>
                  <div class="text-gray-400 text-sm">Messages Sent</div>
                </div>
                <div class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div class="text-emerald-400 text-2xl font-bold">99.9%</div>
                  <div class="text-gray-400 text-sm">Delivery Rate</div>
                </div>
                <div class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div class="text-teal-400 text-2xl font-bold">24/7</div>
                  <div class="text-gray-400 text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful features to supercharge your WhatsApp marketing and communication.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="group p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30 rounded-2xl backdrop-blur-sm hover:border-green-500/30 hover:bg-gray-800/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/5"
          >
            <div class="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">{{ feature.title }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="relative z-10 px-6 py-24">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Get started in minutes with our simple 3-step process.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Connection Line -->
          <div class="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-teal-500/50 -translate-y-1/2"></div>
          
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="relative group"
          >
            <div class="text-center p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/40 rounded-3xl backdrop-blur-sm hover:border-green-500/40 transition-all duration-500 hover:scale-105">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow">
                {{ step.number }}
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">{{ step.title }}</h3>
              <p class="text-gray-400">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section id="stats-section" class="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent via-green-950/20 to-transparent">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="p-8">
            <div class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              {{ messagesCounter.count.value.toLocaleString() }}+
            </div>
            <div class="text-gray-400 text-lg">Messages Delivered</div>
          </div>
          <div class="p-8">
            <div class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
              {{ usersCounter.count.value.toLocaleString() }}+
            </div>
            <div class="text-gray-400 text-lg">Active Users</div>
          </div>
          <div class="p-8">
            <div class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {{ uptimeCounter.count.value }}%
            </div>
            <div class="text-gray-400 text-lg">Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative z-10 px-6 py-24">
      <div class="max-w-4xl mx-auto">
        <div class="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-green-500/20">
          <!-- Decorative Elements -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div class="relative z-10">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p class="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using our WhatsApp Gateway to connect with customers worldwide.
            </p>
            <NuxtLink 
              to="/register"
              class="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Create Free Account
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 px-6 py-12 border-t border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
              WA
            </div>
            <span class="text-lg font-semibold text-gray-300">WA Gateway</span>
          </div>
          
          <div class="flex items-center gap-8 text-gray-400">
            <a href="#" class="hover:text-green-400 transition-colors">Privacy</a>
            <a href="#" class="hover:text-green-400 transition-colors">Terms</a>
            <a href="#" class="hover:text-green-400 transition-colors">Support</a>
          </div>
          
          <div class="text-gray-500 text-sm">
            © 2026 WA Gateway. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Smooth animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
