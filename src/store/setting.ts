import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { isUndefined } from '@/utils/judge.ts'

type Theme = 'light' | 'dark'

const useSetting = defineStore('setting', () => {
  // 用户名
  const user = reactive({
    username: '',
    avatar: '',
  })
  const setUsername = (value: string) => {
    user.username = value
  }

  // 主题
  const theme = ref<Theme>('dark')
  const setTheme = (value: Theme) => {
    theme.value = value
  }

  // 电池
  const battery = reactive({
    level: 100,
    charging: true,
    saveMode: false,
  })
  const setBattery = (value: number) => {
    battery.level = value
  }
  const toggleBatterySaveMode = () => {
    battery.saveMode = !battery.saveMode
  }

  // 亮度
  const brightness = ref(100)
  const setBrightness = (value: number) => {
    brightness.value = value
  }

  // 连接
  const connect = reactive({
    wifi: true,
    bluetooth: true,
    flyMode: false,
  })
  const toggleWifi = (value?: boolean) => {
    if (!isUndefined(value)) {
      connect.wifi = value
      return
    }
    connect.wifi = !connect.wifi
  }
  const toggleBluetooth = (value?: boolean) => {
    if (!isUndefined(value)) {
      connect.bluetooth = value
      return
    }
    connect.bluetooth = !connect.bluetooth
  }
  const toggleFlyMode = (value: boolean) => {
    connect.flyMode = value
    toggleBluetooth(!value)
    toggleWifi(!value)
  }

  return {
    user,
    setUsername,
    theme,
    setTheme,
    brightness,
    setBrightness,
    battery,
    setBattery,
    toggleBatterySaveMode,
    connect,
    toggleWifi,
    toggleBluetooth,
    toggleFlyMode,
  }
})

export default useSetting
