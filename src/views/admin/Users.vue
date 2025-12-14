<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-h2 font-bold">
          User Management
        </h2>
        <p class="text-muted-foreground">
          Manage all platform users ({{ totalCount.toLocaleString() }} total)
        </p>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card p-4 sm:p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Search Users</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Name, email, phone..."
            class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            @keyup.enter="applyFilters"
          >
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Role</label>
          <select
            v-model="filterRole"
            class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            <option value="">
              All Roles
            </option>
            <option value="Attendee">
              Attendee
            </option>
            <option value="Organizer">
              Organizer
            </option>
            <option value="Admin">
              Admin
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Status</label>
          <select
            v-model="filterStatus"
            class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            <option value="">
              All Status
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            class="w-full btn-primary"
            @click="applyFilters"
            :disabled="loading"
          >
            {{ loading ? 'Searching...' : 'Apply Filters' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && users.length === 0" class="card text-center py-12">
      <p class="text-muted-foreground">Loading users...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="card p-4 border border-destructive bg-destructive/10">
      <p class="text-destructive">{{ error }}</p>
    </div>

    <!-- Users Table -->
    <div v-else class="card overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-border bg-muted">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-semibold">
              User
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold">
              Email
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold">
              Phone
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold">
              Role
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold">
              Join Date
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold">
              Status
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b border-border hover:bg-muted/50 transition-colors"
          >
            <td class="px-4 py-3 font-medium">
              {{ user.fullName }}
            </td>
            <td class="px-4 py-3 text-muted-foreground">
              {{ user.email }}
            </td>
            <td class="px-4 py-3 text-muted-foreground">
              {{ user.phoneNumber }}
            </td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  user.role === 'Organizer' ? 'bg-primary/10 text-primary' :
                  user.role === 'Admin' ? 'bg-accent/10 text-accent-foreground' :
                  'bg-muted text-muted-foreground'
                ]"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-4 py-3 text-muted-foreground">
              {{ formatDate(user.createdAt) }}
            </td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  user.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                ]"
              >
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-3 flex gap-2">
              <button
                :class="[
                  'px-3 py-1 text-sm rounded-lg transition-colors',
                  user.status === 'Active' ? 'btn-outline text-destructive hover:bg-destructive/10' : 'btn-primary'
                ]"
                @click="toggleUserStatus(user.id, user.status === 'Active')"
                :disabled="loading"
              >
                {{ user.status === 'Active' ? 'Deactivate' : 'Activate' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="users.length === 0 && !loading" class="text-center py-12">
        <p class="text-muted-foreground">No users found</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-between">
      <p class="text-sm text-muted-foreground">
        Showing {{ ((currentPage - 1) * pageSize) + 1 }} to {{ Math.min(currentPage * pageSize, totalCount) }} of {{ totalCount }} users
      </p>
      <div class="flex gap-2">
        <button
          class="btn-outline px-3 py-1 text-sm"
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1 || loading"
        >
          Previous
        </button>
        <span class="px-3 py-1 text-sm">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          class="btn-outline px-3 py-1 text-sm"
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages || loading"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()

// Local state
const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(20)

// Computed properties from store
const users = computed(() => adminStore.users)
const loading = computed(() => adminStore.loading)
const error = computed(() => adminStore.error)
const totalCount = computed(() => adminStore.usersPagination.totalCount)
const totalPages = computed(() => adminStore.usersPagination.totalPages)

// Fetch users on mount
onMounted(async () => {
  await fetchUsers()
})

// Fetch users with current filters
const fetchUsers = async () => {
  const params = {
    pageNumber: currentPage.value,
    pageSize: pageSize.value,
    ...(filterRole.value && { role: filterRole.value }),
    ...(filterStatus.value && { status: filterStatus.value }),
  }

  // If search query exists, use search endpoint
  if (searchQuery.value.trim()) {
    const searchParams = {
      fullName: searchQuery.value,
      email: searchQuery.value,
      phoneNumber: searchQuery.value,
    }
    await adminStore.fetchAllUsers(params) // For now, use getAllUsers
    // TODO: Implement proper search when backend supports it
  } else {
    await adminStore.fetchAllUsers(params)
  }
}

// Apply filters
const applyFilters = async () => {
  currentPage.value = 1 // Reset to first page
  await fetchUsers()
}

// Change page
const changePage = async (page) => {
  currentPage.value = page
  await fetchUsers()
}

// Toggle user status
const toggleUserStatus = async (userId, isCurrentlyActive) => {
  const action = isCurrentlyActive ? 'deactivate' : 'activate'
  const confirmed = confirm(`Are you sure you want to ${action} this user?`)
  
  if (confirmed) {
    const result = await adminStore.updateUserStatus(userId, !isCurrentlyActive)
    if (result.success) {
      alert(`User ${action}d successfully!`)
    } else {
      alert(`Failed to ${action} user: ${result.message}`)
    }
  }
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
