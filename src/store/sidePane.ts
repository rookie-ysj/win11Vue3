import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useSetting } from '@/store/index.ts'

const useSidePane = defineStore('sidePane', () => {
  // 日历和快速设置
  const calendarOpen = ref(false)
  const quickSettingOpen = ref(false)

  function toggleCalendarOpen(value: boolean) {
    calendarOpen.value = value
    if (value) {
      toggleQuickSettingOpen(false)
    }
  }

  function toggleQuickSettingOpen(value: boolean) {
    quickSettingOpen.value = value
    if (value) {
      toggleCalendarOpen(false)
    }
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
      state: computed(() => setting.connect.wifi),
      onClick: () => setting.toggleWifi(),
    },
    {
      ui: true,
      src: 'bluetooth',
      name: 'Bluetooth',
      state: computed(() => setting.connect.bluetooth),
      onClick: () => setting.toggleBluetooth(),
    },
    {
      ui: true,
      src: 'airplane',
      name: 'Flight Mode',
      state: computed(() => setting.connect.flyMode),
      onClick: () => setting.toggleFlyMode(),
    },
    {
      ui: true,
      src: 'saver',
      name: 'Battery Saver',
      state: computed(() => setting.battery.saveMode),
      onClick: () => setting.toggleBatterySaveMode(),
    },
    {
      ui: true,
      src: 'sun',
      name: 'Theme',
      // state: computed(() => setting.theme),
      state: computed(() => false),
      onClick: () => setting.toggleTheme(),
    },
    {
      ui: true,
      src: 'nightlight',
      name: 'Night Light',
      state: false,
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
