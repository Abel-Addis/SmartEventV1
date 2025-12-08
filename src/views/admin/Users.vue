<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-h2 font-bold">User Management</h2>
        <p class="text-muted-foreground">Manage all platform users</p>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card p-4 sm:p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Search Users</label>
          <input v-model="searchQuery" type="text" placeholder="Name, email..." class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Status</label>
          <select v-model="filterStatus" class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Join Date</label>
          <input v-model="filterDate" type="date" class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
        </div>
        <div class="flex items-end">
          <button @click="applyFilters" class="w-full btn-primary">Apply Filters</button>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-border bg-muted">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-semibold">User</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Email</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Join Date</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="border-b border-border hover:bg-muted/50 transition-colors">
            <td class="px-4 py-3 font-medium">{{ user.name }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ user.email }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ user.joinDate }}</td>
            <td class="px-4 py-3">
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', user.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400']">
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-3 flex gap-2">
              <button @click="toggleUserStatus(user.id)" :class="['px-3 py-1 text-sm rounded-lg transition-colors', user.status === 'active' ? 'btn-outline hover:bg-red-100 text-red-600' : 'btn-outline hover:bg-green-100 text-green-600']">
                {{ user.status === 'active' ? 'Suspend' : 'Activate' }}
              </button>
              <button @click="viewUserDetails(user.id)" class="btn-outline px-3 py-1 text-sm">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('')
const filterDate = ref('')

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-15', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-02-20', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joinDate: '2024-01-10', status: 'suspended' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', joinDate: '2024-03-05', status: 'active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', joinDate: '2024-02-12', status: 'inactive' },
])

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !searchQuery.value || user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !filterStatus.value || user.status === filterStatus.value
    const matchesDate = !filterDate.value || user.joinDate === filterDate.value
    return matchesSearch && matchesStatus && matchesDate
  })
})

const applyFilters = () => {
  console.log('[v0] Filters applied - Search:', searchQuery.value, 'Status:', filterStatus.value, 'Date:', filterDate.value)
}

const toggleUserStatus = (userId) => {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    user.status = user.status === 'active' ? 'suspended' : 'active'
  }
}

const viewUserDetails = (userId) => {
  console.log('[v0] Viewing user details:', userId)
}
</script>
