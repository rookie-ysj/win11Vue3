import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { isUndefined } from '@/utils'

type Theme = 'light' | 'dark'

enum Audio {
  Mute,
  Low,
  Medium,
  High,
}

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

  // 音量
  const volume = ref(100)
  const volumeMode = computed(() => {
    return volume.value > 66 ? Audio.High : volume.value > 33 ? Audio.Medium : volume.value > 0 ? Audio.Low : Audio.Mute
  })
  const setVolume = (value: number) => {
    volume.value = value
  }

  // 电池
  const battery = reactive({
    level: 90,
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
  const brightOverlay = document.querySelector<HTMLDivElement>('#brightOverlay')!
  const setBrightness = (value: number) => {
    brightness.value = value
    brightOverlay.style.opacity = `${(100 - value) / 100}`
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
  const toggleFlyMode = (value?: boolean) => {
    if (isUndefined(value)) {
      value = !connect.flyMode
    }
    connect.flyMode = value
    if (value) {
      toggleWifi(false)
      toggleBluetooth(false)
    }
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
    volume,
    volumeMode,
    setVolume,
  }
})

export default useSetting
