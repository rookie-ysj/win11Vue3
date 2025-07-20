import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const walls = [
  'default/img0.jpg',
  'dark/img0.jpg',
  'ThemeA/img0.jpg',
  'ThemeA/img1.jpg',
  'ThemeA/img2.jpg',
  'ThemeA/img3.jpg',
  'ThemeB/img0.jpg',
  'ThemeB/img1.jpg',
  'ThemeB/img2.jpg',
  'ThemeB/img3.jpg',
  'ThemeC/img0.jpg',
  'ThemeC/img1.jpg',
  'ThemeC/img2.jpg',
  'ThemeC/img3.jpg',
  'ThemeD/img0.jpg',
  'ThemeD/img1.jpg',
  'ThemeD/img2.jpg',
  'ThemeD/img3.jpg',
]

const useWallpaper = defineStore('wallpaper', () => {
  const lock = ref(true)
  const setLock = (value: boolean) => {
    lock.value = value
  }

  const wallIndex = ref(0)
  const wallSrc = computed(() => walls[wallIndex.value])

  return {
    lock,
    setLock,
    wallIndex,
    wallSrc,
  }
}, {
  persist: true,
})

export default useWallpaper
