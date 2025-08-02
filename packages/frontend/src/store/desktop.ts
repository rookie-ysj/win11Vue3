import type { Ref } from 'vue'
import type { Application } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { COMPUTER, FILE_EXPLORER, GITHUB, RECYCLE_BIN, STORE, TERMINAL } from '@/constants'

const Desktop = [
  GITHUB,
  FILE_EXPLORER,
  COMPUTER,
  STORE,
  RECYCLE_BIN,
  TERMINAL,
]

const useDesktop = defineStore('desktop', () => {
  const desktopApps = ref(Desktop) as Ref<Application[]>

  return {
    desktopApps,
  }
})

export default useDesktop
