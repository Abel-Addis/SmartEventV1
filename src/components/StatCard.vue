<template>
  <div class="card">
    <div class="flex items-start justify-between mb-4">
      <div>
        <p class="text-muted-foreground text-sm font-medium">{{ label }}</p>
        <h3 class="text-h3 font-bold mt-1">{{ value }}</h3>
      </div>
      <span class="text-3xl">{{ icon }}</span>
    </div>
    <p class="text-sm text-muted-foreground">
      <span :class="trend > 0 ? 'text-green-600' : 'text-destructive'">{{ trend > 0 ? '+' : '' }}{{ trend }}%</span>
      from last month
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  icon: String,
  trend: {
    type: Number,
    default: 0,
  },
})
</script>
