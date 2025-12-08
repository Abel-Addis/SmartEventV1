<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-h2 font-bold mb-2">Notifications</h1>
        <p class="text-muted-foreground">{{ unreadCount }} unread</p>
      </div>
      <button @click="markAllRead" class="btn-outline px-6 py-2" v-if="unreadCount > 0">Mark All as Read</button>
    </div>

    <div class="space-y-2">
      <div v-for="notification in notifications" :key="notification.id" :class="['p-4 border rounded-lg transition-colors cursor-pointer hover:bg-muted', !notification.read ? 'border-primary bg-primary/5' : 'border-border']" @click="toggleRead(notification.id)">
        <div class="flex items-start gap-4">
          <div class="text-2xl">{{ notification.icon }}</div>
          <div class="flex-1">
            <p class="font-semibold">{{ notification.title }}</p>
            <p class="text-muted-foreground text-sm mt-1">{{ notification.message }}</p>
            <p class="text-xs text-muted-foreground mt-2">{{ notification.timestamp }}</p>
          </div>
          <div v-if="!notification.read" class="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const notifications = ref([
  { id: 1, title: 'New Registration', message: '50 new attendees registered for Summer Music Festival', timestamp: '5 minutes ago', read: false, icon: '👥' },
  { id: 2, title: 'Payment Received', message: 'Payment of $5,250 received from ticket sales', timestamp: '2 hours ago', read: false, icon: '💰' },
  { id: 3, title: 'Event Reminder', message: 'Your event starts tomorrow at 4:00 PM', timestamp: '1 day ago', read: true, icon: '⏰' },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const toggleRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) notification.read = !notification.read
}

const markAllRead = () => {
  notifications.value.forEach(n => (n.read = true))
}
</script>
