<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Settings Sidebar -->
    <div class="lg:col-span-1">
      <div class="card sticky top-8 p-0 overflow-hidden">
        <nav class="flex lg:flex-col divide-y lg:divide-y divide-x lg:divide-x-0 divide-border">
          <button v-for="section in sections" :key="section" @click="activeSection = section" :class="['flex-1 lg:flex-none px-4 py-3 text-sm font-medium text-left transition-colors', activeSection === section ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground']">
            {{ section }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Settings Content -->
    <div class="lg:col-span-3">
      <!-- Organization Profile -->
      <div v-if="activeSection === 'Organization'" class="space-y-6">
        <div class="card">
          <h3 class="text-h3 font-bold mb-6">Organization Profile</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Organization Name</label>
              <input v-model="orgProfile.name" type="text" class="input-field w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Description</label>
              <textarea v-model="orgProfile.description" rows="4" class="input-field w-full"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Website</label>
              <input v-model="orgProfile.website" type="url" class="input-field w-full" />
            </div>
            <button class="btn-primary py-3 px-6">Save Changes</button>
          </div>
        </div>
      </div>

      <!-- Payment Settings -->
      <div v-if="activeSection === 'Payment'" class="space-y-6">
        <div class="card">
          <h3 class="text-h3 font-bold mb-6">Payment Method</h3>
          <div class="space-y-4">
            <label class="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
              <input type="radio" class="mt-1" checked />
              <div>
                <p class="font-medium">Bank Transfer</p>
                <p class="text-sm text-muted-foreground">Direct deposit to your bank account</p>
              </div>
            </label>
            <label class="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
              <input type="radio" class="mt-1" />
              <div>
                <p class="font-medium">Mobile Money</p>
                <p class="text-sm text-muted-foreground">Receive payments via mobile wallet</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Notification Preferences -->
      <div v-if="activeSection === 'Notifications'" class="space-y-4">
        <div class="card">
          <h3 class="text-h3 font-bold mb-6">Notification Preferences</h3>
          <div class="space-y-4">
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Registration Alerts</p>
                <p class="text-sm text-muted-foreground">New attendee registrations</p>
              </div>
              <input v-model="settings.registrationAlerts" type="checkbox" class="rounded" />
            </label>
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Payment Notifications</p>
                <p class="text-sm text-muted-foreground">Payment receipts and payouts</p>
              </div>
              <input v-model="settings.paymentNotifications" type="checkbox" class="rounded" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeSection = ref('Organization')
const sections = ['Organization', 'Payment', 'Notifications']

const orgProfile = ref({
  name: 'EventCo Productions',
  description: 'Premier event organizing company',
  website: 'https://eventco.com',
})

const settings = ref({
  registrationAlerts: true,
  paymentNotifications: true,
})
</script>
