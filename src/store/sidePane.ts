import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSidePane = defineStore('sidePane', () => {
  const sidePaneOpen = ref(false)
  const toggleSidePaneOpen = (value: boolean) => {
    sidePaneOpen.value = value
  }
  return {
    sidePaneOpen,
    toggleSidePaneOpen,
  }
})

export default useSidePane
