<template>
  <div v-if="loading" class="text-center py-12">
    <p class="text-muted-foreground">Loading event details...</p>
  </div>
  <div v-else-if="!event" class="text-center py-12">
    <p class="text-muted-foreground">Event not found.</p>
  </div>
  <div v-else class="space-y-8">
    <!-- Event Hero -->
    <div class="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
      <img v-if="event.bannerImageUrl" :src="event.bannerImageUrl" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-6">
        <div>
          <h1 class="text-h1 font-bold mb-4">
            {{ event.title }}
          </h1>
          <div class="flex flex-wrap gap-4 text-lg">
            <span>📅 {{ formattedDateRange }}</span>
            <span>📍 {{ event.venue }}</span>
          </div>
        </div>
        <button
          :class="['btn-primary px-6 py-3 text-lg', isFavorite && 'ring-2 ring-offset-2 ring-primary']"
          @click="toggleFavorite"
        >
          {{ isFavorite ? '❤️ Saved' : '🤍 Save' }}
        </button>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="flex gap-4 border-b border-border overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['px-4 py-3 font-medium transition-colors border-b-2', activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="space-y-6">
      <!-- Overview Tab -->
      <div
        v-if="activeTab === 'Overview'"
        class="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div class="lg:col-span-2 space-y-6">
          <div>
            <h3 class="text-h3 font-bold mb-3">
              About This Event
            </h3>
            <p class="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              {{ event.description || event.Description || 'No description available.' }}
            </p>
          </div>

          <div>
            <h3 class="text-h3 font-bold mb-3">
              What's Included
            </h3>
            <ul class="space-y-2 text-lg">
              <li>✓ Live Performance</li>
              <li>✓ Interactive Sessions</li>
              <li>✓ Networking Opportunities</li>
            </ul>
          </div>
        </div>

        <div class="card h-fit">
          <h4 class="text-h4 font-bold mb-6">
            Get Tickets
          </h4>
          <div class="space-y-3 mb-6">
            <div 
              v-for="ticket in event.ticketTypes" 
              :key="ticket.ticketTypeId"
              class="border border-border rounded-lg p-4"
            >
              <p class="text-sm font-medium mb-1">
                {{ ticket.name }}
              </p>
              <p class="text-2xl font-bold text-primary">
                {{ formatCurrency(ticket.finalPrice || ticket.basePrice) }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                {{ ticket.isAvailable ? (ticket.isSoldOut ? 'Sold Out' : 'Available') : 'Unavailable' }}
              </p>
              <p
                v-if="ticket.finalPrice && ticket.basePrice && ticket.finalPrice !== ticket.basePrice"
                class="text-xs mt-1"
              >
                <span class="font-medium">
                  Base: {{ formatCurrency(ticket.basePrice) }}
                </span>
                <span
                  :class="[
                    'ml-2 px-2 py-0.5 rounded-full',
                    ticket.finalPrice < ticket.basePrice
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200'
                  ]"
                >
                  {{ ticket.finalPrice < ticket.basePrice ? 'Discount applied' : 'Dynamic price increase' }}
                  ({{ priceDiffPercent(ticket) }})
                </span>
              </p>
            </div>
            <div v-if="(!event.ticketTypes || event.ticketTypes.length === 0)" class="text-muted-foreground text-sm">
               No tickets available online.
            </div>
          </div>
          <router-link
            :to="'/dashboard/checkout/' + eventId"
            class="btn-primary w-full py-3 text-center block"
            v-if="event.ticketTypes && event.ticketTypes.length > 0 && event.ticketTypes.some(t => t.isAvailable && !t.isSoldOut)"
          >
            Buy Tickets
          </router-link>
        </div>
      </div>

      <!-- Schedule Tab -->
      <div
        v-if="activeTab === 'Schedule'"
        class="space-y-4"
      >
        <div class="card">
          <h4 class="font-bold mb-4">
            Event Schedule
          </h4>
          <div class="space-y-4">
             <div class="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
               <div class="flex gap-3 items-center">
                 <span class="text-2xl">🏁</span>
                 <div>
                   <p class="font-semibold">Start Time</p>
                   <p class="text-sm text-muted-foreground">{{ new Date(event.startDate).toLocaleString() }}</p>
                 </div>
               </div>
             </div>
             <div class="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
               <div class="flex gap-3 items-center">
                 <span class="text-2xl">🏁</span>
                 <div>
                   <p class="font-semibold">End Time</p>
                   <p class="text-sm text-muted-foreground">{{ new Date(event.endDate).toLocaleString() }}</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Location Tab -->
      <div
        v-if="activeTab === 'Location'"
        class="card"
      >
        <p class="text-lg mb-4">
          {{ event.venue }}
        </p>
        <p class="text-muted-foreground">
          Check map for precise directions.
        </p>
      </div>

      <!-- Organizer Tab -->
      <div
        v-if="activeTab === 'Organizer'"
        class="card"
      >
        <div class="flex items-center gap-4">
          <div class="text-5xl">
            🏢
          </div>
          <div>
            <h4 class="text-h4 font-bold">
              {{ event.organizerName || 'Event Organizer' }}
            </h4>
            <p class="text-muted-foreground">
              Contact for more info.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { attendeeService } from '@/services/attendeeService'

const route = useRoute()
const eventId = route.params.id

const event = ref(null)
const loading = ref(true)
const activeTab = ref('Overview')
const isFavorite = ref(false)
const tabs = ['Overview', 'Schedule', 'Location', 'Organizer']

const formattedDateRange = computed(() => {
  if (!event.value) return ''
  const start = new Date(event.value.startDate)
  const end = new Date(event.value.endDate)
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
})

const priceDiffPercent = (ticket) => {
  if (!ticket || !ticket.finalPrice || !ticket.basePrice) return ''
  const diff = ((ticket.finalPrice - ticket.basePrice) / ticket.basePrice) * 100
  const rounded = Math.abs(Math.round(diff))
  return diff < 0 ? `-${rounded}%` : `+${rounded}%`
}

onMounted(async () => {
  await loadEventDetails()
})

const loadEventDetails = async () => {
  loading.value = true
  try {
    const data = await attendeeService.getEventDetails(eventId)
    event.value = data
  } catch (err) {
    console.error("Failed to load event details")
  } finally {
    loading.value = false
  }
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }).format(val)
}
</script>
