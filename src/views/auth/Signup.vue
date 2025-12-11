<template>
  <div class="relative min-h-screen flex items-center justify-center bg-background px-4 py-10 overflow-hidden">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(108,111,248,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_25%)]" />
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8 space-y-2">
        <span class="section-title justify-center">Join NerdSpace</span>
        <h1 class="text-h2 font-bold">
          Create your account
        </h1>
        <p class="text-muted-foreground">
          Discover and host amazing experiences
        </p>
      </div>

      <form
        class="card space-y-6 glass"
        @submit.prevent="handleSignup"
      >
        <div>
          <label class="block text-sm font-medium mb-3">I am a...</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              :class="['p-3 rounded-xl font-semibold transition-all border', role === 'attendee' ? 'border-accent bg-accent/10 text-accent-foreground shadow-[0_0_0_6px_var(--glow-1)]' : 'border-border hover:border-accent hover:bg-sidebar-accent']"
              @click="role = 'attendee'"
            >
              Attendee
            </button>
            <button
              type="button"
              :class="['p-3 rounded-xl font-semibold transition-all border', role === 'organizer' ? 'border-accent bg-accent/10 text-accent-foreground shadow-[0_0_0_6px_var(--glow-1)]' : 'border-border hover:border-accent hover:bg-sidebar-accent']"
              @click="role = 'organizer'"
            >
              Organizer
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Full Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="John Doe"
            class="input-field w-full"
            required
          >
        </div>

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

        <div>
          <label class="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            class="input-field w-full"
            required
          >
        </div>

        <label class="flex items-start gap-2 text-sm">
          <input
            v-model="agreeTerms"
            type="checkbox"
            class="mt-1 rounded border-border text-primary focus:ring-0 focus:ring-offset-0"
            required
          >
          <span>I agree to the Terms of Service and Privacy Policy</span>
        </label>

        <button
          type="submit"
          class="btn-primary w-full py-3"
        >
          Create Account
        </button>

        <p class="text-center text-sm text-muted-foreground">
          Already have an account?
          <router-link
            to="/login"
            class="text-primary hover:underline font-medium"
          >
            Sign in
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<!-- eslint-disable-next-line vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const role = ref('attendee')
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)

const handleSignup = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  console.log('Signup attempt:', { role: role.value, email: email.value })
  router.push('/verify-email')
}
</script>
