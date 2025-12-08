<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-h2 font-bold">Organizer Management</h2>
        <p class="text-muted-foreground">Manage and approve event organizers</p>
      </div>
    </div>

    <!-- Pending Approvals -->
    <div v-if="pendingOrganizers.length > 0" class="card bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/20">
      <div class="flex items-start gap-3">
        <span class="text-2xl">⚠️</span>
        <div class="flex-1">
          <h3 class="font-semibold mb-2">Pending Approvals</h3>
          <p class="text-sm text-muted-foreground mb-4">{{ pendingOrganizers.length }} organizers awaiting approval</p>
          <div class="space-y-2">
            <div v-for="org in pendingOrganizers" :key="org.id" class="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg">
              <div>
                <p class="font-medium">{{ org.name }}</p>
                <p class="text-sm text-muted-foreground">{{ org.email }}</p>
              </div>
              <div class="flex gap-2">
                <button @click="approveOrganizer(org.id)" class="btn-primary px-3 py-1 text-sm">Approve</button>
                <button @click="rejectOrganizer(org.id)" class="btn-outline px-3 py-1 text-sm">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Approved Organizers -->
    <div class="card">
      <h3 class="text-h3 font-bold mb-6">Approved Organizers</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="org in approvedOrganizers" :key="org.id" class="card hover:shadow-lg transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h4 class="font-semibold">{{ org.name }}</h4>
              <p class="text-sm text-muted-foreground">{{ org.events }} events</p>
            </div>
            <span class="text-2xl">🏢</span>
          </div>
          <p class="text-sm text-muted-foreground mb-3">{{ org.email }}</p>
          <div class="flex gap-2">
            <button @click="viewOrganizer(org.id)" class="btn-outline px-3 py-1 text-sm flex-1">View</button>
            <button @click="suspendOrganizer(org.id)" class="btn-outline px-3 py-1 text-sm flex-1 hover:bg-red-100 text-red-600">Suspend</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const organizers = ref([
  { id: 1, name: 'EventCo', email: 'contact@eventco.com', events: 15, status: 'approved' },
  { id: 2, name: 'Festival Productions', email: 'info@festival.com', events: 8, status: 'approved' },
  { id: 3, name: 'Concert Masters', email: 'hello@concertmasters.com', events: 22, status: 'approved' },
  { id: 4, name: 'Tech Conferences Ltd', email: 'apply@techconf.com', events: 0, status: 'pending' },
  { id: 5, name: 'Culture Events', email: 'info@cultureevents.com', events: 0, status: 'pending' },
])

const pendingOrganizers = computed(() => organizers.value.filter(o => o.status === 'pending'))
const approvedOrganizers = computed(() => organizers.value.filter(o => o.status === 'approved'))

const approveOrganizer = (id) => {
  const org = organizers.value.find(o => o.id === id)
  if (org) org.status = 'approved'
}

const rejectOrganizer = (id) => {
  organizers.value = organizers.value.filter(o => o.id !== id)
}

const suspendOrganizer = (id) => {
  const org = organizers.value.find(o => o.id === id)
  if (org) org.status = 'suspended'
}

const viewOrganizer = (id) => {
  console.log('[v0] Viewing organizer:', id)
}
</script>
