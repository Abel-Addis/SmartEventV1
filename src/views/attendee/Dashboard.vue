<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="card relative overflow-hidden bg-gradient-to-r from-secondary/80 via-card to-card/80">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(108,111,248,0.2),transparent_35%)]" />
      <div class="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-2">
          <span class="section-title">For you</span>
          <h2 class="text-h2 font-bold">
            Welcome back, John!
          </h2>
          <p class="text-muted-foreground">
            Here's what's happening with your events
          </p>
        </div>
        <router-link
          to="/dashboard/events"
          class="btn-primary px-6 py-2 whitespace-nowrap"
        >
          Browse Events
        </router-link>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <stat-card
        label="Upcoming Events"
        value="5"
        icon="🎪"
        trend="12"
      />
      <stat-card
        label="Favorite Events"
        value="12"
        icon="❤️"
        trend="8"
      />
      <stat-card
        label="Total Spent"
        value="$245"
        icon="💰"
        trend="25"
      />
      <stat-card
        label="Events Attended"
        value="8"
        icon="✓"
        trend="0"
      />
    </div>

    <!-- Upcoming Events Section -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-h3 font-bold">
          Upcoming Events
        </h3>
        <router-link
          to="/dashboard/events"
          class="text-primary hover:underline text-sm font-medium"
        >
          View All
        </router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <event-card
          v-for="event in upcomingEvents"
          :key="event.id"
          v-bind="event"
        />
      </div>
    </div>

    <!-- Recommendations Section -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-h3 font-bold">
          Recommended For You
        </h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <event-card
          v-for="event in recommendedEvents"
          :key="event.id"
          v-bind="event"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import StatCard from '@/components/StatCard.vue'
import EventCard from '@/components/EventCard.vue'

const upcomingEvents = [
  { id: 1, title: 'Summer Music Festival', description: 'Live music from top artists', date: 'Aug 15, 2025', price: 'From $50' },
  { id: 2, title: 'Tech Conference 2025', description: 'Latest in web development', date: 'Sep 20, 2025', price: 'From $100' },
  { id: 3, title: 'Jazz Night', description: 'Smooth jazz performances', date: 'Aug 25, 2025', price: 'From $30' },
]

const recommendedEvents = [
  { id: 4, title: 'Food & Wine Expo', description: 'Culinary experiences', date: 'Sep 10, 2025', price: 'From $75' },
  { id: 5, title: 'AI Workshop', description: 'Hands-on AI training', date: 'Sep 5, 2025', price: 'From $150' },
  { id: 6, title: 'Art Exhibition', description: 'Contemporary art showcase', date: 'Aug 30, 2025', price: 'Free' },
]
</script>
