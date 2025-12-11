<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="card">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="section-title">Organizer Dashboard</span>
          <h2 class="text-h2 mt-1">
            Welcome back, EventCo!
          </h2>
          <p class="text-muted-foreground mt-1">
            Manage your events and track performance
          </p>
        </div>
        <router-link to="/organizer/create-event" class="btn-primary px-5 py-2.5 whitespace-nowrap">
          + Create Event
        </router-link>
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
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-h3">
          Your Events
        </h3>
        <router-link to="/organizer/events" class="text-sm font-medium text-primary hover:underline">
          View All
        </router-link>
      </div>
      <div class="space-y-3">
        <div v-for="event in events" :key="event.id" class="card hover:shadow-md transition-shadow">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 class="font-semibold text-foreground">
                {{ event.title }}
              </h4>
              <p class="text-sm text-muted-foreground mt-0.5">
                {{ event.date }} • {{ event.registrations }} registrations
              </p>
            </div>
            <div class="flex gap-2">
              <span
                :class="['px-3 py-1 rounded-lg text-xs font-medium border', event.status === 'active' ? 'bg-foreground text-background border-foreground' : 'bg-secondary text-foreground border-border']">{{
                  event.status }}</span>
              <router-link :to="`/organizer/analytics`" class="btn-outline px-3 py-1.5 text-xs">
                Analytics
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <router-link to="/organizer/create-event"
        class="card hover:shadow-md transition-shadow text-center p-6 cursor-pointer hover:border-primary/50">
        <div class="text-3xl mb-3">➕</div>
        <h4 class="font-semibold text-foreground mb-1">Create Event</h4>
        <p class="text-xs text-muted-foreground">Start a new event</p>
      </router-link>
      <router-link to="/organizer/analytics"
        class="card hover:shadow-md transition-shadow text-center p-6 cursor-pointer hover:border-primary/50">
        <div class="text-3xl mb-3">📊</div>
        <h4 class="font-semibold text-foreground mb-1">View Analytics</h4>
        <p class="text-xs text-muted-foreground">Track performance</p>
      </router-link>
      <router-link to="/organizer/finance"
        class="card hover:shadow-md transition-shadow text-center p-6 cursor-pointer hover:border-primary/50">
        <div class="text-3xl mb-3">💰</div>
        <h4 class="font-semibold text-foreground mb-1">Manage Finance</h4>
        <p class="text-xs text-muted-foreground">View revenue</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatCard from '@/components/StatCard.vue'

const events = ref([
  { id: 1, title: 'Summer Music Festival', date: 'Aug 15-17, 2025', registrations: 1250, status: 'active' },
  { id: 2, title: 'Tech Conference 2025', date: 'Sep 20-22, 2025', registrations: 856, status: 'active' },
  { id: 3, title: 'Food & Wine Expo', date: 'Oct 10-11, 2025', registrations: 441, status: 'upcoming' },
])
</script>
