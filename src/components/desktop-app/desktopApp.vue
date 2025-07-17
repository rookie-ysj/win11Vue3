<script setup lang="ts">
import Icon from '@/components/icons/icon.vue'
import { useDesktop } from '@/store'

const desktopStore = useDesktop()
</script>

<template>
  <div>
    <Icon v-for="app in desktopStore.desktopApps" :key="app.icon" :icon="app.icon" />
  </div>
</template>

<style scoped>

</style>
