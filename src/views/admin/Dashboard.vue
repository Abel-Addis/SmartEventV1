<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="card relative overflow-hidden bg-gradient-to-r from-secondary/80 via-card to-card/80">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.1),transparent_35%)]" />
      <div class="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-2">
          <span class="section-title">Command Center</span>
          <h2 class="text-h2 font-bold">
            Admin Control Center
          </h2>
          <p class="text-muted-foreground">
            Monitor health, growth, and trust across the platform.
          </p>
        </div>
        <div class="flex gap-2">
          <router-link to="/admin/reports" class="btn-outline px-4">View reports</router-link>
          <router-link to="/admin/settings" class="btn-primary px-4">System settings</router-link>
        </div>
      </div>
    </div>

    <!-- Platform Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <stat-card
        label="Total Users"
        value="12,450"
        icon="👥"
        trend="24"
      />
      <stat-card
        label="Active Organizers"
        value="342"
        icon="🏢"
        trend="12"
      />
      <stat-card
        label="Total Events"
        value="1,248"
        icon="🎪"
        trend="38"
      />
      <stat-card
        label="Platform Revenue"
        value="$245,680"
        icon="💰"
        trend="45"
      />
    </div>

    <!-- System Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- User Activity -->
      <div class="card space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-h3 font-bold">
          User Activity (Last 7 Days)
          </h3>
          <span class="px-3 py-1 rounded-full bg-accent/10 text-xs font-semibold text-accent-foreground border border-accent/30">Live</span>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium">New Users</span>
            <span class="text-primary font-bold">+342</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style="width: 78%" />
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium">Active Events</span>
            <span class="text-accent font-bold">+156</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div class="bg-accent h-2 rounded-full" style="width: 65%" />
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium">Transactions</span>
            <span class="text-foreground font-bold">+892</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-foreground/80 to-foreground/60 h-2 rounded-full" style="width: 92%" />
          </div>
        </div>
      </div>

      <!-- System Health -->
      <div class="card space-y-4">
        <h3 class="text-h3 font-bold">
          System Health
        </h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-muted/60 rounded-xl border border-border">
            <span class="font-medium">API Status</span>
            <span class="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-semibold">Operational</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-muted/60 rounded-xl border border-border">
            <span class="font-medium">Database</span>
            <span class="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-semibold">Operational</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-muted/60 rounded-xl border border-border">
            <span class="font-medium">Payment Gateway</span>
            <span class="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-semibold">Operational</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-muted/60 rounded-xl border border-border">
            <span class="font-medium">Email Service</span>
            <span class="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-semibold">Maintenance</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <router-link
        to="/admin/users"
        class="card hover:shadow-2xl transition-shadow text-center p-6 cursor-pointer hover:bg-sidebar-accent"
      >
        <div class="text-4xl mb-3">
          👥
        </div>
        <h4 class="font-semibold">
          Manage Users
        </h4>
        <p class="text-sm text-muted-foreground">
          12,450 users
        </p>
      </router-link>
      <router-link
        to="/admin/organizers"
        class="card hover:shadow-2xl transition-shadow text-center p-6 cursor-pointer hover:bg-sidebar-accent"
      >
        <div class="text-4xl mb-3">
          🏢
        </div>
        <h4 class="font-semibold">
          Organizers
        </h4>
        <p class="text-sm text-muted-foreground">
          342 organizers
        </p>
      </router-link>
      <router-link
        to="/admin/events"
        class="card hover:shadow-2xl transition-shadow text-center p-6 cursor-pointer hover:bg-sidebar-accent"
      >
        <div class="text-4xl mb-3">
          🎪
        </div>
        <h4 class="font-semibold">
          Events
        </h4>
        <p class="text-sm text-muted-foreground">
          1,248 events
        </p>
      </router-link>
      <router-link
        to="/admin/reports"
        class="card hover:shadow-2xl transition-shadow text-center p-6 cursor-pointer hover:bg-sidebar-accent"
      >
        <div class="text-4xl mb-3">
          📊
        </div>
        <h4 class="font-semibold">
          Reports
        </h4>
        <p class="text-sm text-muted-foreground">
          View analytics
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import StatCard from '@/components/StatCard.vue'
</script>
