<template>
  <router-link :to="to" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" :class="{ 'bg-primary/10 text-primary': isActive }">
    <span class="text-lg">{{ icon }}</span>
    <span class="text-sm font-medium">{{ label }}</span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  to: String,
  icon: String,
  label: {
    type: String,
    default: 'Label',
  },
})

const isActive = computed(() => {
  return route.path.startsWith(props.to)
})
</script>
