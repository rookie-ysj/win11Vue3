<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { useSidePane } from '@/store'

const sidePaneStore = useSidePane()

const target = useTemplateRef('calendarRef')
onClickOutside(target, () => {
  sidePaneStore.toggleCalendarOpen(false)
})
</script>

<template>
  <div v-show="sidePaneStore.calendarOpen" ref="calendarRef">
    我是内容
  </div>
</template>

<style scoped>

</style>
