import { defineStore } from 'pinia'
import { ref } from 'vue'

const useWallpaper = defineStore('wallpaper', () => {
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

export default useWallpaper
