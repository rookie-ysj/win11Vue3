<script setup lang="ts">
import Icon from '@/components/icons/icon.vue'
import { useDesktop } from '@/store'

const desktopStore = useDesktop()
</script>

<template>
  <div v-for="app in desktopStore.desktopApps" :key="app.icon" class="desk-app" @click="app.onClick">
    <Icon class="desk-icon prtclk" :src="app.icon" pr width="36" />
    <div class="app-name">
      {{ $t(app.name) }}
    </div>
  </div>
</template>

<style scoped>
.desk-app {
  margin: 4px;
  height: 80px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8em;
  transition: all ease-in-out 200ms;
  justify-content: center;
  border: 1px solid transparent;

  &:focus {
    background: rgba(255, 255, 255, 0.24);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  &:focus {
    border: 1px dotted white;
  }

  .app-name {
    text-align: center;
    color: #fafafa;
    margin-top: 4px;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
  }
}
</style>
