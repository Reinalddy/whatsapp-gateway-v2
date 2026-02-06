<script setup lang="ts">
definePageMeta({ layout: false })

const { register } = useAuth()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const phoneNumber = ref<Number>()
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''
  loading.value = true
  try {
    await register(name.value, email.value, password.value, Number(phoneNumber.value))
    router.push('/client/dashboard')
  } catch (err: any) {
    error.value = err?.data?.message || 'Registration failed'
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
          class="mx-auto w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-xl font-bold mb-4"
        >
          WA
        </div>
        <h1 class="text-2xl font-bold text-white">Create Account</h1>
        <p class="text-gray-400 text-sm mt-1">
          Register to start using the gateway
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Name -->
        <div>
          <label class="text-sm text-white">Full Name</label>
          <input
            v-model="name"
            placeholder="John Doe"
            class="mt-1 w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="text-sm text-gray-400">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="admin@mail.com"
            class="mt-1 w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
        </div>

        <!-- Phone Number -->
        <div>
          <label class="text-sm text-gray-400">Phone Number</label>
          <input
            v-model="phoneNumber"
            type="number"
            placeholder="6281234567892"
            class="mt-1 w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
                     focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
          class="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600
                 disabled:opacity-60 disabled:cursor-not-allowed
                 text-gray-900 font-semibold py-2.5 rounded-lg transition"
        >
          <span
            v-if="loading"
            class="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"
          />
          <span>{{ loading ? 'Creating account...' : 'Register' }}</span>
        </button>
      </form>

      <p class="text-center text-sm text-gray-400 mt-6">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-400 hover:underline">
          Login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
