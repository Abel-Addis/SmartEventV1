<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-h2 font-bold mb-2">
        My Tickets
      </h1>
      <p class="text-muted-foreground">
        {{ tickets.length }} active tickets
      </p>
    </div>

    <div v-if="loading" class="text-center py-12 text-muted-foreground">
      Loading tickets...
    </div>

    <div v-else-if="tickets.length === 0" class="text-center py-12 text-muted-foreground">
      You haven't booked any events yet.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="ticket in tickets"
        :key="ticket.bookingId"
        class="card hover:shadow-lg transition-shadow"
      >
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-h4 font-bold">
              {{ ticket.eventTitle }}
            </h3>
            <p class="text-muted-foreground text-sm mb-3">
              Booked on {{ formatDate(ticket.bookingDate) }}
            </p>
            <div class="flex flex-wrap gap-3">
              <span class="badge text-xs">{{ ticket.bookingStatus }}</span>
              <span :class="['badge text-xs', ticket.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700']">
                {{ ticket.paymentStatus }}
              </span>
              <span class="text-sm font-bold ml-2">{{ formatCurrency(ticket.totalAmount) }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2 sm:text-right">
            <p class="text-sm text-muted-foreground">
               ID: {{ ticket.bookingId.slice(0, 8) }}...
            </p>
            
            <!-- Actions -->
            <div class="flex gap-2 justify-end">
               <a
                 v-if="ticket.canPayNow && ticket.checkoutUrl"
                 :href="ticket.checkoutUrl"
                 class="btn-primary py-1 px-4 text-sm"
               >
                 Pay Now
               </a>
               <button
                 v-if="ticket.bookingStatus !== 'Cancelled' && ticket.bookingStatus !== 'Used' && !ticket.eventEnded"
                 class="btn-outline py-1 px-3 text-sm text-destructive hover:bg-destructive/10"
                 @click="cancelBooking(ticket.bookingId)"
               >
                 Cancel
               </button>
               <router-link
                v-if="ticket.paymentStatus === 'Paid'"
                 to="/dashboard" 
                 class="btn-outline py-1 px-3 text-sm"
               >
                 View Event
               </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { attendeeService } from '@/services/attendeeService'

const tickets = ref([])
const loading = ref(true)

onMounted(async () => {
  await fetchTickets()
})

const fetchTickets = async () => {
  loading.value = true
  try {
    const data = await attendeeService.getMyBookings()
    tickets.value = data || []
  } catch (err) {
    console.error("Failed to fetch tickets", err)
  } finally {
    loading.value = false
  }
}

const cancelBooking = async (id) => {
  if(!confirm("Are you sure you want to cancel this booking?")) return
  
  try {
    await attendeeService.cancelBooking(id) // Expected to return success message or updated booking
    alert("Booking cancelled successfully")
    await fetchTickets()
  } catch (err) {
    alert("Failed to cancel booking")
  }
}

const formatDate = (dateString) => {
  if(!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (val) => {
   return new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }).format(val)
}
</script>
