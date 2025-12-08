<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4 py-8">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-h2 font-bold mb-2">Reset Your Password</h1>
        <p class="text-muted-foreground">Enter your email to receive password reset instructions</p>
      </div>

      <form v-if="!emailSent" @submit.prevent="handleSubmit" class="card space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Email Address</label>
          <input v-model="email" type="email" placeholder="you@example.com" class="input-field w-full" required />
        </div>

        <button type="submit" class="btn-primary w-full py-3">Send Reset Link</button>

        <router-link to="/login" class="block text-center text-primary hover:underline font-medium">Back to login</router-link>
      </form>

      <div v-else class="card space-y-6">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
            <span class="text-3xl">✓</span>
          </div>
          <h2 class="text-h4 font-semibold mb-2">Email Sent!</h2>
          <p class="text-muted-foreground">Check your email for password reset instructions.</p>
        </div>

        <button @click="emailSent = false" type="button" class="btn-outline w-full py-3">Send Another Email</button>

        <router-link to="/login" class="block text-center text-primary hover:underline font-medium">Back to login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const emailSent = ref(false)

const handleSubmit = () => {
  console.log('Reset password email sent to:', email.value)
  emailSent.value = true
}
</script>
