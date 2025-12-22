<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  // Clear previous error
  errorMessage.value = ''

  // Validate inputs
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password'
    return
  }

  try {
    const result = await authStore.login({
      email: email.value,
      password: password.value,
    })

    if (result.success) {
      // Redirect based on user role
      const role = result.user.role

      if (role === 'SuperAdmin') {
        router.push('/admin')
      } else if (role === 'Organizer') {
        router.push('/organizer')
      } else if (role === 'Attendee') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    } else {
      errorMessage.value = result.message || 'Login failed. Please check your credentials.'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.'
    console.error('Login error:', error)
  }
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center bg-background px-4 py-10 overflow-hidden">
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8 space-y-2">
        <span class="section-title justify-center">Vo Access</span>
        <h1 class="text-h2 font-bold">
          Welcome back
        </h1>
        <p class="text-muted-foreground">
          Sign in to your account
        </p>
      </div>

      <form class="card space-y-6" @submit.prevent="handleLogin">
        <!-- Error Message -->
        <div v-if="errorMessage"
          class="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {{ errorMessage }}
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Email Address</label>
          <input v-model="email" type="email" placeholder="you@example.com" class="input-field w-full"
            :disabled="authStore.loading" required>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input v-model="password" type="password" placeholder="••••••••" class="input-field w-full"
            :disabled="authStore.loading" required>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2">
            <input v-model="rememberMe" type="checkbox"
              class="rounded border-border text-primary focus:ring-0 focus:ring-offset-0" :disabled="authStore.loading">
            <span>Remember me</span>
          </label>
          <router-link to="/forgot-password" class="text-foreground hover:underline">
            Forgot password?
          </router-link>
        </div>

        <button type="submit" class="btn-primary w-full py-3" :disabled="authStore.loading">
          <span v-if="authStore.loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>

        <p class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <router-link to="/signup" class="text-foreground hover:underline font-medium">
            Sign up
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
