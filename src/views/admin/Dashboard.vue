<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="card bg-linear-to-r from-primary/10 to-accent/10">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-h2 font-bold mb-2">Admin Control Center</h2>
          <p class="text-muted-foreground">Monitor and manage the entire platform</p>
        </div>
      </div>
    </div>

    <!-- Platform Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <stat-card label="Total Users" value="12,450" icon="👥" trend="24" />
      <stat-card label="Active Organizers" value="342" icon="🏢" trend="12" />
      <stat-card label="Total Events" value="1,248" icon="🎪" trend="38" />
      <stat-card label="Platform Revenue" value="$245,680" icon="💰" trend="45" />
    </div>

    <!-- System Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- User Activity -->
      <div class="card">
        <h3 class="text-h3 font-bold mb-4">User Activity (Last 7 Days)</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium">New Users</span>
            <span class="text-primary font-bold">+342</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2">
            <div class="bg-primary h-2 rounded-full" style="width: 78%"></div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium">Active Events</span>
            <span class="text-accent font-bold">+156</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2">
            <div class="bg-accent h-2 rounded-full" style="width: 65%"></div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium">Transactions</span>
            <span class="text-green-600 font-bold">+892</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2">
            <div class="bg-green-600 h-2 rounded-full" style="width: 92%"></div>
          </div>
        </div>
      </div>

      <!-- System Health -->
      <div class="card">
        <h3 class="text-h3 font-bold mb-4">System Health</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span class="font-medium">API Status</span>
            <span class="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm font-semibold">Operational</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span class="font-medium">Database</span>
            <span class="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm font-semibold">Operational</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span class="font-medium">Payment Gateway</span>
            <span class="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm font-semibold">Operational</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span class="font-medium">Email Service</span>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full text-sm font-semibold">Maintenance</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <router-link to="/admin/users" class="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer hover:bg-muted">
        <div class="text-4xl mb-3">👥</div>
        <h4 class="font-semibold">Manage Users</h4>
        <p class="text-sm text-muted-foreground">12,450 users</p>
      </router-link>
      <router-link to="/admin/organizers" class="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer hover:bg-muted">
        <div class="text-4xl mb-3">🏢</div>
        <h4 class="font-semibold">Organizers</h4>
        <p class="text-sm text-muted-foreground">342 organizers</p>
      </router-link>
      <router-link to="/admin/events" class="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer hover:bg-muted">
        <div class="text-4xl mb-3">🎪</div>
        <h4 class="font-semibold">Events</h4>
        <p class="text-sm text-muted-foreground">1,248 events</p>
      </router-link>
      <router-link to="/admin/reports" class="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer hover:bg-muted">
        <div class="text-4xl mb-3">📊</div>
        <h4 class="font-semibold">Reports</h4>
        <p class="text-sm text-muted-foreground">View analytics</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import StatCard from '@/components/StatCard.vue'
</script>
