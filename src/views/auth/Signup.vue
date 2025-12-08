<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4 py-8">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-h2 font-bold mb-2">Create Your Account</h1>
        <p class="text-muted-foreground">Join EventHub to discover amazing events</p>
      </div>

      <form @submit.prevent="handleSignup" class="card space-y-6">
        <div>
          <label class="block text-sm font-medium mb-3">I am a...</label>
          <div class="grid grid-cols-2 gap-3">
            <button type="button" @click="role = 'attendee'" :class="['p-3 border rounded-lg font-medium transition-colors', role === 'attendee' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted']">
              Attendee
            </button>
            <button type="button" @click="role = 'organizer'" :class="['p-3 border rounded-lg font-medium transition-colors', role === 'organizer' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted']">
              Organizer
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Full Name</label>
          <input v-model="name" type="text" placeholder="John Doe" class="input-field w-full" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Email Address</label>
          <input v-model="email" type="email" placeholder="you@example.com" class="input-field w-full" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input v-model="password" type="password" placeholder="••••••••" class="input-field w-full" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Confirm Password</label>
          <input v-model="confirmPassword" type="password" placeholder="••••••••" class="input-field w-full" required />
        </div>

        <label class="flex items-start gap-2 text-sm">
          <input v-model="agreeTerms" type="checkbox" class="mt-1 rounded" required />
          <span>I agree to the Terms of Service and Privacy Policy</span>
        </label>

        <button type="submit" class="btn-primary w-full py-3">Create Account</button>

        <p class="text-center text-sm text-muted-foreground">
          Already have an account?
          <router-link to="/login" class="text-primary hover:underline font-medium">Sign in</router-link>
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
