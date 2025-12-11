<template>
  <div class="max-w-4xl mx-auto">
    <!-- Error Message -->
    <div v-if="errorMessage"
      class="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
      {{ errorMessage }}
    </div>

    <!-- Progress Indicator -->
    <div class="mb-8">
      <div class="flex gap-4 mb-6">
        <div v-for="(step, idx) in steps" :key="step"
          :class="['flex-1 text-center', idx < currentStep ? 'text-foreground' : 'text-muted-foreground']">
          <div
            :class="['w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-bold', idx < currentStep ? 'bg-foreground text-background' : 'bg-muted']">
            {{ idx + 1 }}
          </div>
          <p class="text-sm font-medium">
            {{ step }}
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <div v-for="step in steps.length" :key="step"
          :class="['flex-1 h-1 rounded-full', step <= currentStep ? 'bg-foreground' : 'bg-border']" />
      </div>
    </div>

    <!-- Step 1: Event Details -->
    <div v-show="currentStep === 1" class="card space-y-6">
      <h2 class="text-h2">Event Details</h2>

      <div>
        <label class="block text-sm font-medium mb-2">Event Title *</label>
        <input v-model="title" type="text" placeholder="e.g., Summer Music Festival" class="input-field w-full"
          :class="{ 'border-destructive': errors.title }" :disabled="loading">
        <p v-if="errors.title" class="text-xs text-red-600 mt-1">{{ errors.title }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Description</label>
        <textarea v-model="description" rows="4" placeholder="Describe your event..." class="input-field w-full"
          :class="{ 'border-destructive': errors.description }" :disabled="loading" />
        <p v-if="errors.description" class="text-xs text-red-600 mt-1">{{ errors.description }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Category *</label>
          <select v-model="categoryId" class="input-field w-full" :class="{ 'border-destructive': errors.categoryId }"
            :disabled="loading">
            <option value="">Select Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <p v-if="errors.categoryId" class="text-xs text-red-600 mt-1">{{ errors.categoryId }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Total Capacity *</label>
          <input v-model="totalCapacity" type="number" placeholder="Max attendees" class="input-field w-full"
            :class="{ 'border-destructive': errors.totalCapacity }" :disabled="loading">
          <p v-if="errors.totalCapacity" class="text-xs text-red-600 mt-1">{{ errors.totalCapacity }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Venue</label>
          <input v-model="venue" type="text" placeholder="e.g., Millennium Hall" class="input-field w-full"
            :disabled="loading">
          <p v-if="errors.venue" class="text-xs text-red-600 mt-1">{{ errors.venue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Location</label>
          <input v-model="location" type="text" placeholder="Full address" class="input-field w-full"
            :disabled="loading">
          <p v-if="errors.location" class="text-xs text-red-600 mt-1">{{ errors.location }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Ticket Sales Start *</label>
          <input v-model="ticketSalesStart" type="datetime-local" class="input-field w-full" :disabled="loading">
          <p v-if="errors.ticketSalesStart" class="text-xs text-red-600 mt-1">{{ errors.ticketSalesStart }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Ticket Sales End</label>
          <input v-model="ticketSalesEnd" type="datetime-local" class="input-field w-full" :disabled="loading">
          <p v-if="errors.ticketSalesEnd" class="text-xs text-red-600 mt-1">{{ errors.ticketSalesEnd }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Event Start Date *</label>
          <input v-model="startDate" type="datetime-local" class="input-field w-full" :disabled="loading">
          <p v-if="errors.startDate" class="text-xs text-red-600 mt-1">{{ errors.startDate }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Event End Date *</label>
          <input v-model="endDate" type="datetime-local" class="input-field w-full" :disabled="loading">
          <p v-if="errors.endDate" class="text-xs text-red-600 mt-1">{{ errors.endDate }}</p>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Cover Image *</label>
        <input type="file" accept="image/*" class="input-field w-full" :disabled="loading"
          @change="handleCoverImageChange">
        <img v-if="coverImagePreview" :src="coverImagePreview" class="mt-3 h-40 w-full rounded-lg object-cover"
          alt="Cover preview">
        <p v-if="errors.coverImage" class="text-xs text-red-600 mt-1">{{ errors.coverImage }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Additional Images (Optional)</label>
        <input type="file" accept="image/*" multiple class="input-field w-full" :disabled="loading"
          @change="handleAdditionalImagesChange">
        <div v-if="additionalImagesPreview.length > 0" class="mt-3 grid grid-cols-4 gap-2">
          <img v-for="(preview, idx) in additionalImagesPreview" :key="idx" :src="preview"
            class="h-20 w-full rounded-lg object-cover" alt="Additional image">
        </div>
      </div>

      <div class="flex gap-3">
        <button type="button" class="btn-primary flex-1 py-3" :disabled="loading" @click="createDraftEvent">
          <span v-if="loading">Creating Draft...</span>
          <span v-else>Next: Add Tickets</span>
        </button>
      </div>
    </div>

    <!-- Step 2: Ticket Types -->
    <div v-show="currentStep === 2" class="card space-y-6">
      <h2 class="text-h2">Ticket Types</h2>

      <div v-for="(ticket, idx) in tickets" :key="idx" class="border border-border p-4 rounded-lg space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Ticket #{{ idx + 1 }}</h3>
          <button v-if="tickets.length > 1" type="button" class="text-destructive text-sm hover:underline"
            @click="removeTicket(idx)">
            Remove
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Ticket Source</label>
          <div class="grid grid-cols-2 gap-3">
            <button type="button"
              :class="['p-3 rounded-lg font-medium transition-all border', ticket.isDefault ? 'border-foreground bg-foreground text-background' : 'border-border hover:bg-secondary']"
              @click="ticket.isDefault = true">
              Default Ticket
            </button>
            <button type="button"
              :class="['p-3 rounded-lg font-medium transition-all border', !ticket.isDefault ? 'border-foreground bg-foreground text-background' : 'border-border hover:bg-secondary']"
              @click="ticket.isDefault = false">
              Custom Ticket
            </button>
          </div>
        </div>

        <div v-if="ticket.isDefault">
          <label class="block text-sm font-medium mb-2">Select Default Ticket</label>
          <select v-model="ticket.defaultTicketId" class="input-field w-full" @change="applyDefaultTicket(idx)">
            <option value="">Choose a ticket type</option>
            <option v-for="dt in defaultTicketTypes" :key="dt.id" :value="dt.id">
              {{ dt.name }} - {{ dt.description }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Ticket Name *</label>
            <input v-model="ticket.name" type="text" placeholder="e.g., General, VIP" class="input-field w-full"
              :disabled="ticket.isDefault && ticket.defaultTicketId">
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Base Price *</label>
            <input v-model="ticket.basePrice" type="number" step="0.01" placeholder="0.00" class="input-field w-full">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Description *</label>
          <textarea v-model="ticket.description" rows="2" placeholder="Describe this ticket type..."
            class="input-field w-full" :disabled="ticket.isDefault && ticket.defaultTicketId" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Quantity *</label>
          <input v-model="ticket.quantity" type="number" placeholder="Available tickets" class="input-field w-full">
        </div>
      </div>

      <button type="button" class="btn-outline w-full py-3" @click="addTicket">
        + Add Another Ticket Type
      </button>

      <div class="flex gap-3">
        <button type="button" class="btn-outline flex-1 py-3" @click="currentStep = 1">
          Back
        </button>
        <button type="button" class="btn-primary flex-1 py-3" :disabled="loading" @click="saveTickets">
          <span v-if="loading">Saving Tickets...</span>
          <span v-else>Next: Pricing Rules</span>
        </button>
      </div>
    </div>

    <!-- Step 3: Pricing Rules -->
    <div v-show="currentStep === 3" class="card space-y-6">
      <h2 class="text-h2">Pricing Rules (Optional)</h2>
      <p class="text-sm text-muted-foreground">Add dynamic pricing rules to your tickets</p>

      <div v-for="(ticket, idx) in savedTickets" :key="ticket.id" class="border border-border p-4 rounded-lg space-y-4">
        <h3 class="font-semibold">{{ ticket.name }} - ${{ ticket.basePrice }}</h3>

        <div>
          <label class="block text-sm font-medium mb-2">Pricing Rule Type</label>
          <select v-model="pricingRules[ticket.id].ruleType" class="input-field w-full">
            <option value="None">No Pricing Rule</option>
            <option value="EarlyBird">Early Bird Discount</option>
            <option value="LastMinute">Last Minute Discount</option>
            <option value="DemandBased">Demand Based Pricing</option>
          </select>
        </div>

        <!-- Early Bird Fields -->
        <div v-if="pricingRules[ticket.id].ruleType === 'EarlyBird'" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Start Date *</label>
              <input v-model="pricingRules[ticket.id].startDate" type="datetime-local" class="input-field w-full">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">End Date *</label>
              <input v-model="pricingRules[ticket.id].endDate" type="datetime-local" class="input-field w-full">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Discount Percent *</label>
            <input v-model="pricingRules[ticket.id].discountPercent" type="number" step="0.01" placeholder="e.g., 20"
              class="input-field w-full">
          </div>
        </div>

        <!-- Last Minute Fields -->
        <div v-if="pricingRules[ticket.id].ruleType === 'LastMinute'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Last N Days Before Event *</label>
            <input v-model="pricingRules[ticket.id].lastNDaysBeforeEvent" type="number" placeholder="e.g., 3"
              class="input-field w-full">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Discount Percent *</label>
            <input v-model="pricingRules[ticket.id].discountPercent" type="number" step="0.01" placeholder="e.g., 15"
              class="input-field w-full">
          </div>
        </div>

        <!-- Demand Based Fields -->
        <div v-if="pricingRules[ticket.id].ruleType === 'DemandBased'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Threshold Percentage *</label>
            <input v-model="pricingRules[ticket.id].thresholdPercentage" type="number"
              placeholder="e.g., 70 (after 70% sold)" class="input-field w-full">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Price Increase Percent *</label>
            <input v-model="pricingRules[ticket.id].priceIncreasePercent" type="number" step="0.01"
              placeholder="e.g., 15" class="input-field w-full">
          </div>
        </div>

        <div v-if="pricingRules[ticket.id].ruleType !== 'None'">
          <label class="block text-sm font-medium mb-2">Description</label>
          <textarea v-model="pricingRules[ticket.id].description" rows="2" placeholder="Describe this pricing rule..."
            class="input-field w-full" />
        </div>
      </div>

      <div class="flex gap-3">
        <button type="button" class="btn-outline flex-1 py-3" @click="currentStep = 2">
          Back
        </button>
        <button type="button" class="btn-primary flex-1 py-3" :disabled="loading" @click="savePricingRules">
          <span v-if="loading">Saving Rules...</span>
          <span v-else>Next: Preview</span>
        </button>
      </div>
    </div>

    <!-- Step 4: Preview -->
    <div v-show="currentStep === 4" class="card space-y-6">
      <h2 class="text-h2">Preview & Publish</h2>

      <div class="space-y-6">
        <div v-if="coverImagePreview" class="rounded-lg overflow-hidden">
          <img :src="coverImagePreview" class="w-full h-64 object-cover" alt="Event cover">
        </div>

        <div>
          <h3 class="text-h3 mb-2">{{ title }}</h3>
          <p class="text-muted-foreground">{{ description || 'No description' }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-muted-foreground">Category</p>
            <p class="font-medium">{{ selectedCategory?.name || 'Not selected' }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Capacity</p>
            <p class="font-medium">{{ totalCapacity }} attendees</p>
          </div>
          <div>
            <p class="text-muted-foreground">Venue</p>
            <p class="font-medium">{{ venue || 'Not specified' }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Location</p>
            <p class="font-medium">{{ location || 'Not specified' }}</p>
          </div>
        </div>

        <div>
          <h4 class="font-semibold mb-3">Ticket Types</h4>
          <div class="space-y-2">
            <div v-for="ticket in savedTickets" :key="ticket.id" class="border border-border p-3 rounded-lg">
              <div class="flex justify-between">
                <span class="font-medium">{{ ticket.name }}</span>
                <span class="font-semibold">${{ ticket.basePrice }}</span>
              </div>
              <p class="text-sm text-muted-foreground">{{ ticket.description }}</p>
              <p class="text-xs text-muted-foreground mt-1">Quantity: {{ ticket.quantity }}</p>

              <div v-if="pricingRules[ticket.id]?.ruleType !== 'None'" class="mt-2 pt-2 border-t border-border">
                <p class="text-xs font-medium">Pricing Rule: {{ pricingRules[ticket.id].ruleType }}</p>
                <p class="text-xs text-muted-foreground">{{ pricingRules[ticket.id].description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <button type="button" class="btn-outline flex-1 py-3" @click="currentStep = 3">
          Back
        </button>
        <button type="button" class="btn-outline flex-1 py-3" :disabled="loading" @click="saveAsDraft">
          Save as Draft
        </button>
        <button type="button" class="btn-primary flex-1 py-3" :disabled="loading" @click="publishNow">
          <span v-if="loading">Publishing...</span>
          <span v-else>Publish Event</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { eventSchema } from '../../validation/eventSchema'
import { useEventStore } from '../../stores/event'
import { categoryService } from '../../services/categoryService'

const router = useRouter()
const eventStore = useEventStore()

const currentStep = ref(1)
const steps = ['Details', 'Tickets', 'Pricing', 'Preview']
const loading = ref(false)
const errorMessage = ref('')
const categories = ref([])
const defaultTicketTypes = ref([])

// Event ID after creation
const createdEventId = ref(null)

// VeeValidate form setup
const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: eventSchema,
})

// Form fields
const { value: title } = useField('title')
const { value: description } = useField('description')
const { value: categoryId } = useField('categoryId')
const { value: venue } = useField('venue')
const { value: location } = useField('location')
const { value: ticketSalesStart } = useField('ticketSalesStart')
const { value: ticketSalesEnd } = useField('ticketSalesEnd')
const { value: startDate } = useField('startDate')
const { value: endDate } = useField('endDate')
const { value: totalCapacity } = useField('totalCapacity')
const { value: coverImage } = useField('coverImage')

// Additional files
const additionalImages = ref([])
const videos = ref([])

// Preview images
const coverImagePreview = ref(null)
const additionalImagesPreview = ref([])

// Tickets
const tickets = ref([
  { isDefault: true, defaultTicketId: '', name: '', description: '', basePrice: 0, quantity: 0 }
])
const savedTickets = ref([])

// Pricing rules
const pricingRules = ref({})

// Fetch categories and default tickets on mount
onMounted(async () => {
  try {
    const catResponse = await categoryService.getAllCategories()
    categories.value = catResponse

    const ticketResponse = await eventStore.fetchDefaultTicketTypes()
    if (ticketResponse.success) {
      defaultTicketTypes.value = ticketResponse.data
    }
  } catch (error) {
    console.error('Failed to fetch initial data:', error)
  }
})

// File handlers
const handleCoverImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    setFieldValue('coverImage', file)
    const reader = new FileReader()
    reader.onload = (e) => {
      coverImagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleAdditionalImagesChange = (event) => {
  const files = Array.from(event.target.files)
  additionalImages.value = files

  additionalImagesPreview.value = []
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      additionalImagesPreview.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

// Ticket management
const addTicket = () => {
  tickets.value.push({
    isDefault: true,
    defaultTicketId: '',
    name: '',
    description: '',
    basePrice: 0,
    quantity: 0
  })
}

const removeTicket = (idx) => {
  tickets.value.splice(idx, 1)
}

const applyDefaultTicket = (idx) => {
  const ticket = tickets.value[idx]
  const defaultTicket = defaultTicketTypes.value.find(dt => dt.id === ticket.defaultTicketId)
  if (defaultTicket) {
    ticket.name = defaultTicket.name
    ticket.description = defaultTicket.description
  }
}

// Step 1: Create draft event
const createDraftEvent = handleSubmit(async (values) => {
  console.log("handle submit excuted");

  loading.value = true
  errorMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('Title', values.title)
    if (values.description) formData.append('Description', values.description)
    formData.append('CategoryId', values.categoryId)
    if (values.venue) formData.append('Venue', values.venue)
    if (values.location) formData.append('Location', values.location)
    formData.append('TicketSalesStart', new Date(values.ticketSalesStart).toISOString())
    if (values.ticketSalesEnd) formData.append('TicketSalesEnd', new Date(values.ticketSalesEnd).toISOString())
    formData.append('StartDate', new Date(values.startDate).toISOString())
    formData.append('EndDate', new Date(values.endDate).toISOString())
    formData.append('TotalCapacity', values.totalCapacity)
    formData.append('CoverImage', values.coverImage)

    additionalImages.value.forEach((file) => {
      formData.append('AdditionalImages', file)
    })

    const result = await eventStore.createEvent(formData)

    if (result.success) {
      createdEventId.value = result.event.eventId
      currentStep.value = 2
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'Failed to create event'
  } finally {
    loading.value = false
  }
})

// Step 2: Save tickets
const saveTickets = async () => {
  loading.value = true
  errorMessage.value = ''
  console.log("createdEventId.value", createdEventId.value);
  console.log("tickets.value", tickets.value);

  try {
    const ticketPromises = tickets.value.map(ticket => {
      return eventStore.addTicketType(createdEventId.value, {
        Name: ticket.name,
        Description: ticket.description,
        BasePrice: parseFloat(ticket.basePrice),
        Quantity: parseInt(ticket.quantity)
      })
    })

    const results = await Promise.all(ticketPromises)
    console.log("results", results);
    savedTickets.value = results.map(r => r.ticket)
    console.log("savedTickets.value", savedTickets.value);

    // Initialize pricing rules for each ticket
    savedTickets.value.forEach(ticket => {
      console.log("ticket from savedTickets.value", ticket);

      pricingRules.value[ticket.id] = {
        ruleType: 'None',
        description: '',
        startDate: '',
        endDate: '',
        discountPercent: 0,
        lastNDaysBeforeEvent: 0,
        thresholdPercentage: 0,
        priceIncreasePercent: 0
      }
    })

    currentStep.value = 3
  } catch (error) {
    errorMessage.value = 'Failed to save tickets'
  } finally {
    loading.value = false
  }
}

// Step 3: Save pricing rules
const savePricingRules = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const rulePromises = []
    console.log("pricingRules.value", pricingRules.value);
    for (const ticketId in pricingRules.value) {
      const rule = pricingRules.value[ticketId]
      console.log("rule", rule);
      console.log("ticketId", ticketId);


      if (rule.ruleType !== 'None') {
        const ruleData = {
          RuleType: rule.ruleType,
          Description: rule.description
        }

        if (rule.ruleType === 'EarlyBird') {
          ruleData.StartDate = new Date(rule.startDate).toISOString()
          ruleData.EndDate = new Date(rule.endDate).toISOString()
          ruleData.DiscountPercent = parseFloat(rule.discountPercent)
        } else if (rule.ruleType === 'LastMinute') {
          ruleData.LastNDaysBeforeEvent = parseInt(rule.lastNDaysBeforeEvent)
          ruleData.DiscountPercent = parseFloat(rule.discountPercent)
        } else if (rule.ruleType === 'DemandBased') {
          ruleData.ThresholdPercentage = parseInt(rule.thresholdPercentage)
          ruleData.PriceIncreasePercent = parseFloat(rule.priceIncreasePercent)
        }

        rulePromises.push(eventStore.addPricingRule(ticketId, ruleData))
      }
    }

    await Promise.all(rulePromises)
    currentStep.value = 4
  } catch (error) {
    errorMessage.value = 'Failed to save pricing rules'
  } finally {
    loading.value = false
  }
}

// Step 4: Publish or save
const publishNow = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const result = await eventStore.publishEvent(createdEventId.value)

    if (result.success) {
      router.push('/organizer/events')
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'Failed to publish event'
  } finally {
    loading.value = false
  }
}

const saveAsDraft = () => {
  // Event is already saved as draft, just redirect
  router.push('/organizer/events')
}

// Computed
const selectedCategory = computed(() => {
  return categories.value.find(cat => cat.id === categoryId.value)
})
</script>
