<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-h2 font-bold">
        Admin Settings
      </h2>
      <p class="text-muted-foreground">
        Manage platform configuration and preferences
      </p>
    </div>

    <!-- Settings Tabs -->
    <div class="card flex border-b border-border overflow-x-auto">
      <button
        v-for="tab in settingsTabs"
        :key="tab.id"
        :class="['px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap', selectedTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']"
        @click="selectedTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Platform Settings -->
    <div
      v-if="selectedTab === 'platform'"
      class="space-y-6"
    >
      <div class="card p-6">
        <h3 class="text-h3 font-bold mb-4">
          Platform Configuration
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Platform Name</label>
            <input
              v-model="settings.platformName"
              type="text"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Support Email</label>
            <input
              v-model="settings.supportEmail"
              type="email"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Currency</label>
            <select
              v-model="settings.currency"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
              <option value="USD">
                USD ($)
              </option>
              <option value="EUR">
                EUR (€)
              </option>
              <option value="GBP">
                GBP (£)
              </option>
              <option value="ETB">
                ETB (Br)
              </option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <input
              id="maintenance"
              v-model="settings.maintenanceMode"
              type="checkbox"
              class="w-4 h-4"
            >
            <label
              for="maintenance"
              class="text-sm font-medium"
            >Maintenance Mode</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Settings -->
    <div
      v-if="selectedTab === 'payments'"
      class="space-y-6"
    >
      <div class="card p-6">
        <h3 class="text-h3 font-bold mb-4">
          Payment Gateway Settings
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Stripe API Key</label>
            <input
              v-model="settings.stripeKey"
              type="password"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Telebirr Merchant ID</label>
            <input
              v-model="settings.telebirrId"
              type="text"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">CBE Bank API Key</label>
            <input
              v-model="settings.cbeKey"
              type="password"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Security Settings -->
    <div
      v-if="selectedTab === 'security'"
      class="space-y-6"
    >
      <div class="card p-6">
        <h3 class="text-h3 font-bold mb-4">
          Security Configuration
        </h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span class="font-medium">Two-Factor Authentication</span>
            <input
              v-model="settings.twoFactor"
              type="checkbox"
              class="w-4 h-4"
            >
          </div>
          <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span class="font-medium">Session Timeout (minutes)</span>
            <input
              v-model="settings.sessionTimeout"
              type="number"
              class="w-20 px-2 py-1 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
          </div>
          <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span class="font-medium">IP Whitelist Enabled</span>
            <input
              v-model="settings.ipWhitelist"
              type="checkbox"
              class="w-4 h-4"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex gap-2">
      <button
        class="btn-primary px-6 py-2"
        @click="saveSettings"
      >
        Save Settings
      </button>
      <button
        class="btn-outline px-6 py-2"
        @click="resetSettings"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTab = ref('platform')

const settingsTabs = [
  { id: 'platform', label: 'Platform' },
  { id: 'payments', label: 'Payments' },
  { id: 'security', label: 'Security' },
]

const settings = ref({
  platformName: 'EventHub',
  supportEmail: 'support@eventhub.com',
  currency: 'ETB',
  maintenanceMode: false,
  stripeKey: '',
  telebirrId: '',
  cbeKey: '',
  twoFactor: true,
  sessionTimeout: 30,
  ipWhitelist: false,
})

const saveSettings = () => {
  console.log('[v0] Settings saved:', settings.value)
}

const resetSettings = () => {
  console.log('[v0] Settings reset')
}
</script>
