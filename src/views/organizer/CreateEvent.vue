<template>
  <div class="max-w-4xl mx-auto">
    <!-- Progress Indicator -->
    <div class="mb-8">
      <div class="flex gap-4 mb-6">
        <div
          v-for="(step, idx) in steps"
          :key="step"
          :class="['flex-1 text-center', idx < currentStep ? 'text-primary' : 'text-muted-foreground']"
        >
          <div :class="['w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-bold', idx < currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted']">
            {{ idx + 1 }}
          </div>
          <p class="text-sm font-medium">
            {{ step }}
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <div
          v-for="step in steps.length"
          :key="step"
          :class="['flex-1 h-1 rounded-full', step <= currentStep ? 'bg-primary' : 'bg-border']"
        />
      </div>
    </div>

    <!-- Step 1: Event Details -->
    <div
      v-show="currentStep === 1"
      class="card space-y-6"
    >
      <h2 class="text-h2 font-bold">
        Event Details
      </h2>
      <div>
        <label class="block text-sm font-medium mb-2">Event Title</label>
        <input
          v-model="formData.title"
          type="text"
          placeholder="e.g., Summer Music Festival"
          class="input-field w-full"
        >
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Description</label>
        <textarea
          v-model="formData.description"
          rows="4"
          placeholder="Describe your event..."
          class="input-field w-full"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Start Date</label>
          <input
            v-model="formData.startDate"
            type="date"
            class="input-field w-full"
          >
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">End Date</label>
          <input
            v-model="formData.endDate"
            type="date"
            class="input-field w-full"
          >
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Category</label>
          <select
            v-model="formData.category"
            class="input-field w-full"
          >
            <option value="">
              Select Category
            </option>
            <option value="music">
              Music
            </option>
            <option value="tech">
              Tech
            </option>
            <option value="business">
              Business
            </option>
            <option value="sports">
              Sports
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Capacity</label>
          <input
            v-model="formData.capacity"
            type="number"
            placeholder="Max attendees"
            class="input-field w-full"
          >
        </div>
      </div>
      <div class="flex gap-3">
        <button
          class="btn-primary flex-1 py-3"
          @click="currentStep = 2"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Step 2: Location & Tickets -->
    <div
      v-show="currentStep === 2"
      class="card space-y-6"
    >
      <h2 class="text-h2 font-bold">
        Location & Tickets
      </h2>
      <div>
        <label class="block text-sm font-medium mb-2">Event Location</label>
        <input
          v-model="formData.location"
          type="text"
          placeholder="Venue address"
          class="input-field w-full"
        >
      </div>
      <div>
        <label class="block text-sm font-medium mb-3">Ticket Types</label>
        <div class="space-y-3">
          <div
            v-for="(ticket, idx) in formData.tickets"
            :key="idx"
            class="border border-border p-4 rounded-lg space-y-3"
          >
            <div class="grid grid-cols-2 gap-3">
              <input
                v-model="ticket.name"
                type="text"
                placeholder="Ticket name"
                class="input-field"
              >
              <input
                v-model="ticket.price"
                type="number"
                placeholder="Price"
                class="input-field"
              >
            </div>
            <input
              v-model="ticket.quantity"
              type="number"
              placeholder="Quantity"
              class="input-field w-full"
            >
            <button
              type="button"
              class="btn-outline w-full py-2 text-destructive border-destructive/30"
              @click="removeTicket(idx)"
            >
              Remove
            </button>
          </div>
        </div>
        <button
          type="button"
          class="btn-outline w-full mt-3 py-2"
          @click="addTicket"
        >
          Add Ticket Type
        </button>
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
          Next
        </button>
      </div>
    </div>

    <!-- Step 3: Pricing & Preview -->
    <div
      v-show="currentStep === 3"
      class="card space-y-6"
    >
      <h2 class="text-h2 font-bold">
        Pricing & Preview
      </h2>
      <div>
        <label class="block text-sm font-medium mb-3">Dynamic Pricing Rules</label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="formData.earlyBirdEnabled"
            type="checkbox"
            class="rounded"
          >
          <span>Enable early bird discount</span>
        </label>
        <div
          v-if="formData.earlyBirdEnabled"
          class="mt-3 grid grid-cols-2 gap-3"
        >
          <div>
            <label class="block text-sm mb-1">Discount %</label>
            <input
              v-model="formData.earlyBirdDiscount"
              type="number"
              placeholder="e.g., 20"
              class="input-field w-full"
            >
          </div>
          <div>
            <label class="block text-sm mb-1">Valid Until</label>
            <input
              v-model="formData.earlyBirdUntil"
              type="date"
              class="input-field w-full"
            >
          </div>
        </div>
      </div>
      <div class="bg-muted p-4 rounded-lg">
        <h4 class="font-bold mb-3">
          Event Preview
        </h4>
        <p><strong>Title:</strong> {{ formData.title }}</p>
        <p><strong>Date:</strong> {{ formData.startDate }} to {{ formData.endDate }}</p>
        <p><strong>Capacity:</strong> {{ formData.capacity }}</p>
        <p><strong>Tickets:</strong> {{ formData.tickets.length }} types</p>
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
          @click="publishEvent"
        >
          Publish Event
        </button>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable-next-line vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(1)
const steps = ['Details', 'Tickets', 'Preview']

const formData = ref({
  title: '',
  description: '',
  category: '',
  startDate: '',
  endDate: '',
  capacity: '',
  location: '',
  tickets: [{ name: 'General', price: '', quantity: '' }],
  earlyBirdEnabled: false,
  earlyBirdDiscount: '',
  earlyBirdUntil: '',
})

const addTicket = () => {
  formData.value.tickets.push({ name: '', price: '', quantity: '' })
}

const removeTicket = (idx) => {
  formData.value.tickets.splice(idx, 1)
}

const publishEvent = () => {
  console.log('Event published:', formData.value)
  router.push('/organizer/events')
}
</script>
