import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isUndefined } from '@/utils'

const useStartMenu = defineStore('startMenu', () => {
  const startMenuOpen = ref(false)
  const toggleStartMenuOpen = (value?: boolean) => {
    if (!isUndefined(value)) {
      startMenuOpen.value = value
      return
    }
    startMenuOpen.value = !startMenuOpen.value
  }
  return {
    startMenuOpen,
    toggleStartMenuOpen,
  }
})

export default useStartMenu
