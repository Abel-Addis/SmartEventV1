<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-h2 font-bold mb-2">Notifications</h1>
        <p class="text-muted-foreground">{{ unreadCount }} unread notifications</p>
      </div>
      <button @click="markAllRead" class="btn-outline px-6 py-2" v-if="unreadCount > 0">Mark All as Read</button>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 border-b border-border overflow-x-auto">
      <button v-for="filter in filters" :key="filter" @click="activeFilter = filter" :class="['px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap', activeFilter === filter ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']">
        {{ filter }}
      </button>
    </div>

    <!-- Notifications List -->
    <div class="space-y-2">
      <div v-for="notification in filteredNotifications" :key="notification.id" :class="['p-4 border rounded-lg transition-colors cursor-pointer hover:bg-muted', !notification.read ? 'border-primary bg-primary/5' : 'border-border']" @click="toggleRead(notification.id)">
        <div class="flex items-start gap-4">
          <div class="text-2xl mt-1">{{ notification.icon }}</div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold">{{ notification.title }}</p>
            <p class="text-muted-foreground text-sm mt-1">{{ notification.message }}</p>
            <p class="text-xs text-muted-foreground mt-2">{{ notification.timestamp }}</p>
          </div>
          <div v-if="!notification.read" class="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredNotifications.length === 0" class="card text-center py-12">
      <p class="text-3xl mb-2">🔔</p>
      <h3 class="text-h3 font-bold mb-2">No Notifications</h3>
      <p class="text-muted-foreground">You're all caught up!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')
const filters = ['All', 'Events', 'Orders', 'Promotions', 'System']

const notifications = ref([
  {
    id: 1,
    type: 'event',
    title: 'Event Starting Soon',
    message: 'Summer Music Festival starts in 5 days. Get ready!',
    timestamp: '2 minutes ago',
    read: false,
    icon: '🎉',
  },
  {
    id: 2,
    type: 'order',
    title: 'Ticket Confirmed',
    message: 'Your tickets for Tech Conference 2025 have been confirmed.',
    timestamp: '1 hour ago',
    read: false,
    icon: '✓',
  },
  {
    id: 3,
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 20% off tickets to Jazz Night this weekend!',
    timestamp: '3 hours ago',
    read: true,
    icon: '🎁',
  },
  {
    id: 4,
    type: 'event',
    title: 'Similar Events Found',
    message: 'We found 5 similar events based on your preferences.',
    timestamp: 'Yesterday',
    read: true,
    icon: '🔍',
  },
  {
    id: 5,
    type: 'system',
    title: 'Security Update',
    message: 'Your account was accessed from a new device.',
    timestamp: '2 days ago',
    read: true,
    icon: '🔒',
  },
])

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'All') return notifications.value
  return notifications.value.filter(n => n.type === activeFilter.value.toLowerCase())
})

const toggleRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) notification.read = !notification.read
}

const markAllRead = () => {
  notifications.value.forEach(n => (n.read = true))
}
</script>
