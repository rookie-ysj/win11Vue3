<script setup lang="ts">
import Battery from '@/components/battery/battery.vue'
import Icon from '@/components/icons/icon.vue'
import { useSetting, useSidePane, useStartMenu, useTaskbar } from '@/store'
import { TaskbarLocation } from '@/store/taskbar.ts'
import { getCurrentDate, getCurrentTime } from '@/utils'

const taskbar = useTaskbar()
const setting = useSetting()
const { toggleQuickSettingOpen, toggleCalendarOpen } = useSidePane()
const { toggleStartMenuOpen } = useStartMenu()
</script>

<template>
  <div class="taskbar flex">
    <div class="task-mid" :style="{ justifyContent: taskbar.location === TaskbarLocation.Left ? 'left' : 'center' }">
      <Icon src="home" class="tsIcon" @click="toggleStartMenuOpen()" />
      <Icon v-if="taskbar.search" class="tsIcon" icon="search" invert />
      <Icon v-for="app in taskbar.apps" :key="app.icon" class="tsIcon" :src="app.icon" />
    </div>
    <div class="task-right">
      <Icon fa-icon="faChevronUp" class="h-full tsIcon" :width="16" invert />
      <div class="px-2 prtclk handcr hvlight rounded flex h-full" @click="toggleQuickSettingOpen(true)">
        <Icon src="wifi" ui :width="16" class="taskIcon" />
        <Icon :src="`audio${setting.audio.mode}`" :width="16" ui class="taskIcon" />
        <Battery class="taskIcon" />
      </div>
      <div class="taskDate handcr prtclk rounded hvlight h-full" @click="toggleCalendarOpen(true)">
        <div>{{ getCurrentTime() }}</div>
        <div>{{ getCurrentDate() }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.taskbar {
  --bg1: rgba(243, 243, 243, 0.85);
  --bg2: rgba(255, 255, 255, 0.67);

  position: absolute;
  width: 100vw;
  height: 48px;
  color: var(--dark-txt);
  background: var(--bg1);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  padding: 4px 0;

  & > div {
    height: 100%;
  }

}

.task-mid {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease-in-out 200ms;
}

.task-right {
  position: absolute;
  top: 4px;
  right: 0;
  width: auto;
  height: 40px !important;
  margin-left: 10px;
  display: flex;
}

.tsIcon {
  position: relative;
  width: 38px;
  height: 38px;
  margin: auto 3px;
  box-sizing: border-box;
  background: rgba(254, 254, 254, 0);
  transform-origin: center;
  animation: popintro 800ms ease-in-out;
  transition: all 0.2s ease;
  border-radius: 4px;

  &:after {
    content: "";
    position: absolute;
    display: block;
    bottom: 0;
    width: 0px;
    height: 3px;
    border-radius: 4px;
    background: #858585;
    transition: all 0.2s ease-in-out;
  }

  &[data-open="true"]:after {
    width: 6px;
  }

  &[data-active="true"]:after {
    width: 12px;
    background: var(--clrPrm);
  }

  &:hover,
  &[data-active="true"] {
    background: var(--bg2);
  }
}

:deep(.taskIcon) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 24px;

  svg {
    color: #303030;
  }
}

.hvlight:hover {
  background: rgba(255, 255, 255, 0.8);
  transition: all 200ms ease-in-out;
}

.hvdark:hover {
  background: rgba(0, 0, 0, 0.08);
  transition: all 200ms ease-in-out;
}

.taskDate {
  display: flex;
  padding: 0 8px;
  font-size: 11px;
  flex-direction: column;
  justify-content: center;

  div {
    width: 100%;
    text-align: center;
    font-weight: 400;
  }
}
</style>
