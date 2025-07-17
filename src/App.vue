<script lang="ts" setup>
import DesktopApp from '@/components/desktop-app/desktopApp.vue'
import SidePane from '@/components/side-pane/sidePane.vue'
import StartMenu from '@/components/start-menu/startMenu.vue'
import Taskbar from '@/components/taskbar/taskbar.vue'
import { useWallpaper } from '@/store'
import LockScreen from '@/views/lock-screen/lockScreen.vue'

const globalSetting = useWallpaper()
</script>

<template>
  <LockScreen v-if="globalSetting.lock" />
  <div class="desktop">
    <DesktopApp />
    <StartMenu />
    <SidePane />
  </div>
  <Taskbar />
</template>

<style scoped>
</style>
