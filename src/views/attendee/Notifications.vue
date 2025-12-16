<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-h2 font-bold mb-2">
          Notifications
        </h1>
        <p class="text-muted-foreground">
          {{ unreadCount }} unread notifications
        </p>
      </div>
      <button
        v-if="unreadCount > 0"
        class="btn-outline px-6 py-2"
        @click="markAllRead"
      >
        Mark All as Read
      </button>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 border-b border-border overflow-x-auto">
      <button
        v-for="filter in filters"
        :key="filter"
        :class="['px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap', activeFilter === filter ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']"
        @click="activeFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Notifications List -->
    <div class="space-y-2">
      <div
        v-for="notification in filteredNotifications"
        :key="notification.id"
        :class="['p-4 border rounded-lg transition-colors cursor-pointer hover:bg-muted', !notification.read ? 'border-primary bg-primary/5' : 'border-border']"
        @click="toggleRead(notification.id)"
      >
        <div class="flex items-start gap-4">
          <div class="text-2xl mt-1">
            {{ notification.icon }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold">
              {{ notification.title }}
            </p>
            <p class="text-muted-foreground text-sm mt-1">
              {{ notification.message }}
            </p>
            <p class="text-xs text-muted-foreground mt-2">
              {{ notification.timestamp }}
            </p>
          </div>
          <div
            v-if="!notification.read"
            class="flex-shrink-0 w-2 h-2 bg-primary rounded-full"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredNotifications.length === 0 && !loading"
      class="card text-center py-12"
    >
      <p class="text-3xl mb-2">
        🔔
      </p>
      <h3 class="text-h3 font-bold mb-2">
        No Notifications
      </h3>
      <p class="text-muted-foreground">
        You're all caught up!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const store = useNotificationStore()
const activeFilter = ref('All')
const filters = ['All', 'Events', 'Orders', 'System']

onMounted(() => {
  store.fetchNotifications()
})

const unreadCount = computed(() => store.unreadCount)
const loading = computed(() => store.loading)

// Map store notifications to UI format if needed, or use directly
const notifications = computed(() => store.sortedNotifications.map(n => ({
  id: n.id,
  title: n.title,
  message: n.message,
  type: n.type?.toLowerCase() || 'system',
  timestamp: new Date(n.createdAt).toLocaleString(),
  read: n.isRead,
  icon: getIcon(n.type)
})))

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'All') return notifications.value
  return notifications.value.filter(n => n.type === activeFilter.value.toLowerCase())
})

const toggleRead = (id) => {
  const n = notifications.value.find(x => x.id === id)
  if (n && !n.read) {
    store.markAsRead(id)
  }
}

const markAllRead = () => {
  store.markAllAsRead()
}

const getIcon = (type) => {
  switch(type?.toLowerCase()) {
    case 'event': return '🎉'
    case 'order': return '✓'
    case 'promotion': return '🎁'
    case 'security': return '🔒'
    default: return '📢'
  }
}
</script>
