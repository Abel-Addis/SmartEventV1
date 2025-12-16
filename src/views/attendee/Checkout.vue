<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Checkout Form -->
    <div class="lg:col-span-2 space-y-6">
      <div class="space-y-4">
        <h2 class="text-h2 font-bold">
          Step {{ currentStep }} of 3
        </h2>
        <div class="flex gap-2">
          <div
            v-for="step in 3"
            :key="step"
            :class="['flex-1 h-1 rounded-full transition-colors', step <= currentStep ? 'bg-primary' : 'bg-border']"
          />
        </div>
      </div>

      <!-- Step 1: Ticket Selection -->
      <div
        v-if="currentStep === 1"
        class="card space-y-4"
      >
        <h3 class="text-h3 font-bold">
          Select Tickets
        </h3>
        <div class="space-y-3">
          <div
            v-for="ticket in tickets"
            :key="ticket.ticketTypeId"
            class="border border-border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
            @click="selectTicket(ticket)"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold">
                  {{ ticket.name }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ ticket.description || '' }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-primary">
                  {{ formatCurrency(ticket.finalPrice || ticket.basePrice || 0) }}
                </p>
                <p
                  v-if="ticket.finalPrice && ticket.basePrice && ticket.finalPrice !== ticket.basePrice"
                  class="text-xs text-muted-foreground mt-1"
                >
                  Base: {{ formatCurrency(ticket.basePrice) }}
                  <span
                    :class="[
                      'ml-1 px-2 py-0.5 rounded-full',
                      ticket.finalPrice < ticket.basePrice
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200'
                    ]"
                  >
                    {{ ticket.finalPrice < ticket.basePrice ? 'Discount' : 'Dynamic price' }}
                    ({{ priceDiffPercent(ticket) }})
                  </span>
                </p>
              </div>
            </div>
            <div
              v-if="selectedTicket?.ticketTypeId === ticket.ticketTypeId"
              class="mt-3 flex items-center gap-3"
            >
              <button
                class="btn-outline px-3 py-1"
                @click.stop="decreaseQty"
              >
                -
              </button>
              <span class="text-lg font-bold">{{ ticketQty }}</span>
              <button
                class="btn-outline px-3 py-1"
                @click.stop="increaseQty"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button
          class="btn-primary w-full py-3"
          @click="currentStep = 2"
        >
          Continue
        </button>
      </div>



      <!-- Step 2: Payment -->
      <div
        v-if="currentStep === 2"
        class="card space-y-4"
      >
        <h3 class="text-h3 font-bold">
          Confirm & Pay
        </h3>
        
        <div class="space-y-4">
           <div class="bg-muted p-4 rounded-lg">
             <h4 class="font-semibold mb-2">Order Summary</h4>
             <div class="flex justify-between text-sm">
                <span>{{ selectedTicket?.name || 'Ticket' }} x{{ ticketQty }}</span>
                <span class="font-semibold">{{ formatCurrency((selectedTicket?.finalPrice || selectedTicket?.basePrice || 0) * ticketQty) }}</span>
             </div>
             <div class="flex justify-between text-sm mt-2 pt-2 border-t border-border">
                <span class="font-bold">Total</span>
                <span class="font-bold text-primary">{{ formatCurrency((selectedTicket?.finalPrice || selectedTicket?.basePrice || 0) * ticketQty) }}</span>
             </div>
           </div>
           
           <div class="text-sm text-muted-foreground">
             By clicking "Complete Purchase", you will be redirected to the secure payment gateway.
           </div>
        </div>

        <div class="flex gap-3">
          <button
            class="btn-outline flex-1 py-3"
            @click="currentStep = 1"
            :disabled="processing"
          >
            Back
          </button>
          <button
            class="btn-primary flex-1 py-3"
            @click="completeCheckout"
            :disabled="processing"
          >
            {{ processing ? 'Processing...' : 'Complete Purchase' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Order Summary (Sidebar) -->
    <div class="lg:col-span-1">
      <div class="card sticky top-8 space-y-4">
        <h3 class="text-h3 font-bold">
          Order Summary
        </h3>
        <div v-if="event" class="space-y-2 pb-4 border-b border-border">
          <p class="text-lg font-semibold">
            {{ event.title }}
          </p>
          <p class="text-sm text-muted-foreground">
            {{ formatDate(event.startDate) }}
          </p>
           <p class="text-sm text-muted-foreground">
            {{ event.venue }}
          </p>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between">
            <span>{{ selectedTicket?.name || 'Ticket' }} x{{ ticketQty }}</span>
            <span>{{ formatCurrency((selectedTicket?.finalPrice || selectedTicket?.basePrice || 0) * ticketQty) }}</span>
          </div>
          <div class="border-t border-border pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span class="text-primary">{{ formatCurrency((selectedTicket?.finalPrice || selectedTicket?.basePrice || 0) * ticketQty) }}</span>
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

const currentStep = ref(1)
const ticketQty = ref(1)
const selectedTicket = ref(null)
const processing = ref(false)
const event = ref(null)
const tickets = ref([]) // Ticket Types

onMounted(async () => {
  await loadEventDetails()
})

const loadEventDetails = async () => {
  try {
    const data = await attendeeService.getEventDetails(eventId)
    event.value = data
    // Map ticket types from event detail
    tickets.value = data.ticketTypes || []
    if (tickets.value.length > 0) {
      selectedTicket.value = tickets.value[0]
    }
  } catch (err) {
    alert("Failed to load event details")
  }
}

const selectTicket = (ticket) => {
  selectedTicket.value = ticket
}

const increaseQty = () => {
  ticketQty.value++
}

const decreaseQty = () => {
  if (ticketQty.value > 1) ticketQty.value--
}

const priceDiffPercent = (ticket) => {
  if (!ticket || !ticket.finalPrice || !ticket.basePrice) return ''
  const diff = ((ticket.finalPrice - ticket.basePrice) / ticket.basePrice) * 100
  const rounded = Math.abs(Math.round(diff))
  return diff < 0 ? `-${rounded}%` : `+${rounded}%`
}

const completeCheckout = async () => {
  if (!selectedTicket.value) return
  
  processing.value = true
  try {
    // 1. Create Booking
    // Payload matches BookingCreateDto exactly
    const bookingPayload = {
      EventId: eventId,
      Tickets: [
        {
          TicketTypeId: selectedTicket.value.ticketTypeId, // Ensure this maps to Guid from API
          Quantity: ticketQty.value
          // Removed HolderName/Phone as per user feedback
        }
      ]
    }
    
    console.log("Sending Booking Payload:", JSON.stringify(bookingPayload))

    const bookingResult = await attendeeService.createBooking(bookingPayload)
    console.log("Booking Result:", bookingResult)

    if (!bookingResult || !bookingResult.bookingId) {
       throw new Error("Invalid booking response from server")
    }

    const bookingId = bookingResult.bookingId
    
    // 2. Init Payment
    // InitializePaymentRequest expects just BookingId
    console.log("Initiating Payment for Booking:", bookingId)
    const paymentResult = await attendeeService.initPayment(bookingId)
    console.log("Payment Result:", paymentResult)
    
    // 3. Redirect
    if (paymentResult && paymentResult.checkoutUrl) {
      window.location.href = paymentResult.checkoutUrl
    } else {
      throw new Error("No checkout URL provided by payment service")
    }
    
  } catch (err) {
    console.error("Checkout process failed:", err)
    let msg = err.message
    if (err.response && err.response.data) {
       msg = typeof err.response.data === 'string' ? err.response.data : (err.response.data.message || JSON.stringify(err.response.data))
    }
    alert("Checkout Failed: " + msg)
  } finally {
    processing.value = false
  }
}

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }).format(val)
}

const formatDate = (dateString) => {
  if(!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

