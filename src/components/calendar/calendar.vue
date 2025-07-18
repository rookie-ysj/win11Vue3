<script setup lang="ts">
import { useSidePane } from '@/store'

const sidePaneStore = useSidePane()
</script>

<template>
  <div v-show="sidePaneStore.calendarOpen">
    擦了那人
  </div>
</template>

<style scoped>

</style>
