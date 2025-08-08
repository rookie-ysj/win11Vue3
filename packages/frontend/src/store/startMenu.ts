import { isUndefined } from 'es-toolkit'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
