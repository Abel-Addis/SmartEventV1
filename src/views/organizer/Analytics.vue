<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-h2 font-bold mb-2">Analytics</h1>
      <p class="text-muted-foreground">Summer Music Festival</p>
    </div>

    <!-- Time Period Selection -->
    <div class="card p-3 flex gap-2 flex-wrap">
      <button v-for="period in ['7d', '30d', '90d', 'All']" :key="period" @click="selectedPeriod = period" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', selectedPeriod === period ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80']">
        {{ period }}
      </button>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <stat-card label="Total Registrations" value="1,250" icon="👥" trend="18" />
      <stat-card label="Ticket Revenue" value="$93,750" icon="💰" trend="25" />
      <stat-card label="Check-in Rate" value="94.2%" icon="✓" trend="12" />
      <stat-card label="Satisfaction" value="4.8/5" icon="⭐" trend="8" />
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Registration Trend -->
      <div class="card">
        <h3 class="text-h4 font-bold mb-6">Registration Trend</h3>
        <div class="h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
          <p class="text-muted-foreground">Chart visualization placeholder</p>
        </div>
      </div>

      <!-- Ticket Type Distribution -->
      <div class="card">
        <h3 class="text-h4 font-bold mb-6">Ticket Distribution</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between mb-2">
              <p class="text-sm font-medium">General Admission</p>
              <p class="text-sm font-bold">850 (68%)</p>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div class="h-full bg-primary" style="width: 68%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <p class="text-sm font-medium">VIP Pass</p>
              <p class="text-sm font-bold">400 (32%)</p>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div class="h-full bg-accent" style="width: 32%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Demographics -->
      <div class="card">
        <h3 class="text-h4 font-bold mb-6">Attendee Demographics</h3>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-muted-foreground">18-25 years</span>
            <span class="font-bold">28%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">26-35 years</span>
            <span class="font-bold">42%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">36-50 years</span>
            <span class="font-bold">22%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">50+ years</span>
            <span class="font-bold">8%</span>
          </div>
        </div>
      </div>

      <!-- Conversion Funnel -->
      <div class="card">
        <h3 class="text-h4 font-bold mb-6">Conversion Funnel</h3>
        <div class="space-y-3">
          <div>
            <p class="text-sm font-medium mb-2">Page Views</p>
            <div class="h-10 bg-primary/20 rounded flex items-center px-3 text-sm font-bold">5,420</div>
          </div>
          <div class="text-center text-muted-foreground text-xs mb-2">↓ 42.3%</div>
          <div>
            <p class="text-sm font-medium mb-2">Visitors</p>
            <div class="h-10 bg-accent/20 rounded flex items-center px-3 text-sm font-bold">2,294</div>
          </div>
          <div class="text-center text-muted-foreground text-xs mb-2">↓ 54.5%</div>
          <div>
            <p class="text-sm font-medium mb-2">Registrations</p>
            <div class="h-10 bg-green-500/20 rounded flex items-center px-3 text-sm font-bold">1,250</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatCard from '@/components/StatCard.vue'

const selectedPeriod = ref('30d')
</script>
