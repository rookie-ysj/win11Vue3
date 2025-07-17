<script setup lang="ts">
import { useSidePane } from '@/store'

const sidePaneStore = useSidePane()
</script>

<template>
  <div v-if="sidePaneStore.sidePaneOpen" class="side-pane">
    我是侧边栏
  </div>
</template>

<style scoped>
.side-pane {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px
}
</style>
