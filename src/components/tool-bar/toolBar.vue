<script setup lang="ts">
import Icon from '@/components/icons/icon.vue'

defineProps<{
  icon: string
  name: string
}>()
</script>

<template>
  <div>
    <Icon :icon="icon" />
    <span>{{ name }}</span>
  </div>
</template>

<style scoped>

</style>
