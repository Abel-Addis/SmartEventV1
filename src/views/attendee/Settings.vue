<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Settings Sidebar -->
    <div class="lg:col-span-1">
      <div class="card sticky top-8 p-0 overflow-hidden">
        <nav class="flex lg:flex-col divide-y lg:divide-y divide-x lg:divide-x-0 divide-border">
          <button
            v-for="section in sections"
            :key="section"
            :class="['flex-1 lg:flex-none px-4 py-3 text-sm font-medium text-left transition-colors', activeSection === section ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground']"
            @click="activeSection = section"
          >
            {{ section }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Settings Content -->
    <div class="lg:col-span-3">
      <!-- Profile Section -->
      <div
        v-if="activeSection === 'Profile'"
        class="space-y-6"
      >
        <div class="card">
          <h3 class="text-h3 font-bold mb-6">
            Profile Information
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Full Name</label>
              <input
                v-model="profile.name"
                type="text"
                class="input-field w-full"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Email Address</label>
              <input
                v-model="profile.email"
                type="email"
                class="input-field w-full"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Phone Number</label>
              <input
                v-model="profile.phone"
                type="tel"
                class="input-field w-full"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Bio</label>
              <textarea
                v-model="profile.bio"
                rows="4"
                class="input-field w-full"
              />
            </div>
            <button class="btn-primary py-3 px-6">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Password Section -->
      <div
        v-if="activeSection === 'Password'"
        class="space-y-6"
      >
        <div class="card">
          <h3 class="text-h3 font-bold mb-6">
            Change Password
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Current Password</label>
              <input
                type="password"
                class="input-field w-full"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                class="input-field w-full"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                class="input-field w-full"
              >
            </div>
            <button class="btn-primary py-3 px-6">
              Update Password
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications Section -->
      <div
        v-if="activeSection === 'Notifications'"
        class="space-y-4"
      >
        <div class="card">
          <h3 class="text-h3 font-bold mb-6">
            Notification Preferences
          </h3>
          <div class="space-y-4">
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Event Recommendations</p>
                <p class="text-sm text-muted-foreground">Get personalized event suggestions</p>
              </div>
              <input
                v-model="settings.recommendations"
                type="checkbox"
                class="rounded"
              >
            </label>
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Event Reminders</p>
                <p class="text-sm text-muted-foreground">Reminders before your events</p>
              </div>
              <input
                v-model="settings.reminders"
                type="checkbox"
                class="rounded"
              >
            </label>
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Promotions & Offers</p>
                <p class="text-sm text-muted-foreground">Special deals and promotions</p>
              </div>
              <input
                v-model="settings.promotions"
                type="checkbox"
                class="rounded"
              >
            </label>
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Organizer Updates</p>
                <p class="text-sm text-muted-foreground">Updates from event organizers</p>
              </div>
              <input
                v-model="settings.updates"
                type="checkbox"
                class="rounded"
              >
            </label>
          </div>
        </div>
      </div>

      <!-- Preferences Section -->
      <div
        v-if="activeSection === 'Preferences'"
        class="space-y-4"
      >
        <div class="card">
          <h3 class="text-h3 font-bold mb-6">
            Event Preferences
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-3">Favorite Categories</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="cat in ['Music', 'Tech', 'Sports', 'Business', 'Arts', 'Food']"
                  :key="cat"
                  :class="['px-3 py-1.5 rounded-full text-sm font-medium transition-colors', preferences.categories.includes(cat) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80']"
                  @click="toggleCategory(cat)"
                >
                  {{ cat }}
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Preferred Location</label>
              <input
                v-model="preferences.location"
                type="text"
                placeholder="City or region"
                class="input-field w-full"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Privacy Section -->
      <div
        v-if="activeSection === 'Privacy'"
        class="space-y-4"
      >
        <div class="card">
          <h3 class="text-h3 font-bold mb-6">
            Privacy & Security
          </h3>
          <div class="space-y-4">
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Public Profile</p>
                <p class="text-sm text-muted-foreground">Allow others to view your profile</p>
              </div>
              <input
                v-model="privacy.publicProfile"
                type="checkbox"
                class="rounded"
              >
            </label>
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Show Attended Events</p>
                <p class="text-sm text-muted-foreground">Display events you've attended</p>
              </div>
              <input
                v-model="privacy.showAttended"
                type="checkbox"
                class="rounded"
              >
            </label>
            <label class="flex items-center justify-between cursor-pointer p-3 hover:bg-muted rounded-lg transition-colors">
              <div>
                <p class="font-medium">Two-Factor Authentication</p>
                <p class="text-sm text-muted-foreground">Extra security for your account</p>
              </div>
              <input
                v-model="privacy.twoFactor"
                type="checkbox"
                class="rounded"
              >
            </label>
          </div>
        </div>
      </div>

      <!-- Account Section -->
      <div
        v-if="activeSection === 'Account'"
        class="space-y-4"
      >
        <div class="card border-destructive/20">
          <h3 class="text-h3 font-bold mb-4 text-destructive">
            Danger Zone
          </h3>
          <div class="space-y-3">
            <button class="btn-outline text-destructive border-destructive/30 hover:bg-destructive/10 w-full py-3">
              Download Your Data
            </button>
            <button class="btn-outline text-destructive border-destructive/30 hover:bg-destructive/10 w-full py-3">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeSection = ref('Profile')
const sections = ['Profile', 'Password', 'Notifications', 'Preferences', 'Privacy', 'Account']

const profile = ref({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Event enthusiast and music lover',
})

const settings = ref({
  recommendations: true,
  reminders: true,
  promotions: false,
  updates: true,
})

const preferences = ref({
  categories: ['Music', 'Tech'],
  location: 'New York',
})

const privacy = ref({
  publicProfile: true,
  showAttended: true,
  twoFactor: false,
})

const toggleCategory = (cat) => {
  const index = preferences.value.categories.indexOf(cat)
  if (index > -1) {
    preferences.value.categories.splice(index, 1)
  } else {
    preferences.value.categories.push(cat)
  }
}
</script>
