<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { useStartMenu } from '@/store'

const startMenuStore = useStartMenu()

const target = useTemplateRef('startMenuRef')
onClickOutside(target, () => {
  startMenuStore.toggleStartMenuOpen(false)
})
</script>

<template>
  <div v-if="startMenuStore.startMenuOpen" ref="startMenuRef">
    hello world
  </div>
</template>

<style scoped>

</style>
