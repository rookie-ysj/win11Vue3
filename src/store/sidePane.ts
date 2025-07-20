import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useSetting } from '@/store/index.ts'

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

  const setting = useSetting()
  const quickSetting = reactive([
    {
      ui: true,
      src: 'wifi',
      name: 'WiFi',
      state: setting.connect.wifi,
    },
    {
      ui: true,
      src: 'bluetooth',
      name: 'Bluetooth',
      state: setting.connect.bluetooth,
    },
    {
      ui: true,
      src: 'airplane',
      name: 'Flight Mode',
      state: setting.connect.flyMode,
    },
    {
      ui: true,
      src: 'saver',
      name: 'Battery Saver',
      state: setting.battery.saveMode,
    },
    {
      ui: true,
      src: 'sun',
      name: 'Theme',
      state: setting.theme,
    },
    {
      ui: true,
      src: 'nightlight',
      name: 'Night Light',
      state: 'system.display.nightlight.state',
    },
  ])

  return {
    calendarOpen,
    quickSettingOpen,
    toggleCalendarOpen,
    toggleQuickSettingOpen,
    closeAll,
    quickSetting,
  }
})

export default useSidePane
