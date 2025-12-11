<template>
  <div class="space-y-6">
    <!-- Search and Filters -->
    <div class="card">
      <div class="flex flex-col gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search events..."
          class="input-field w-full"
        >
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label class="text-sm font-medium mb-2 block">Category</label>
            <select
              v-model="selectedCategory"
              class="input-field w-full"
            >
              <option value="">
                All Categories
              </option>
              <option value="music">
                Music
              </option>
              <option value="sports">
                Sports
              </option>
              <option value="tech">
                Tech
              </option>
              <option value="business">
                Business
              </option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Price Range</label>
            <select
              v-model="selectedPrice"
              class="input-field w-full"
            >
              <option value="">
                Any Price
              </option>
              <option value="free">
                Free
              </option>
              <option value="0-50">
                Under $50
              </option>
              <option value="50-100">
                $50 - $100
              </option>
              <option value="100+">
                $100+
              </option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Date</label>
            <input
              v-model="selectedDate"
              type="date"
              class="input-field w-full"
            >
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Location</label>
            <input
              v-model="selectedLocation"
              type="text"
              placeholder="City or venue"
              class="input-field w-full"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div>
      <p class="text-sm text-muted-foreground mb-4">
        Showing {{ filteredEvents.length }} events
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <event-card
          v-for="event in filteredEvents"
          :key="event.id"
          v-bind="event"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import EventCard from '@/components/EventCard.vue'

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPrice = ref('')
const selectedDate = ref('')
const selectedLocation = ref('')

const allEvents = [
  { id: 1, title: 'Summer Music Festival', description: 'Live music from top artists', date: 'Aug 15, 2025', price: 'From $50', category: 'music', location: 'Central Park' },
  { id: 2, title: 'Tech Conference 2025', description: 'Latest in web development', date: 'Sep 20, 2025', price: 'From $100', category: 'tech', location: 'Convention Center' },
  { id: 3, title: 'Jazz Night', description: 'Smooth jazz performances', date: 'Aug 25, 2025', price: 'From $30', category: 'music', location: 'Blue Note' },
  { id: 4, title: 'Food & Wine Expo', description: 'Culinary experiences', date: 'Sep 10, 2025', price: 'From $75', category: 'food', location: 'Downtown' },
  { id: 5, title: 'AI Workshop', description: 'Hands-on AI training', date: 'Sep 5, 2025', price: 'From $150', category: 'tech', location: 'Tech Hub' },
  { id: 6, title: 'Business Networking', description: 'Connect with entrepreneurs', date: 'Aug 28, 2025', price: 'Free', category: 'business', location: 'Downtown' },
]

const filteredEvents = computed(() => {
  return allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || event.category === selectedCategory.value
    const matchesLocation = !selectedLocation.value || event.location.toLowerCase().includes(selectedLocation.value.toLowerCase())
    return matchesSearch && matchesCategory && matchesLocation
  })
})
</script>
