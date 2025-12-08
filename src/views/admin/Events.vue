<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-h2 font-bold">Event Management</h2>
        <p class="text-muted-foreground">Monitor and moderate all platform events</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-4 sm:p-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Search Events</label>
          <input v-model="searchQuery" type="text" placeholder="Event name..." class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Status</label>
          <select v-model="filterStatus" class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="flagged">Flagged</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="applyFilters" class="w-full btn-primary">Apply Filters</button>
        </div>
      </div>
    </div>

    <!-- Events List -->
    <div class="space-y-4">
      <div v-for="event in filteredEvents" :key="event.id" class="card hover:shadow-lg transition-shadow">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex-1">
            <h4 class="text-h4 font-bold mb-1">{{ event.title }}</h4>
            <p class="text-muted-foreground text-sm mb-2">by {{ event.organizer }} • {{ event.date }}</p>
            <div class="flex items-center gap-3">
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', event.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : event.status === 'flagged' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400']">
                {{ event.status }}
              </span>
              <span class="text-sm text-muted-foreground">{{ event.registrations }} registrations</span>
            </div>
          </div>
          <div class="flex gap-2 w-full sm:w-auto">
            <button @click="viewEvent(event.id)" class="btn-outline px-3 py-1 text-sm flex-1 sm:flex-none">View</button>
            <button v-if="event.status !== 'flagged'" @click="flagEvent(event.id)" class="btn-outline px-3 py-1 text-sm flex-1 sm:flex-none hover:bg-red-100 text-red-600">Flag</button>
            <button v-else @click="unflagEvent(event.id)" class="btn-outline px-3 py-1 text-sm flex-1 sm:flex-none hover:bg-green-100 text-green-600">Unflag</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('')

const events = ref([
  { id: 1, title: 'Summer Music Festival', organizer: 'EventCo', date: 'Aug 15-17, 2025', registrations: 1250, status: 'active' },
  { id: 2, title: 'Tech Conference 2025', organizer: 'Tech Conferences Ltd', date: 'Sep 20-22, 2025', registrations: 856, status: 'active' },
  { id: 3, title: 'Jazz Night', organizer: 'Festival Productions', date: 'Aug 25, 2025', registrations: 441, status: 'flagged' },
  { id: 4, title: 'AI Workshop', organizer: 'EventCo', date: 'Aug 30, 2025', registrations: 320, status: 'active' },
  { id: 5, title: 'Food & Wine Expo', organizer: 'Culture Events', date: 'Sep 10-11, 2025', registrations: 578, status: 'completed' },
])

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const matchesSearch = !searchQuery.value || event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !filterStatus.value || event.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const applyFilters = () => {
  console.log('[v0] Filters applied')
}

const flagEvent = (id) => {
  const event = events.value.find(e => e.id === id)
  if (event) event.status = 'flagged'
}

const unflagEvent = (id) => {
  const event = events.value.find(e => e.id === id)
  if (event) event.status = 'active'
}

const viewEvent = (id) => {
  console.log('[v0] Viewing event:', id)
}
</script>
