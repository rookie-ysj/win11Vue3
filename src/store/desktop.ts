import { defineStore } from 'pinia'
import { ref } from 'vue'
import { APPLICATION } from '@/constants'

const Desktop = [
  'GitHub',
]

const useDesktop = defineStore('desktop', () => {
  const desktopApps = ref(APPLICATION.filter(app => Desktop.includes(app.name)))

  return {
    desktopApps,
  }
})

export default useDesktop
