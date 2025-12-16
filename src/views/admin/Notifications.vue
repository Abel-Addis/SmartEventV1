<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-h2 font-bold">
          Notifications
        </h2>
        <p class="text-muted-foreground">
          System and platform notifications
        </p>
      </div>
      <div class="flex gap-2">
        <button
          class="btn-outline px-6 py-2"
          @click="sendTest"
          :disabled="sendingTest"
        >
          {{ sendingTest ? 'Sending...' : 'Send Test' }}
        </button>
        <button
          class="btn-outline px-6 py-2"
          @click="handleMarkAllRead"
          :disabled="loading || unreadCount === 0"
        >
          Mark All as Read
        </button>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="card flex border-b border-border">
      <button
        v-for="tab in notificationTabs"
        :key="tab.id"
        :class="['px-4 py-3 font-medium text-sm border-b-2 transition-colors', selectedTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']"
        @click="selectedTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading && sortedNotifications.length === 0" class="text-center py-12 text-muted-foreground">
      Loading notifications...
    </div>

    <!-- Empty State -->
    <div v-else-if="sortedNotifications.length === 0" class="text-center py-12 text-muted-foreground">
      No notifications found.
    </div>

    <!-- Notifications List -->
    <div v-else class="space-y-3">
      <div
        v-for="notification in filteredNotifications"
        :key="notification.id"
        :class="['card hover:shadow-lg transition-shadow p-4 sm:p-6 border-l-4', notification.isRead ? 'opacity-75' : 'border-l-primary']"
      >
        <div class="flex items-start gap-4">
          <span class="text-2xl">{{ getIcon(notification.type) }}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4 mb-2">
              <h4 class="font-semibold">
                {{ notification.title }}
              </h4>
              <span class="text-xs text-muted-foreground whitespace-nowrap">{{ formatDate(notification.createdAt) }}</span>
            </div>
            <p class="text-sm text-muted-foreground">
              {{ notification.message }}
            </p>
            <div class="flex items-center gap-2 mt-3">
              <button
                v-if="!notification.isRead"
                class="text-xs text-primary hover:underline"
                @click="handleMarkRead(notification.id)"
              >
                Mark as read
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNotificationStore } from '../../stores/notification'
import { adminService } from '@/services/adminService'

const notificationStore = useNotificationStore()
const selectedTab = ref('all')
const sendingTest = ref(false)

const notificationTabs = [
  { id: 'all', label: 'All' },
  { id: 'General', label: 'General' },
  { id: 'System', label: 'System' },
  { id: 'Security', label: 'Security' },
]

const loading = computed(() => notificationStore.loading)
const sortedNotifications = computed(() => notificationStore.sortedNotifications)
const unreadCount = computed(() => notificationStore.unreadCount)

const filteredNotifications = computed(() => {
  if (selectedTab.value === 'all') return sortedNotifications.value
  // Assuming 'type' comes from backend as string or enum name
  return sortedNotifications.value.filter(n => n.type === selectedTab.value)
})

const getIcon = (type) => {
  switch (type) {
    case 'Security': return '🔒'
    case 'System': return '⚠️'
    case 'Success': return '✅'
    default: return '📢'
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diff = (now - date) / 1000 // seconds

  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  
  return date.toLocaleDateString()
}

const handleMarkRead = async (id) => {
  await notificationStore.markAsRead(id)
}

const handleMarkAllRead = async () => {
  await notificationStore.markAllAsRead()
}

const sendTest = async () => {
  sendingTest.value = true
  try {
    await adminService.sendTestNotification()
    // Refresh to show it
    await notificationStore.fetchNotifications()
  } catch (err) {
    alert('Failed to send test notification')
  } finally {
    sendingTest.value = false
  }
}

onMounted(() => {
  notificationStore.fetchNotifications()
})
</script>
