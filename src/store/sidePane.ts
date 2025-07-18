import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSidePane = defineStore('sidePane', () => {
  // 日历和快速设置
  const calendarOpen = ref(false)
  const quickSettingOpen = ref(false)

  function toggleCalendarOpen(value: boolean) {
    calendarOpen.value = value
    value && toggleQuickSettingOpen(false)
  }

  function toggleQuickSettingOpen(value: boolean) {
    quickSettingOpen.value = value
    value && toggleCalendarOpen(false)
  }

  function closeAll() {
    toggleCalendarOpen(false)
    toggleQuickSettingOpen(false)
  }

  return {
    calendarOpen,
    quickSettingOpen,
    toggleCalendarOpen,
    toggleQuickSettingOpen,
    closeAll,
  }
})

export default useSidePane
