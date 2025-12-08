<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-h2 font-bold">Notifications</h2>
        <p class="text-muted-foreground">System and platform notifications</p>
      </div>
      <button @click="markAllAsRead" class="btn-outline px-6 py-2">Mark All as Read</button>
    </div>

    <!-- Filter Tabs -->
    <div class="card flex border-b border-border">
      <button v-for="tab in notificationTabs" :key="tab.id" @click="selectedTab = tab.id" :class="['px-4 py-3 font-medium text-sm border-b-2 transition-colors', selectedTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']">
        {{ tab.label }}
      </button>
    </div>

    <!-- Notifications List -->
    <div class="space-y-3">
      <div v-for="notification in filteredNotifications" :key="notification.id" :class="['card hover:shadow-lg transition-shadow p-4 sm:p-6 border-l-4', notification.read ? 'opacity-75' : 'border-l-primary']">
        <div class="flex items-start gap-4">
          <span class="text-2xl">{{ notification.icon }}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4 mb-2">
              <h4 class="font-semibold">{{ notification.title }}</h4>
              <span class="text-xs text-muted-foreground whitespace-nowrap">{{ notification.time }}</span>
            </div>
            <p class="text-sm text-muted-foreground">{{ notification.message }}</p>
            <div class="flex items-center gap-2 mt-3">
              <button v-if="!notification.read" @click="markAsRead(notification.id)" class="text-xs text-primary hover:underline">Mark as read</button>
              <button @click="deleteNotification(notification.id)" class="text-xs text-muted-foreground hover:text-destructive">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTab = ref('all')

const notificationTabs = [
  { id: 'all', label: 'All' },
  { id: 'system', label: 'System' },
  { id: 'security', label: 'Security' },
  { id: 'reports', label: 'Reports' },
]

const notifications = ref([
  { id: 1, type: 'system', title: 'New Event Created', message: 'EventCo created "Summer Music Festival" event', icon: '🎪', time: '2 min ago', read: false },
  { id: 2, type: 'system', title: 'Organizer Registration', message: 'Tech Conferences Ltd applied to become an organizer', icon: '📝', time: '1 hour ago', read: false },
  { id: 3, type: 'security', title: 'Unusual Activity', message: 'Multiple failed login attempts detected from IP 192.168.1.1', icon: '🔒', time: '3 hours ago', read: false },
  { id: 4, type: 'reports', title: 'Revenue Report Ready', message: 'Your monthly revenue report is ready for download', icon: '📊', time: '5 hours ago', read: true },
  { id: 5, type: 'system', title: 'Event Flagged', message: 'Event "Jazz Night" has been flagged for moderation review', icon: '⚠️', time: '1 day ago', read: true },
])

const filteredNotifications = computed(() => {
  if (selectedTab.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === selectedTab.value)
})

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) notification.read = true
}

const deleteNotification = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

const markAllAsRead = () => {
  notifications.value.forEach(n => (n.read = true))
}
</script>
