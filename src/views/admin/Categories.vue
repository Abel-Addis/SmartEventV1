<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-h2 font-bold">
          Category Management
        </h2>
        <p class="text-muted-foreground">
          Manage event categories
        </p>
      </div>
      <button
        class="btn-primary px-6 py-2"
        @click="showAddCategory = true"
      >
        Add Category
      </button>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="category in categories"
        :key="category.id"
        class="card hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h4 class="text-h4 font-bold">
              {{ category.name }}
            </h4>
            <p class="text-muted-foreground text-sm">
              {{ category.events }} events
            </p>
          </div>
          <span class="text-2xl">{{ category.icon }}</span>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          {{ category.description }}
        </p>
        <div class="flex gap-2">
          <button
            class="btn-outline px-3 py-1 text-sm flex-1"
            @click="editCategory(category.id)"
          >
            Edit
          </button>
          <button
            class="btn-outline px-3 py-1 text-sm flex-1 hover:bg-muted text-foreground"
            @click="deleteCategory(category.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Category Modal -->
    <div
      v-if="showAddCategory"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div class="card max-w-md w-full">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-h3 font-bold">
            {{ editingId ? 'Edit' : 'Add' }} Category
          </h3>
          <button
            class="text-2xl"
            @click="showAddCategory = false"
          >
            ✕
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Category Name</label>
            <input
              v-model="newCategory.name"
              type="text"
              placeholder="e.g., Music"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Icon</label>
            <input
              v-model="newCategory.icon"
              type="text"
              placeholder="e.g., 🎵"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Description</label>
            <textarea
              v-model="newCategory.description"
              placeholder="Category description..."
              rows="3"
              class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>
          <div class="flex gap-2">
            <button
              class="btn-primary flex-1"
              @click="saveCategory"
            >
              {{ editingId ? 'Update' : 'Add' }}
            </button>
            <button
              class="btn-outline flex-1"
              @click="showAddCategory = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAddCategory = ref(false)
const editingId = ref(null)
const newCategory = ref({ name: '', icon: '', description: '' })

const categories = ref([
  { id: 1, name: 'Music', icon: '🎵', events: 245, description: 'Live concerts, DJ nights, and music festivals' },
  { id: 2, name: 'Sports', icon: '⚽', events: 189, description: 'Sporting events and tournaments' },
  { id: 3, name: 'Technology', icon: '💻', events: 156, description: 'Tech talks, conferences, and workshops' },
  { id: 4, name: 'Arts & Culture', icon: '🎨', events: 134, description: 'Art exhibitions and cultural events' },
  { id: 5, name: 'Food & Wine', icon: '🍷', events: 98, description: 'Culinary events and tastings' },
  { id: 6, name: 'Business', icon: '💼', events: 87, description: 'Networking and business events' },
])

const editCategory = (id) => {
  const category = categories.value.find(c => c.id === id)
  if (category) {
    newCategory.value = { ...category }
    editingId.value = id
    showAddCategory.value = true
  }
}

const deleteCategory = (id) => {
  categories.value = categories.value.filter(c => c.id !== id)
}

const saveCategory = () => {
  if (editingId.value) {
    const index = categories.value.findIndex(c => c.id === editingId.value)
    if (index !== -1) {
      categories.value[index] = { ...categories.value[index], ...newCategory.value }
    }
    editingId.value = null
  } else {
    categories.value.push({
      id: Math.max(...categories.value.map(c => c.id), 0) + 1,
      ...newCategory.value,
      events: 0,
    })
  }
  newCategory.value = { name: '', icon: '', description: '' }
  showAddCategory.value = false
}
</script>
