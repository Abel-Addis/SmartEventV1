<template>
  <div class="relative min-h-screen flex items-center justify-center bg-background px-4 py-10 overflow-hidden">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(108,111,248,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_25%)]" />
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8 space-y-2">
        <span class="section-title justify-center">NerdSpace Access</span>
        <h1 class="text-h2 font-bold">
          Welcome back
        </h1>
        <p class="text-muted-foreground">
          Sign in to your account
        </p>
      </div>

      <form
        class="card space-y-6 glass"
        @submit.prevent="handleLogin"
      >
        <div>
          <label class="block text-sm font-medium mb-2">Email Address</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="input-field w-full"
            required
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="input-field w-full"
            required
          >
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2">
            <input
              v-model="rememberMe"
              type="checkbox"
              class="rounded border-border text-primary focus:ring-0 focus:ring-offset-0"
            >
            <span>Remember me</span>
          </label>
          <router-link
            to="/forgot-password"
            class="text-primary hover:underline"
          >
            Forgot password?
          </router-link>
        </div>

        <button
          type="submit"
          class="btn-primary w-full py-3"
        >
          Sign In
        </button>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="btn-outline py-2"
          >
            Google
          </button>
          <button
            type="button"
            class="btn-outline py-2"
          >
            GitHub
          </button>
        </div>

        <p class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <router-link
            to="/signup"
            class="text-primary hover:underline font-medium"
          >
            Sign up
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
  console.log('Login attempt:', email.value)
  router.push('/dashboard')
}
</script>
