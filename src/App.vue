<script lang="ts" setup>
import Calendar from '@/components/calendar/calendar.vue'
import DesktopApp from '@/components/desktop-app/desktopApp.vue'
import QuickSetting from '@/components/quick-setting/quickSetting.vue'
import SidePane from '@/components/side-pane/sidePane.vue'
import StartMenu from '@/components/start-menu/startMenu.vue'
import Taskbar from '@/components/taskbar/taskbar.vue'
import LockScreen from '@/views/lock-screen/lockScreen.vue'
</script>

<template>
  <LockScreen />
  <div class="full-screen">
    <div class="desktop">
      <DesktopApp />
      <StartMenu />
      <SidePane />
      <Calendar />
      <QuickSetting />
    </div>
    <Taskbar />
  </div>
</template>

<style scoped>
.full-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
