import { defineStore } from 'pinia'
import { ref } from 'vue'

const useStartMenu = defineStore('startMenu', () => {
  const startMenuOpen = ref(false)
  const toggleStartMenuOpen = (value: boolean) => {
    startMenuOpen.value = value
  }
  return {
    startMenuOpen,
    toggleStartMenuOpen,
  }
})

export default useStartMenu
