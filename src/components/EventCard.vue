<template>
  <div class="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
    <div class="h-40 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
      <span class="text-5xl">🎉</span>
    </div>
    <div class="p-4">
      <h4 class="text-h4 font-semibold mb-1">{{ title }}</h4>
      <p class="text-muted-foreground text-sm mb-3">{{ description }}</p>
      <div class="flex items-center justify-between text-sm">
        <span class="text-muted-foreground">📅 {{ date }}</span>
        <span class="text-primary font-semibold">{{ price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  date: String,
  price: String,
})
</script>
