<script setup lang="ts">
import { useSidePane } from '@/store'

const sidePaneStore = useSidePane()
</script>

<template>
  <div v-show="sidePaneStore.quickSettingOpen">
    quickSetting
  </div>
</template>

<style scoped>

</style>
