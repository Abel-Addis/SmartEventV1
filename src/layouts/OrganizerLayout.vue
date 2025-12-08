<template>
  <div class="flex min-h-screen bg-background">
    <!-- Mobile Sidebar Toggle -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-black/50 lg:hidden" @click="mobileMenuOpen = false"></div>

    <!-- Sidebar -->
    <aside :class="['fixed lg:relative w-64 h-screen bg-card border-r border-border flex flex-col transition-all z-40', !mobileMenuOpen && '-translate-x-full lg:translate-x-0']">
      <div class="p-6 border-b border-border">
        <router-link to="/" class="text-h4 font-bold text-primary hover:opacity-80">EventHub</router-link>
      </div>
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        <nav-item to="/organizer/dashboard" icon="📊">Dashboard</nav-item>
        <nav-item to="/organizer/create-event" icon="➕">Create Event</nav-item>
        <nav-item to="/organizer/events" icon="📋">My Events</nav-item>
        <nav-item to="/organizer/analytics" icon="📈">Analytics</nav-item>
        <nav-item to="/organizer/checkin" icon="✓">Check-in</nav-item>
        <nav-item to="/organizer/finance" icon="💰">Finance</nav-item>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col w-full">
      <!-- Top Header -->
      <header class="border-b border-border bg-card px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2 hover:bg-muted rounded-lg">
            <span class="text-xl">☰</span>
          </button>
          <h2 class="text-h4 hidden sm:block">
            <slot name="title">Organizer Dashboard</slot>
          </h2>
        </div>
        <div class="flex items-center gap-3">
          <router-link to="/organizer/notifications" class="p-2 hover:bg-muted rounded-lg relative">
            <span class="text-xl">🔔</span>
            <span class="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </router-link>
          <router-link to="/organizer/settings" class="p-2 hover:bg-muted rounded-lg">
            <span class="text-xl">⚙️</span>
          </router-link>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavItem from '@/components/NavItem.vue'

const mobileMenuOpen = ref(false)
</script>
