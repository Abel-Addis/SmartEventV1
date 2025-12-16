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
        :value="currency(totalRevenue)"
        icon="💰"
        :trend="revenueSummary.totalCreditsPurchased || 0"
      />
      <stat-card
        label="Credit Revenue"
        :value="currency(revenueSummary.totalCreditRevenueETB)"
        icon="📈"
        :trend="revenueSummary.totalCreditsPurchased || 0"
      />
      <stat-card
        label="Publish Revenue"
        :value="currency(revenueSummary.totalPublishRevenueETB)"
        icon="✓"
        :trend="revenueSummary.totalEventsPublished || 0"
      />
      <stat-card
        label="Boost Revenue"
        :value="currency(revenueSummary.totalBoostRevenueETB)"
        icon="⭐"
        :trend="revenueSummary.totalEventsBoosted || 0"
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
import { ref, onMounted, computed } from 'vue'
import StatCard from '@/components/StatCard.vue'
import { adminService } from '@/services/adminService'

const reportType = ref('revenue')
const dateRange = ref('month')
const loading = ref(false)
const revenueSummary = ref({
  totalCreditRevenueETB: 0,
  totalCreditsPurchased: 0,
  totalPublishRevenueETB: 0,
  totalBoostRevenueETB: 0,
  totalEventsPublished: 0,
  totalEventsBoosted: 0,
})
const boostAnalytics = ref([])

const currency = (v) => `ETB ${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
const percent = (v) => `${Math.round(v || 0)}%`

const totalRevenue = computed(() =>
  (revenueSummary.value.totalCreditRevenueETB || 0) +
  (revenueSummary.value.totalPublishRevenueETB || 0) +
  (revenueSummary.value.totalBoostRevenueETB || 0)
)

const revenueTrend = computed(() => {
  if (!boostAnalytics.value.length) return [30, 40, 35, 45, 50, 55, 60]
  const max = Math.max(...boostAnalytics.value.map(b => b.revenueGeneratedETB || 0), 1)
  return boostAnalytics.value.slice(0, 7).map(b => Math.min(100, Math.round((b.revenueGeneratedETB || 0) / max * 100)))
})

const userSources = computed(() => {
  if (!boostAnalytics.value.length) {
    return [
      { name: 'Boost Level 1', icon: '⚡', percentage: 40 },
      { name: 'Boost Level 2', icon: '⚡', percentage: 30 },
      { name: 'Boost Level 3', icon: '⚡', percentage: 20 },
      { name: 'Other', icon: '⚡', percentage: 10 },
    ]
  }
  const max = boostAnalytics.value.reduce((sum, b) => sum + (b.totalTimesUsed || 0), 0) || 1
  return boostAnalytics.value.slice(0, 4).map(b => ({
    name: b.boostLevelName,
    icon: '⚡',
    percentage: Math.round(((b.totalTimesUsed || 0) / max) * 100)
  }))
})

const recentReports = ref([])

const fetchData = async () => {
  loading.value = true
  try {
    const [rev, boosts] = await Promise.all([
      adminService.getPlatformRevenue(),
      adminService.getBoostAnalytics(),
    ])
    revenueSummary.value = rev || revenueSummary.value
    boostAnalytics.value = boosts || []
    recentReports.value = (boosts || []).slice(0, 4).map((b, idx) => ({
      id: b.boostLevelId || idx,
      name: `${b.boostLevelName} analytics`,
      date: new Date().toISOString().slice(0, 10),
    }))
  } catch (err) {
    alert(err?.response?.data?.message || err.message || 'Failed to load reports')
  } finally {
    loading.value = false
  }
}

const generateReport = () => {}
const downloadReport = () => {}
const downloadReportFile = () => {}

onMounted(fetchData)
</script>