<script setup lang="ts">
import Icon from '@/components/icons/icon.vue'
import { useSidePane, useStartMenu, useTaskbar } from '@/store'
import { TaskbarLocation } from '@/store/taskbar.ts'

const taskbar = useTaskbar()
const { toggleSidePaneOpen } = useSidePane()
const { toggleStartMenuOpen } = useStartMenu()
</script>

<template>
  <div class="taskbar">
    <div :class="taskbar.location === TaskbarLocation.Left ? 'taskbar-left' : 'taskbar-center'">
      <Icon icon="start" @click="toggleStartMenuOpen(true)" />
      <Icon v-if="taskbar.search" icon="search" />
      <Icon v-for="app in taskbar.apps" :key="app.icon" :icon="app.icon" />
    </div>
    <div class="taskbar-right">
      <div @click="toggleSidePaneOpen(true)">
        <Icon icon="wifi" />
        <Icon icon="battery" />
        <Icon icon="volume" />
      </div>

      <Icon icon="time" />
    </div>
  </div>
</template>

<style scoped>
.taskbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem
}
</style>
