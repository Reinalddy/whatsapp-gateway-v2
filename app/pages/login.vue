<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/client/dashboard')
  } catch (err: any) {
    error.value = err?.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
    <div
      class="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-xl"
    >
      <!-- Header -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center text-xl font-bold mb-4"
        >
          WA
        </div>
        <h1 class="text-2xl font-bold text-white">Welcome Back</h1>
        <p class="text-gray-400 text-sm mt-1">
          Login to your WhatsApp Gateway
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="text-sm text-gray-400">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="admin@mail.com"
            class="mt-1 w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm text-gray-400">Password</label>
          <div class="relative mt-1">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-3 text-sm text-gray-400 hover:text-gray-200"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Button -->
        <button
          :disabled="loading"
          class="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600
                 disabled:opacity-60 disabled:cursor-not-allowed
                 text-gray-900 font-semibold py-2.5 rounded-lg transition"
        >
          <span
            v-if="loading"
            class="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"
          />
          <span>{{ loading ? 'Signing in...' : 'Login' }}</span>
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-400 mt-6">
        Don’t have an account?
        <NuxtLink to="/register" class="text-green-400 hover:underline">
          Register
        </NuxtLink>
      </p>
    </div>
  </div>
</template>