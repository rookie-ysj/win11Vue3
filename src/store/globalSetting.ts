import { defineStore } from 'pinia'
import { ref } from 'vue'

const useGlobalSetting = defineStore('globalSetting', () => {
  const lock = ref(true)
  const setLock = (value: boolean) => {
    lock.value = value
  }

  return {
    lock,
    setLock,
  }
}, {
  persist: true,
})

export default useGlobalSetting
