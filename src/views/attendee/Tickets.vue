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

    <div class="space-y-4">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="card hover:shadow-lg transition-shadow"
      >
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-h4 font-bold">
              {{ ticket.eventTitle }}
            </h3>
            <p class="text-muted-foreground text-sm mb-3">
              {{ ticket.date }} at {{ ticket.time }}
            </p>
            <div class="flex flex-wrap gap-3">
              <span class="badge">Ticket #{{ ticket.ticketNo }}</span>
              <span :class="['badge', ticket.status === 'used' ? 'bg-muted text-muted-foreground' : ticket.status === 'upcoming' ? 'bg-muted text-foreground' : 'bg-muted text-muted-foreground']">{{ ticket.status }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2 sm:text-right">
            <p class="text-sm text-muted-foreground">
              Order #{{ ticket.orderId }}
            </p>
            <button
              v-if="ticket.status !== 'used'"
              class="btn-primary py-2 px-4 text-sm"
              @click="showQR(ticket)"
            >
              Show QR Code
            </button>
            <router-link
              v-else
              to="/dashboard"
              class="btn-outline py-2 px-4 text-sm text-center"
            >
              View Details
            </router-link>
          </div>
        </div>

        <!-- QR Code Modal -->
        <div
          v-if="selectedTicketForQR?.id === ticket.id"
          class="mt-4 pt-4 border-t border-border"
        >
          <div class="bg-muted p-4 rounded-lg flex flex-col items-center gap-4">
            <p class="text-sm font-medium">
              Scan at check-in
            </p>
            <div class="bg-white p-4 rounded">
              <div class="w-32 h-32 bg-gradient-to-br from-foreground/10 to-foreground/20 flex items-center justify-center text-2xl text-foreground">
                QR
              </div>
            </div>
            <button
              class="btn-outline py-2 px-6"
              @click="selectedTicketForQR = null"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTicketForQR = ref(null)

const tickets = [
  {
    id: 1,
    eventTitle: 'Summer Music Festival',
    date: 'Aug 15, 2025',
    time: '4:00 PM',
    ticketNo: '12345678',
    orderId: 'ORD-001',
    status: 'upcoming',
  },
  {
    id: 2,
    eventTitle: 'Tech Conference 2025',
    date: 'Sep 20, 2025',
    time: '9:00 AM',
    ticketNo: '87654321',
    orderId: 'ORD-002',
    status: 'upcoming',
  },
  {
    id: 3,
    eventTitle: 'Jazz Night',
    date: 'Aug 25, 2025',
    time: '7:30 PM',
    ticketNo: '11223344',
    orderId: 'ORD-003',
    status: 'used',
  },
]

const showQR = (ticket) => {
  selectedTicketForQR.value = ticket
}
</script>
