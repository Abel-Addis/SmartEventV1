<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="card">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="section-title">Gate Persons</span>
          <h2 class="text-h2 mt-1">
            Manage Gate Scanners
          </h2>
          <p class="text-muted-foreground mt-1">
            Create and manage gate persons for event check-in
          </p>
        </div>
        <button class="btn-primary px-5 py-2.5 whitespace-nowrap" @click="openCreateModal">
          + Add Gate Person
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && gatePersons.length === 0" class="flex justify-center items-center py-12">
      <div class="text-muted-foreground">Loading gate persons...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-4 border border-destructive bg-destructive/10 rounded-lg">
      <p class="text-destructive">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="gatePersons.length === 0" class="card text-center py-12">
      <div class="text-4xl mb-4">🚪</div>
      <h4 class="font-semibold mb-2">No Gate Persons Yet</h4>
      <p class="text-sm text-muted-foreground mb-4">Create gate persons to manage event check-ins</p>
      <button class="btn-primary px-5 py-2.5" @click="openCreateModal">
        Add Gate Person
      </button>
    </div>

    <!-- Gate Persons Table -->
    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted/50 border-b border-border">
            <tr>
              <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Name</th>
              <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Email</th>
              <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Phone</th>
              <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Assignments</th>
              <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Status</th>
              <th class="text-right px-4 py-3 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="gatePerson in sortedGatePersons"
              :key="gatePerson.userId"
              class="border-b border-border hover:bg-muted/30 transition-colors"
            >
              <td class="px-4 py-3 text-sm font-medium text-foreground">
                {{ gatePerson.fullName }}
              </td>
              <td class="px-4 py-3 text-sm text-muted-foreground">
                {{ gatePerson.email }}
              </td>
              <td class="px-4 py-3 text-sm text-muted-foreground">
                {{ gatePerson.phoneNumber }}
              </td>
              <td class="px-4 py-3 text-sm">
                <div v-if="gatePerson.assignments && gatePerson.assignments.length > 0" class="space-y-1">
                  <div v-for="(assignment, idx) in gatePerson.assignments.slice(0, 2)" :key="idx" class="text-xs">
                    <span class="font-medium">{{ assignment.eventName }}</span>
                    <span v-if="assignment.gateName" class="text-muted-foreground"> - {{ assignment.gateName }}</span>
                  </div>
                  <div v-if="gatePerson.assignments.length > 2" class="text-xs text-muted-foreground">
                    +{{ gatePerson.assignments.length - 2 }} more
                  </div>
                </div>
                <span v-else class="text-muted-foreground text-xs">No assignments</span>
              </td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    gatePerson.isActive
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  ]"
                >
                  {{ gatePerson.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex justify-end gap-2">
                  <button
                    class="btn-outline px-3 py-1.5 text-xs"
                    @click="openEditModal(gatePerson)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn-outline px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                    @click="handleDelete(gatePerson)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="closeModal"
    >
      <div class="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3">{{ isEditMode ? 'Edit Gate Person' : 'Add Gate Person' }}</h3>
            <button class="text-muted-foreground hover:text-foreground" @click="closeModal">✕</button>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium mb-2">Full Name *</label>
              <input
                v-model="formData.fullName"
                type="text"
                required
                placeholder="Enter full name"
                class="input-field w-full"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium mb-2">Email *</label>
              <input
                v-model="formData.email"
                type="email"
                required
                placeholder="Enter email"
                class="input-field w-full"
                :disabled="isEditMode"
              />
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium mb-2">Phone Number *</label>
              <input
                v-model="formData.phoneNumber"
                type="tel"
                required
                placeholder="Enter phone number"
                class="input-field w-full"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-2">
                Password {{ isEditMode ? '(leave blank to keep current)' : '*' }}
              </label>
              <input
                v-model="formData.password"
                type="password"
                :required="!isEditMode"
                placeholder="Enter password"
                class="input-field w-full"
              />
            </div>

            <!-- Assignments Section -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium">Event Assignments</label>
                <button
                  type="button"
                  class="text-xs text-primary hover:underline"
                  @click="addAssignment"
                >
                  + Add Assignment
                </button>
              </div>

              <div v-if="formData.assignments.length === 0" class="text-sm text-muted-foreground">
                No assignments yet
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="(assignment, index) in formData.assignments"
                  :key="index"
                  class="p-3 border border-border rounded-lg space-y-2"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex-1 space-y-2">
                      <input
                        v-model="assignment.eventName"
                        type="text"
                        placeholder="Event Name"
                        class="input-field w-full text-sm"
                      />
                      <input
                        v-model="assignment.gateName"
                        type="text"
                        placeholder="Gate Name (optional)"
                        class="input-field w-full text-sm"
                      />
                      <textarea
                        v-model="assignment.notes"
                        placeholder="Notes (optional)"
                        rows="2"
                        class="input-field w-full text-sm"
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      class="text-destructive hover:text-destructive/80 text-sm"
                      @click="removeAssignment(index)"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex gap-3 pt-4">
              <button type="submit" class="btn-primary flex-1 py-2.5" :disabled="loading">
                {{ loading ? 'Saving...' : isEditMode ? 'Update' : 'Create' }}
              </button>
              <button type="button" class="btn-outline flex-1 py-2.5" @click="closeModal">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGatePersonStore } from '@/stores/gatePerson'

const gatePersonStore = useGatePersonStore()

// Local state
const showModal = ref(false)
const isEditMode = ref(false)
const editingGatePersonId = ref(null)
const formData = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  assignments: []
})

// Computed properties from store
const gatePersons = computed(() => gatePersonStore.gatePersons)
const sortedGatePersons = computed(() => gatePersonStore.sortedGatePersons)
const loading = computed(() => gatePersonStore.loading)
const error = computed(() => gatePersonStore.error)

// Fetch gate persons on mount
onMounted(async () => {
  await gatePersonStore.fetchGatePersons()
})

// Modal functions
const openCreateModal = () => {
  isEditMode.value = false
  editingGatePersonId.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (gatePerson) => {
  isEditMode.value = true
  editingGatePersonId.value = gatePerson.userId
  formData.value = {
    fullName: gatePerson.fullName,
    email: gatePerson.email,
    phoneNumber: gatePerson.phoneNumber,
    password: '',
    assignments: gatePerson.assignments ? [...gatePerson.assignments] : []
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    assignments: []
  }
}

// Assignment functions
const addAssignment = () => {
  formData.value.assignments.push({
    eventId: '',
    eventName: '',
    gateName: '',
    assignmentDate: new Date().toISOString(),
    notes: ''
  })
}

const removeAssignment = (index) => {
  formData.value.assignments.splice(index, 1)
}

// Form submission
const handleSubmit = async () => {
  const data = {
    fullName: formData.value.fullName,
    email: formData.value.email,
    phoneNumber: formData.value.phoneNumber,
    assignments: formData.value.assignments
  }

  // Only include password if provided
  if (formData.value.password) {
    data.password = formData.value.password
  }

  let result
  if (isEditMode.value) {
    result = await gatePersonStore.updateGatePerson(editingGatePersonId.value, data)
  } else {
    result = await gatePersonStore.createGatePerson(data)
  }

  if (result.success) {
    closeModal()
    alert(`Gate person ${isEditMode.value ? 'updated' : 'created'} successfully!`)
  } else {
    alert(`Failed: ${result.message}`)
  }
}

// Delete function
const handleDelete = async (gatePerson) => {
  const action = confirm(
    `Do you want to permanently delete or just deactivate ${gatePerson.fullName}?\n\nClick OK to DEACTIVATE (recommended)\nClick Cancel to go back`
  )

  if (action === false) return

  const hardDelete = confirm(
    'Click OK to PERMANENTLY DELETE\nClick Cancel to DEACTIVATE instead'
  )

  const result = await gatePersonStore.deleteGatePerson(gatePerson.userId, hardDelete)

  if (result.success) {
    alert(`Gate person ${hardDelete ? 'deleted' : 'deactivated'} successfully!`)
  } else {
    alert(`Failed: ${result.message}`)
  }
}
</script>
