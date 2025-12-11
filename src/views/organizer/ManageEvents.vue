<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 class="text-h2 font-bold">
        My Events
      </h1>
      <router-link
        to="/organizer/create-event"
        class="btn-primary px-6 py-2"
      >
        Create Event
      </router-link>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 border-b border-border overflow-x-auto">
      <button
        v-for="filter in ['All', 'Active', 'Drafts', 'Completed']"
        :key="filter"
        :class="['px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap', activeFilter === filter ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']"
        @click="activeFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Events Table -->
    <div class="card overflow-hidden">
      <table class="w-full">
        <thead class="bg-muted border-b border-border">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold">
              Event
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold hidden sm:table-cell">
              Date
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold hidden md:table-cell">
              Registrations
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold">
              Status
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="event in filteredEvents"
            :key="event.id"
            class="border-b border-border hover:bg-muted/50 transition-colors"
          >
            <td class="px-6 py-4">
              <p class="font-semibold">
                {{ event.title }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ event.category }}
              </p>
            </td>
            <td class="px-6 py-4 hidden sm:table-cell text-sm">
              {{ event.date }}
            </td>
            <td class="px-6 py-4 hidden md:table-cell">
              {{ event.registrations }}
            </td>
            <td class="px-6 py-4">
              <span :class="['px-3 py-1 rounded-full text-xs font-medium', event.status === 'active' ? 'bg-muted text-foreground' : event.status === 'draft' ? 'bg-muted text-muted-foreground' : 'bg-muted text-muted-foreground']">
                {{ event.status }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <router-link
                  to="/organizer/analytics"
                  class="btn-outline text-xs px-3 py-1"
                >
                  Analytics
                </router-link>
                <button class="btn-outline text-xs px-3 py-1">
                  Edit
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')

const allEvents = [
  { id: 1, title: 'Summer Music Festival', category: 'Music', date: 'Aug 15-17, 2025', registrations: 1250, status: 'active' },
  { id: 2, title: 'Tech Conference 2025', category: 'Tech', date: 'Sep 20-22, 2025', registrations: 856, status: 'active' },
  { id: 3, title: 'Jazz Night', category: 'Music', date: 'Aug 25, 2025', registrations: 441, status: 'active' },
  { id: 4, title: 'Art Exhibition', category: 'Arts', date: 'Oct 5, 2025', registrations: 0, status: 'draft' },
  { id: 5, title: 'Wine Tasting', category: 'Food', date: 'Jul 10, 2025', registrations: 200, status: 'completed' },
]

const filteredEvents = computed(() => {
  if (activeFilter.value === 'All') return allEvents
  return allEvents.filter(e => e.status === activeFilter.value.toLowerCase())
})
</script>
