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
            :key="ticket.id"
            class="border border-border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
            @click="selectTicket(ticket)"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold">
                  {{ ticket.type }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ ticket.description }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-primary">
                  ${{ ticket.price }}
                </p>
              </div>
            </div>
            <div
              v-if="selectedTicket?.id === ticket.id"
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

      <!-- Step 2: Attendee Information -->
      <div
        v-if="currentStep === 2"
        class="card space-y-4"
      >
        <h3 class="text-h3 font-bold">
          Attendee Information
        </h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium mb-1">First Name</label>
            <input
              v-model="attendeeInfo.firstName"
              type="text"
              class="input-field w-full"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Last Name</label>
            <input
              v-model="attendeeInfo.lastName"
              type="text"
              class="input-field w-full"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              v-model="attendeeInfo.email"
              type="email"
              class="input-field w-full"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Phone</label>
            <input
              v-model="attendeeInfo.phone"
              type="tel"
              class="input-field w-full"
            >
          </div>
        </div>
        <div class="flex gap-3">
          <button
            class="btn-outline flex-1 py-3"
            @click="currentStep = 1"
          >
            Back
          </button>
          <button
            class="btn-primary flex-1 py-3"
            @click="currentStep = 3"
          >
            Continue to Payment
          </button>
        </div>
      </div>

      <!-- Step 3: Payment -->
      <div
        v-if="currentStep === 3"
        class="card space-y-4"
      >
        <h3 class="text-h3 font-bold">
          Payment Method
        </h3>
        <div class="space-y-3">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            :class="['border-2 p-4 rounded-lg transition-colors', selectedPayment === method.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50']"
            @click="selectedPayment = method.id"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ method.icon }}</span>
              <div class="text-left">
                <p class="font-semibold">
                  {{ method.name }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ method.description }}
                </p>
              </div>
            </div>
          </button>
        </div>

        <div
          v-if="selectedPayment === 'card'"
          class="space-y-3 border-t border-border pt-4"
        >
          <input
            type="text"
            placeholder="Card Number"
            class="input-field w-full"
          >
          <div class="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              class="input-field"
            >
            <input
              type="text"
              placeholder="CVC"
              class="input-field"
            >
          </div>
        </div>

        <div class="flex gap-3">
          <button
            class="btn-outline flex-1 py-3"
            @click="currentStep = 2"
          >
            Back
          </button>
          <button
            class="btn-primary flex-1 py-3"
            @click="completeCheckout"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="lg:col-span-1">
      <div class="card sticky top-8 space-y-4">
        <h3 class="text-h3 font-bold">
          Order Summary
        </h3>
        <div class="space-y-2 pb-4 border-b border-border">
          <p class="text-lg font-semibold">
            Summer Music Festival
          </p>
          <p class="text-sm text-muted-foreground">
            Aug 15-17, 2025
          </p>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between">
            <span>{{ selectedTicket?.type || 'Ticket' }} x{{ ticketQty }}</span>
            <span>${{ (selectedTicket?.price || 0) * ticketQty }}</span>
          </div>
          <div class="flex justify-between text-muted-foreground">
            <span>Service Fee</span>
            <span>${{ ((selectedTicket?.price || 0) * ticketQty * 0.1).toFixed(2) }}</span>
          </div>
          <div class="border-t border-border pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span class="text-primary">${{ (((selectedTicket?.price || 0) * ticketQty) * 1.1).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(1)
const ticketQty = ref(1)
const selectedTicket = ref(null)
const selectedPayment = ref('card')

const attendeeInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

const tickets = [
  { id: 1, type: 'General Admission', description: '3-day pass', price: 75 },
  { id: 2, type: 'VIP Pass', description: 'Includes lounge access', price: 150 },
]

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, Amex', icon: '💳' },
  { id: 'telebirr', name: 'Telebirr', description: 'Mobile payment', icon: '📱' },
  { id: 'cbe', name: 'CBE', description: 'Commercial Bank of Ethiopia', icon: '🏦' },
]

const selectTicket = (ticket) => {
  selectedTicket.value = ticket
}

const increaseQty = () => {
  ticketQty.value++
}

const decreaseQty = () => {
  if (ticketQty.value > 1) ticketQty.value--
}

const completeCheckout = () => {
  console.log('Purchase completed')
}
</script>
