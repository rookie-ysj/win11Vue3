<script setup lang="ts">
import { useStartMenu } from '@/store'

const startMenuStore = useStartMenu()
</script>

<template>
  <div v-if="startMenuStore.startMenuOpen">
    hello world
  </div>
</template>

<style scoped>

</style>
