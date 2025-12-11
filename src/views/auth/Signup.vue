<template>
  <div class="relative min-h-screen flex items-center justify-center bg-background px-4 py-10 overflow-hidden">
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8 space-y-2">
        <span class="section-title justify-center">Join Vo</span>
        <h1 class="text-h2 font-bold">
          Create your account
        </h1>
        <p class="text-muted-foreground">
          Discover and host amazing experiences
        </p>
      </div>

      <form class="card space-y-6" @submit.prevent="handleSignup">
        <!-- Error Message -->
        <div v-if="errorMessage"
          class="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {{ errorMessage }}
        </div>

        <!-- User Type Selection -->
        <div>
          <label class="block text-sm font-medium mb-3">I am a...</label>
          <div class="grid grid-cols-2 gap-3">
            <button type="button"
              :class="['p-3 rounded-xl font-medium transition-all border', userType === 'attendee' ? 'border-foreground bg-foreground text-background' : 'border-border hover:bg-secondary']"
              @click="userType = 'attendee'" :disabled="authStore.loading">
              Attendee
            </button>
            <button type="button"
              :class="['p-3 rounded-xl font-medium transition-all border', userType === 'organizer' ? 'border-foreground bg-foreground text-background' : 'border-border hover:bg-secondary']"
              @click="userType = 'organizer'" :disabled="authStore.loading">
              Organizer
            </button>
          </div>
        </div>

        <!-- Common Fields -->
        <div>
          <label class="block text-sm font-medium mb-2">Full Name</label>
          <input v-model="formData.fullName" type="text" placeholder="John Doe" class="input-field w-full"
            :disabled="authStore.loading" required>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Email Address</label>
          <input v-model="formData.email" type="email" placeholder="you@example.com" class="input-field w-full"
            :disabled="authStore.loading" required>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Phone Number</label>
          <input v-model="formData.phoneNumber" type="tel" placeholder="+1234567890" class="input-field w-full"
            :disabled="authStore.loading" required>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input v-model="formData.password" type="password" placeholder="••••••••" class="input-field w-full"
            :disabled="authStore.loading" required>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Confirm Password</label>
          <input v-model="confirmPassword" type="password" placeholder="••••••••" class="input-field w-full"
            :disabled="authStore.loading" required>
        </div>

        <!-- Organizer-specific Fields -->
        <template v-if="userType === 'organizer'">
          <div class="pt-4 border-t border-border">
            <h3 class="text-sm font-semibold mb-4">Business Information</h3>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Business Name</label>
                <input v-model="formData.businessName" type="text" placeholder="Your Company Name"
                  class="input-field w-full" :disabled="authStore.loading" required>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Business Email</label>
                <input v-model="formData.businessEmail" type="email" placeholder="business@company.com"
                  class="input-field w-full" :disabled="authStore.loading" required>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">KYC Document (Front)</label>
                <input type="file" accept="image/*" class="input-field w-full" :disabled="authStore.loading"
                  @change="handleFileChange($event, 'front')" required>
                <p class="text-xs text-muted-foreground mt-1">Upload front side of ID/Passport</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">KYC Document (Back)</label>
                <input type="file" accept="image/*" class="input-field w-full" :disabled="authStore.loading"
                  @change="handleFileChange($event, 'back')" required>
                <p class="text-xs text-muted-foreground mt-1">Upload back side of ID/Passport</p>
              </div>
            </div>
          </div>
        </template>

        <label class="flex items-start gap-2 text-sm">
          <input v-model="agreeTerms" type="checkbox"
            class="mt-1 rounded border-border text-primary focus:ring-0 focus:ring-offset-0"
            :disabled="authStore.loading" required>
          <span>I agree to the Terms of Service and Privacy Policy</span>
        </label>

        <button type="submit" class="btn-primary w-full py-3" :disabled="authStore.loading">
          <span v-if="authStore.loading">Creating Account...</span>
          <span v-else>Create Account</span>
        </button>

        <p class="text-center text-sm text-muted-foreground">
          Already have an account?
          <router-link to="/login" class="text-foreground hover:underline font-medium">
            Sign in
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const userType = ref('attendee')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const errorMessage = ref('')

const formData = reactive({
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  businessName: '',
  businessEmail: '',
})

const kycFiles = reactive({
  front: null,
  back: null,
})

const handleFileChange = (event, side) => {
  const file = event.target.files[0]
  if (file) {
    kycFiles[side] = file
  }
}

const handleSignup = async () => {
  // Clear previous error
  errorMessage.value = ''

  // Validate passwords match
  if (formData.password !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  // Validate terms agreement
  if (!agreeTerms.value) {
    errorMessage.value = 'Please agree to the Terms of Service'
    return
  }

  try {
    let result

    if (userType.value === 'attendee') {
      // Register as Attendee
      result = await authStore.registerAttendee({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      })
    } else {
      // Register as Organizer with file upload
      // Validate KYC files
      if (!kycFiles.front || !kycFiles.back) {
        errorMessage.value = 'Please upload both KYC documents'
        return
      }

      // Create FormData for file upload
      const formDataToSend = new FormData()
      formDataToSend.append('FullName', formData.fullName)
      formDataToSend.append('Email', formData.email)
      formDataToSend.append('PhoneNumber', formData.phoneNumber)
      formDataToSend.append('Password', formData.password)
      formDataToSend.append('BusinessName', formData.businessName)
      formDataToSend.append('BusinessEmail', formData.businessEmail)
      formDataToSend.append('KYCFrontImage', kycFiles.front)
      formDataToSend.append('KYCBackImage', kycFiles.back)

      result = await authStore.registerOrganizer(formDataToSend)
    }

    if (result.success) {
      // Redirect based on user role
      const role = result.user.role

      if (role === 'Admin') {
        router.push('/admin')
      } else if (role === 'Organizer') {
        router.push('/organizer')
      } else if (role === 'Attendee') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    } else {
      errorMessage.value = result.message || 'Registration failed. Please try again.'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.'
    console.error('Signup error:', error)
  }
}
</script>
