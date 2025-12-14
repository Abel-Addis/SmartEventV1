<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="card">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="section-title">Credits</span>
          <h2 class="text-h2 mt-1">
            Manage Your Credits
          </h2>
          <p class="text-muted-foreground mt-1">
            Credits are required to publish events ({{ eventPublishCost }} credits per event)
          </p>
        </div>
        <div class="flex items-center gap-3 px-6 py-3 rounded-lg bg-primary/10 border border-primary/20">
          <span class="text-3xl">💎</span>
          <div>
            <p class="text-xs text-muted-foreground">Current Balance</p>
            <p class="text-2xl font-bold text-primary">{{ currentBalance }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !purchaseInfo" class="flex justify-center items-center py-12">
      <div class="text-muted-foreground">Loading credit information...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-4 border border-destructive bg-destructive/10 rounded-lg">
      <p class="text-destructive">{{ error }}</p>
    </div>

    <!-- Purchase Credits Section -->
    <div v-else>
      <div class="mb-4">
        <h3 class="text-h3">Purchase Credits</h3>
        <p class="text-sm text-muted-foreground mt-1">
          {{ purchaseInfo?.message || 'Enter the number of credits you want to purchase' }}
        </p>
        <p class="text-sm font-medium text-primary mt-1">
          Price: {{ creditPriceETB }} ETB per credit
        </p>
      </div>

      <!-- Credit Purchase Form -->
      <div class="card max-w-md">
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Number of Credits</label>
            <input
              v-model.number="creditsToBy"
              type="number"
              min="1"
              placeholder="Enter credits amount"
              class="input-field w-full"
            />
          </div>

          <div class="p-4 rounded-lg bg-muted/50 border border-border">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-muted-foreground">Credits:</span>
              <span class="font-semibold">{{ creditsToBy || 0 }}</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-muted-foreground">Price per credit:</span>
              <span class="font-semibold">{{ creditPriceETB }} ETB</span>
            </div>
            <div class="h-px bg-border my-2"></div>
            <div class="flex justify-between items-center">
              <span class="font-semibold">Total Amount:</span>
              <span class="text-xl font-bold text-primary">{{ totalAmount }} ETB</span>
            </div>
          </div>

          <button
            class="btn-primary w-full py-2.5"
            @click="handlePurchase"
            :disabled="loading || !creditsToBy || creditsToBy < 1"
          >
            {{ loading ? 'Processing...' : 'Buy Credits' }}
          </button>
        </div>
      </div>

      <!-- Suggested Packages -->
      <div class="mt-6">
        <h4 class="text-sm font-semibold mb-3">Quick Select</h4>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            v-for="amount in [5, 10, 25, 50]"
            :key="amount"
            class="card hover:shadow-md transition-all hover:border-primary/30 p-4 text-center"
            @click="creditsToBy = amount"
          >
            <div class="text-2xl mb-1">💎</div>
            <div class="font-bold">{{ amount }}</div>
            <div class="text-xs text-muted-foreground">{{ amount * creditPriceETB }} ETB</div>
          </button>
        </div>
      </div>
    </div>

    <!-- Transaction History Section -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-h3">Transaction History</h3>
      </div>

      <!-- Loading Transactions -->
      <div v-if="loading && transactions.length === 0" class="card text-center py-12">
        <p class="text-muted-foreground">Loading transactions...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="transactions.length === 0" class="card text-center py-12">
        <div class="text-4xl mb-4">📜</div>
        <p class="text-muted-foreground">No transactions yet</p>
      </div>

      <!-- Transactions Table -->
      <div v-else class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-muted/50 border-b border-border">
              <tr>
                <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Date</th>
                <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Type</th>
                <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Description</th>
                <th class="text-right px-4 py-3 text-sm font-semibold text-foreground">Credits</th>
                <th class="text-right px-4 py-3 text-sm font-semibold text-foreground">Amount</th>
                <th class="text-left px-4 py-3 text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in sortedTransactions"
                :key="transaction.id"
                class="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td class="px-4 py-3 text-sm text-muted-foreground">
                  {{ formatDate(transaction.createdAt) }}
                </td>
                <td class="px-4 py-3">
                  <span
                    :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      transaction.type === 'Purchase'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    ]"
                  >
                    {{ transaction.type }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-foreground">
                  {{ transaction.description || 'N/A' }}
                </td>
                <td
                  :class="[
                    'px-4 py-3 text-sm font-semibold text-right',
                    transaction.creditsChanged > 0 ? 'text-primary' : 'text-muted-foreground'
                  ]"
                >
                  {{ transaction.creditsChanged > 0 ? '+' : '' }}{{ transaction.creditsChanged }}
                </td>
                <td class="px-4 py-3 text-sm text-muted-foreground text-right">
                  {{ transaction.totalAmount ? transaction.totalAmount.toFixed(2) + ' ETB' : '-' }}
                </td>
                <td class="px-4 py-3">
                  <span
                    :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      transaction.status === 'Completed' || transaction.status === 'Success'
                        ? 'bg-primary/10 text-primary'
                        : transaction.status === 'Pending'
                        ? 'bg-yellow-500/10 text-yellow-600'
                        : 'bg-destructive/10 text-destructive'
                    ]"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCreditStore } from '@/stores/credit'

const creditStore = useCreditStore()

// Local state
const creditsToBy = ref(null)

// Computed properties from store
const currentBalance = computed(() => creditStore.currentBalance)
const purchaseInfo = computed(() => creditStore.purchaseInfo)
const creditPriceETB = computed(() => creditStore.creditPriceETB)
const eventPublishCost = computed(() => creditStore.eventPublishCost)
const transactions = computed(() => creditStore.sortedTransactions)
const loading = computed(() => creditStore.loading)
const error = computed(() => creditStore.error)

// Computed total amount
const totalAmount = computed(() => {
  return (creditsToBy.value || 0) * creditPriceETB.value
})

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    creditStore.fetchBalance(),
    creditStore.fetchPurchaseInfo(),
    creditStore.fetchTransactions()
  ])
})

// Handle purchase
const handlePurchase = async () => {
  if (!creditsToBy.value || creditsToBy.value < 1) {
    alert('Please enter a valid number of credits')
    return
  }

  const confirmed = confirm(
    `Purchase ${creditsToBy.value} credits for ${totalAmount.value} ETB?`
  )
  
  if (confirmed) {
    const result = await creditStore.purchaseCredits(creditsToBy.value)

    if (result.success) {
      alert('Credit purchase initiated! Please complete the payment.')
      creditsToBy.value = null
    } else {
      alert(`Purchase failed: ${result.message}`)
    }
  }
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
