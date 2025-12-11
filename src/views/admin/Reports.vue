<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-h2 font-bold">
          Reports & Analytics
        </h2>
        <p class="text-muted-foreground">
          Platform performance and insights
        </p>
      </div>
      <button
        class="btn-primary px-6 py-2"
        @click="downloadReport"
      >
        Download Report
      </button>
    </div>

    <!-- Report Filters -->
    <div class="card p-4 sm:p-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Report Type</label>
          <select
            v-model="reportType"
            class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            <option value="revenue">
              Revenue Report
            </option>
            <option value="users">
              User Growth
            </option>
            <option value="events">
              Event Analytics
            </option>
            <option value="engagement">
              Engagement Metrics
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Date Range</label>
          <select
            v-model="dateRange"
            class="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            <option value="week">
              Last 7 Days
            </option>
            <option value="month">
              Last 30 Days
            </option>
            <option value="quarter">
              Last Quarter
            </option>
            <option value="year">
              Last Year
            </option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            class="w-full btn-primary"
            @click="generateReport"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <stat-card
        label="Total Revenue"
        value="$245,680"
        icon="💰"
        trend="42"
      />
      <stat-card
        label="User Growth"
        value="2,450"
        icon="📈"
        trend="18"
      />
      <stat-card
        label="Event Completion"
        value="92%"
        icon="✓"
        trend="5"
      />
      <stat-card
        label="Avg. Rating"
        value="4.7"
        icon="⭐"
        trend="3"
      />
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Trend -->
      <div class="card">
        <h3 class="text-h3 font-bold mb-4">
          Revenue Trend
        </h3>
        <div class="h-64 flex items-end gap-2">
          <div
            v-for="(bar, idx) in revenueTrend"
            :key="idx"
            class="flex-1 bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors"
            :style="{ height: bar + '%' }"
          >
            <div class="text-center text-xs text-muted-foreground mt-1">
              {{ bar }}%
            </div>
          </div>
        </div>
        <div class="flex justify-between text-xs text-muted-foreground mt-4">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      <!-- User Acquisition -->
      <div class="card">
        <h3 class="text-h3 font-bold mb-4">
          User Acquisition
        </h3>
        <div class="space-y-4">
          <div
            v-for="source in userSources"
            :key="source.name"
            class="flex items-center gap-3"
          >
            <div class="text-2xl">
              {{ source.icon }}
            </div>
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium">{{ source.name }}</span>
                <span class="text-sm font-bold">{{ source.percentage }}%</span>
              </div>
              <div class="w-full bg-muted rounded-full h-2">
                <div
                  class="bg-primary h-2 rounded-full"
                  :style="{ width: source.percentage + '%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="card">
      <h3 class="text-h3 font-bold mb-4">
        Recent Reports
      </h3>
      <div class="space-y-2">
        <div
          v-for="report in recentReports"
          :key="report.id"
          class="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        >
          <div>
            <p class="font-medium">
              {{ report.name }}
            </p>
            <p class="text-sm text-muted-foreground">
              Generated on {{ report.date }}
            </p>
          </div>
          <button
            class="btn-outline px-3 py-1 text-sm"
            @click="downloadReportFile(report.id)"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatCard from '@/components/StatCard.vue'

const reportType = ref('revenue')
const dateRange = ref('month')

const revenueTrend = [45, 55, 65, 58, 72, 68, 82]

const userSources = [
  { name: 'Organic Search', icon: '🔍', percentage: 45 },
  { name: 'Social Media', icon: '📱', percentage: 28 },
  { name: 'Direct', icon: '🔗', percentage: 18 },
  { name: 'Referral', icon: '🤝', percentage: 9 },
]

const recentReports = [
  { id: 1, name: 'Monthly Revenue Report - March 2025', date: '2025-03-31' },
  { id: 2, name: 'User Growth Analysis - March 2025', date: '2025-03-25' },
  { id: 3, name: 'Event Performance Report - March 2025', date: '2025-03-20' },
  { id: 4, name: 'Platform Health Check - March 2025', date: '2025-03-15' },
]

const generateReport = () => {
  console.log('[v0] Generating report:', reportType.value, dateRange.value)
}

const downloadReport = () => {
  console.log('[v0] Downloading current report')
}

const downloadReportFile = (id) => {
  console.log('[v0] Downloading report:', id)
}
</script>
