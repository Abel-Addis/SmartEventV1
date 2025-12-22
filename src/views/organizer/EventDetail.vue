<template>
    <div class="max-w-6xl mx-auto space-y-6">
        <!-- Loading State -->
        <div v-if="loading" class="card text-center py-12">
            <p class="text-muted-foreground">Loading event details...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="card bg-destructive/10 border-destructive/20 text-destructive p-4">
            {{ error }}
        </div>

        <!-- Event Details -->
        <div v-if="!loading && event" class="space-y-6">
            <!-- Header -->
            <div class="card">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <h1 class="text-h1">{{ event.title }}</h1>
                            <span :class="['px-3 py-1 rounded-lg text-sm font-medium', getStatusClass(event.status)]">
                                {{ event.status }}
                            </span>
                        </div>
                        <p class="text-muted-foreground">{{ event.categoryName }}</p>
                    </div>
                    <div class="flex gap-2">
                        <router-link :to="`/organizer/events/${eventId}/edit`" class="btn-primary px-4 py-2">
                            Edit Event
                        </router-link>
                        <button v-if="event.status === 'Draft'" class="btn-outline px-4 py-2" @click="publishEvent">
                            Publish
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex gap-4 border-b border-border mb-6">
                <button 
                  @click="activeTab = 'overview'"
                  :class="['px-4 py-2 border-b-2 transition-colors', activeTab === 'overview' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground']"
                >
                  Overview
                </button>
                <button 
                  @click="activeTab = 'feedback'"
                  :class="['px-4 py-2 border-b-2 transition-colors', activeTab === 'feedback' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground']"
                >
                  Feedback
                </button>
                <button 
                  @click="activeTab = 'notifications'"
                  :class="['px-4 py-2 border-b-2 transition-colors', activeTab === 'notifications' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground']"
                >
                  Notifications
                </button>
            </div>

            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'" class="space-y-6">
                <!-- Event Image -->
                <div v-if="event.media?.coverImageUrl" class="card p-0 overflow-hidden">
                    <img :src="event.media.coverImageUrl" :alt="event.title" class="w-full h-96 object-cover">
                </div>
    
                <!-- Event Information -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Basic Info -->
                    <div class="card space-y-4">
                        <h2 class="text-h2">Event Information</h2>
    
                        <div>
                            <p class="text-sm text-muted-foreground">Description</p>
                            <p class="mt-1">{{ event.description || 'No description provided' }}</p>
                        </div>
    
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-muted-foreground">Venue</p>
                                <p class="mt-1 font-medium">{{ event.venue || 'TBD' }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">Location</p>
                                <p class="mt-1 font-medium">{{ event.location || 'TBD' }}</p>
                            </div>
                        </div>
    
                        <div>
                            <p class="text-sm text-muted-foreground">Total Capacity</p>
                            <p class="mt-1 font-medium">{{ event.totalCapacity }} attendees</p>
                        </div>
                    </div>
    
                    <!-- Dates -->
                    <div class="card space-y-4">
                        <h2 class="text-h2">Schedule</h2>
    
                        <div>
                            <p class="text-sm text-muted-foreground">Event Dates</p>
                            <p class="mt-1 font-medium">{{ formatDate(event.startDate) }} - {{ formatDate(event.endDate) }}
                            </p>
                        </div>
    
                        <div v-if="event.ticketSalesStart">
                            <p class="text-sm text-muted-foreground">Ticket Sales Start</p>
                            <p class="mt-1 font-medium">{{ formatDate(event.ticketSalesStart) }}</p>
                        </div>
    
                        <div v-if="event.ticketSalesEnd">
                            <p class="text-sm text-muted-foreground">Ticket Sales End</p>
                            <p class="mt-1 font-medium">{{ formatDate(event.ticketSalesEnd) }}</p>
                        </div>
                    </div>
                </div>
    
                <!-- TicketTypes -->
                <div class="card">
                    <h2 class="text-h2 mb-4">Ticket Types</h2>
    
                    <div v-if="event.ticketTypes.length === 0" class="text-center py-8 text-muted-foreground">
                        No ticket types configured yet
                    </div>
    
                    <div v-else class="space-y-3">
                        <div v-for="ticket in event.ticketTypes" :key="ticket.id"
                            class="border border-border p-4 rounded-lg">
                            <div class="flex justify-between items-start mb-2">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2">
                                        <h3 class="font-semibold">{{ ticket.name }}</h3>
                                        <span
                                            :class="['px-2 py-0.5 rounded text-xs', ticket.isActive ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground']">
                                            {{ ticket.isActive ? 'Active' : 'Inactive' }}
                                        </span>
                                    </div>
                                    <p class="text-sm text-muted-foreground mt-1">{{ ticket.description }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-lg font-bold">${{ ticket.basePrice }}</p>
                                    <p class="text-xs text-muted-foreground">Base Price</p>
                                </div>
                            </div>
    
                            <div class="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-border text-sm">
                                <div>
                                    <p class="text-muted-foreground">Quantity</p>
                                    <p class="font-medium">{{ ticket.quantity }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Sold</p>
                                    <p class="font-medium">{{ ticket.sold }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Available</p>
                                    <p class="font-medium">{{ ticket.quantity - ticket.sold }}</p>
                                </div>
                            </div>
    
                            <!-- Pricing Rules -->
                            <div v-if="ticket.pricingRules && ticket.pricingRules.length > 0"
                                class="mt-3 pt-3 border-t border-border">
                                <p class="text-sm font-medium mb-2">Pricing Rules</p>
                                <div class="space-y-2">
                                    <div v-for="rule in ticket.pricingRules" :key="rule.id"
                                        class="bg-secondary p-3 rounded-lg text-sm">
                                        <div class="flex justify-between items-start">
                                            <div class="flex-1">
                                                <div class="flex items-center gap-2">
                                                    <span class="font-medium">{{ rule.ruleType }}</span>
                                                    <span
                                                        :class="['px-2 py-0.5 rounded text-xs', rule.isActive ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground']">
                                                        {{ rule.isActive ? 'Active' : 'Inactive' }}
                                                    </span>
                                                </div>
                                                <p class="text-muted-foreground mt-1">{{ rule.description }}</p>
                                            </div>
                                        </div>
    
                                        <div class="mt-2 text-xs text-muted-foreground">
                                            <span v-if="rule.discountPercent">Discount: {{ rule.discountPercent }}%</span>
                                            <span v-if="rule.priceIncreasePercent">Price Increase: {{
                                                rule.priceIncreasePercent }}%</span>
                                            <span v-if="rule.thresholdPercentage"> • Threshold: {{ rule.thresholdPercentage
                                                }}%</span>
                                            <span v-if="rule.lastNDaysBeforeEvent"> • Last {{ rule.lastNDaysBeforeEvent }}
                                                days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notifications Tab -->
            <div v-if="activeTab === 'notifications'" class="space-y-6">
                <div class="card max-w-2xl mx-auto">
                    <h2 class="text-h2 mb-2">📢 Send Announcement</h2>
                    <p class="text-muted-foreground mb-6">Send a notification to all confirmed attendees of this event.</p>
                    
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="font-medium">Title</label>
                            <input 
                              v-model="notifForm.title"
                              type="text" 
                              class="input-field" 
                              placeholder="e.g. Important Update: Venue Change"
                            />
                        </div>

                        <div class="space-y-2">
                            <label class="font-medium">Message</label>
                            <textarea 
                              v-model="notifForm.message"
                              rows="5"
                              class="input-field"
                              placeholder="Type your message here..."
                            ></textarea>
                        </div>
                        
                        <div class="flex flex-col gap-2">
                            <button 
                              @click="sendNotification" 
                              :disabled="sendingNotif || !isNotifValid"
                              class="btn-primary w-full py-3"
                            >
                                {{ sendingNotif ? 'Sending...' : 'Send Notification' }}
                            </button>
                            
                            <p v-if="notifSuccess" class="text-success text-center text-sm font-medium animate-pulse">
                                {{ notifSuccess }}
                            </p>
                            <p v-if="notifError" class="text-destructive text-center text-sm">
                                {{ notifError }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Feedback Tab -->
            <div v-if="activeTab === 'feedback'" class="space-y-6">
                <!-- Summary Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div class="card flex items-center gap-4">
                      <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">⭐</div>
                      <div>
                         <p class="text-sm text-muted-foreground">Average</p>
                         <p class="text-2xl font-bold">{{ feedbackSummary?.averageRating.toFixed(1) || '0.0' }}</p>
                      </div>
                    </div>
                     <div class="card flex items-center gap-4">
                      <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">💬</div>
                      <div>
                         <p class="text-sm text-muted-foreground">Total</p>
                         <p class="text-2xl font-bold">{{ feedbackSummary?.totalFeedbacks || 0 }}</p>
                      </div>
                    </div>
                </div>

                <!-- Feedback List -->
                <div class="card">
                    <h3 class="text-h3 font-bold mb-6">Reviews</h3>
                    <div v-if="loadingFeedback" class="text-center py-8">Loading...</div>
                    <div v-else-if="feedbacks.length === 0" class="text-center py-8 text-muted-foreground">No feedback yet.</div>
                    <div v-else class="space-y-6">
                         <div v-for="fb in feedbacks" :key="fb.feedbackId" class="border-b border-border last:border-0 pb-6 last:pb-0">
                           <div class="flex justify-between items-start mb-2">
                             <div class="flex items-center gap-3">
                               <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                 {{ fb.userName.charAt(0) }}
                               </div>
                               <div>
                                 <p class="font-semibold">{{ fb.userName }}</p>
                                 <p class="text-xs text-muted-foreground">{{ formatDate(fb.createdAt) }}</p>
                               </div>
                             </div>
                           </div>
                           <div class="ml-13 pl-13">
                              <div class="flex text-amber-500 text-sm mb-2">
                                 <span v-for="n in 5" :key="n">{{ n <= fb.rating ? '★' : '☆' }}</span>
                              </div>
                              <p class="text-foreground/90 whitespace-pre-wrap">{{ fb.comment }}</p>
                           </div>
                         </div>
                    </div>
                </div>
            </div>

            <!-- Back Button -->
            <div class="flex gap-3 mt-6">
                <button class="btn-outline px-4 py-2" @click="goBack">
                    ← Back
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { eventService } from '@/services/eventService'
import { feedbackService } from '@/services/feedbackService'
import { notificationService } from '@/services/notificationService'

const route = useRoute()
const router = useRouter()

const eventId = route.params.id
const event = ref(null)
const loading = ref(false)
const error = ref(null)

const activeTab = ref('overview')
const feedbacks = ref([])
const feedbackSummary = ref(null)
const loadingFeedback = ref(false)

// Notification State
const notifForm = ref({ title: '', message: '' })
const sendingNotif = ref(false)
const notifSuccess = ref('')
const notifError = ref('')
const isNotifValid = computed(() => notifForm.value.title.trim() && notifForm.value.message.trim())

// Fetch event details
const fetchEventDetails = async () => {
    loading.value = true
    error.value = null

    try {
        const response = await eventService.getEventById(eventId)
        event.value = response
    } catch (err) {
        console.error('Failed to fetch event:', err)
        error.value = 'Failed to load event details. Please try again.'
    } finally {
        loading.value = false
    }
}

const fetchFeedbackData = async () => {
    loadingFeedback.value = true
    try {
        const [list, summary] = await Promise.all([
            feedbackService.getFeedbacksForEvent(eventId),
            feedbackService.getEventFeedbackSummary(eventId)
        ])
        feedbacks.value = list || []
        feedbackSummary.value = summary
    } catch (err) {
        console.error("Failed to load feedback", err)
    } finally {
        loadingFeedback.value = false
    }
}

// Watch tab for feedback load
watch(activeTab, (newTab) => {
    if (newTab === 'feedback' && feedbacks.value.length === 0) {
        fetchFeedbackData()
    }
})

// Send Notification
const sendNotification = async () => {
    if (!isNotifValid.value) return
    
    sendingNotif.value = true
    notifSuccess.value = ''
    notifError.value = ''
    
    try {
        await notificationService.sendEventNotification({
            eventId,
            title: notifForm.value.title,
            message: notifForm.value.message
        })
        notifSuccess.value = 'Notification sent successfully! 🚀'
        notifForm.value = { title: '', message: '' }
    } catch (err) {
        console.error("Failed to send notification", err)
        notifError.value = 'Failed to send notification. Please try again.'
    } finally {
        sendingNotif.value = false
    }
}

// Publish event
const publishEvent = async () => {
    try {
        await eventService.publishEvent(eventId)
        await fetchEventDetails() // Refresh to show updated status
    } catch (err) {
        console.error('Failed to publish event:', err)
        error.value = 'Failed to publish event. Please try again.'
    }
}

// Go back to previous page
const goBack = () => {
    router.back()
}

// Format date
const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Get status class
const getStatusClass = (status) => {
    if (status === 'Published') {
        return 'bg-foreground text-background'
    } else if (status === 'Draft') {
        return 'bg-secondary text-foreground border border-border'
    }
    return 'bg-muted text-muted-foreground'
}

// Fetch event on mount
onMounted(() => {
    fetchEventDetails()
})
</script>
