<template>
  <div class="space-y-8">
    <!-- Event Hero -->
    <div class="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 sm:p-12">
      <div class="flex flex-col sm:flex-row items-start justify-between gap-6">
        <div>
          <h1 class="text-h1 font-bold mb-4">Summer Music Festival</h1>
          <div class="flex flex-wrap gap-4 text-lg">
            <span>📅 August 15-17, 2025</span>
            <span>📍 Central Park, New York</span>
          </div>
        </div>
        <button @click="toggleFavorite" :class="['btn-primary px-6 py-3 text-lg', isFavorite && 'ring-2 ring-offset-2 ring-primary']">
          {{ isFavorite ? '❤️ Saved' : '🤍 Save' }}
        </button>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="flex gap-4 border-b border-border overflow-x-auto">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="['px-4 py-3 font-medium transition-colors border-b-2', activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']">
        {{ tab }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="space-y-6">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'Overview'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div>
            <h3 class="text-h3 font-bold mb-3">About This Event</h3>
            <p class="text-lg leading-relaxed text-muted-foreground">
              Join us for the ultimate music festival featuring live performances from top artists across multiple genres. Three days of incredible music, food, and unforgettable memories.
            </p>
          </div>

          <div>
            <h3 class="text-h3 font-bold mb-3">What's Included</h3>
            <ul class="space-y-2 text-lg">
              <li>✓ Access to all stages and performances</li>
              <li>✓ Festival merchandise</li>
              <li>✓ Food and beverage discounts</li>
              <li>✓ VIP lounge access (Premium tier)</li>
            </ul>
          </div>
        </div>

        <div class="card h-fit">
          <h4 class="text-h4 font-bold mb-6">Get Tickets</h4>
          <div class="space-y-3 mb-6">
            <div class="border border-border rounded-lg p-4">
              <p class="text-sm font-medium mb-1">General Admission</p>
              <p class="text-2xl font-bold text-primary">$75</p>
              <p class="text-xs text-muted-foreground mt-1">per ticket</p>
            </div>
            <div class="border border-border rounded-lg p-4">
              <p class="text-sm font-medium mb-1">VIP Pass</p>
              <p class="text-2xl font-bold text-primary">$150</p>
              <p class="text-xs text-muted-foreground mt-1">per ticket</p>
            </div>
          </div>
          <router-link to="/dashboard/checkout/1" class="btn-primary w-full py-3">Buy Tickets</router-link>
        </div>
      </div>

      <!-- Schedule Tab -->
      <div v-if="activeTab === 'Schedule'" class="space-y-4">
        <div class="card">
          <h4 class="font-bold mb-4">Friday, August 15</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span>4:00 PM - Opening Ceremony</span>
              <span class="text-primary">Main Stage</span>
            </div>
            <div class="flex justify-between">
              <span>5:30 PM - Local Artists</span>
              <span class="text-primary">Stage 2</span>
            </div>
            <div class="flex justify-between">
              <span>8:00 PM - Headliner: The Weeknd</span>
              <span class="text-primary">Main Stage</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Location Tab -->
      <div v-if="activeTab === 'Location'" class="card">
        <p class="text-lg mb-4">Central Park, New York, NY 10024</p>
        <p class="text-muted-foreground">Easy access via subway. Parking available nearby. Wheelchair accessible.</p>
      </div>

      <!-- Organizer Tab -->
      <div v-if="activeTab === 'Organizer'" class="card">
        <div class="flex items-center gap-4">
          <div class="text-5xl">🏢</div>
          <div>
            <h4 class="text-h4 font-bold">EventCo Productions</h4>
            <p class="text-muted-foreground">Organizing amazing events since 2015</p>
            <button class="btn-outline mt-3 py-2">View Organizer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('Overview')
const isFavorite = ref(false)
const tabs = ['Overview', 'Schedule', 'Location', 'Organizer']

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>
