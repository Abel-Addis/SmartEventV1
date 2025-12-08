<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="card bg-gradient-to-r from-primary/10 to-accent/10">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-h2 font-bold mb-2">Welcome back, EventCo!</h2>
          <p class="text-muted-foreground">Manage your events and track performance</p>
        </div>
        <router-link to="/organizer/create-event" class="btn-primary px-6 py-2 whitespace-nowrap">Create New Event</router-link>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <stat-card label="Active Events" value="3" icon="🎪" trend="25" />
      <stat-card label="Total Registrations" value="2,547" icon="👥" trend="18" />
      <stat-card label="Revenue" value="$12,450" icon="💰" trend="42" />
      <stat-card label="Avg. Rating" value="4.8" icon="⭐" trend="5" />
    </div>

    <!-- Events Overview -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-h3 font-bold">Your Events</h3>
        <router-link to="/organizer/events" class="text-primary hover:underline text-sm font-medium">View All</router-link>
      </div>
      <div class="space-y-3">
        <div v-for="event in events" :key="event.id" class="card hover:shadow-lg transition-shadow">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 class="text-h4 font-bold">{{ event.title }}</h4>
              <p class="text-muted-foreground text-sm">{{ event.date }} • {{ event.registrations }} registrations</p>
            </div>
            <div class="flex gap-2">
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', event.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400']">{{ event.status }}</span>
              <router-link :to="`/organizer/analytics`" class="btn-outline px-3 py-1 text-sm">Analytics</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <router-link to="/organizer/create-event" class="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer hover:bg-muted">
        <div class="text-4xl mb-3">➕</div>
        <h4 class="font-semibold">Create Event</h4>
        <p class="text-sm text-muted-foreground">Start a new event</p>
      </router-link>
      <router-link to="/organizer/checkin" class="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer hover:bg-muted">
        <div class="text-4xl mb-3">✓</div>
        <h4 class="font-semibold">Check-in</h4>
        <p class="text-sm text-muted-foreground">Scan attendees</p>
      </router-link>
      <router-link to="/organizer/finance" class="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer hover:bg-muted">
        <div class="text-4xl mb-3">💰</div>
        <h4 class="font-semibold">Finance</h4>
        <p class="text-sm text-muted-foreground">View earnings</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import StatCard from '@/components/StatCard.vue'

const events = [
  { id: 1, title: 'Summer Music Festival', date: 'Aug 15-17, 2025', registrations: 1250, status: 'active' },
  { id: 2, title: 'Tech Conference 2025', date: 'Sep 20-22, 2025', registrations: 856, status: 'active' },
  { id: 3, title: 'Jazz Night', date: 'Aug 25, 2025', registrations: 441, status: 'active' },
]
</script>
