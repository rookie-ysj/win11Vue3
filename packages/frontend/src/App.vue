<script lang="ts" setup>
import Calendar from '@/components/calendar/calendar.vue'
import DesktopApp from '@/components/desktop-app/desktopApp.vue'
import QuickSetting from '@/components/quick-setting/quickSetting.vue'
import SidePane from '@/components/side-pane/sidePane.vue'
import StartMenu from '@/components/start-menu/startMenu.vue'
import Taskbar from '@/components/taskbar/taskbar.vue'
import Background from '@/containers/background/background.vue'
import LockScreen from '@/views/lock-screen/lockScreen.vue'
</script>

<template>
  <LockScreen />
  <div class="desktop">
    <Background />
    <DesktopApp />
    <StartMenu />
    <SidePane />
    <Calendar />
    <QuickSetting />
  </div>
  <Taskbar />
</template>

<style scoped>
.desktop {
  position: absolute;
  width: 100vw;
  height: calc(100vh - 48px);
  top: 0;
  overflow: hidden;
}
</style>
