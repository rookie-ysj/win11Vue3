import type { Ref } from 'vue'
import type { Application } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { EDGE, FILE_EXPLORER, SETTING, STORE } from '@/constants'

const Taskbar = [
  EDGE,
  FILE_EXPLORER,
  SETTING,
  STORE,
]

export enum TaskbarLocation {
  Left,
  Center,
}

const useTaskbar = defineStore('taskbar', () => {
  const apps = ref(Taskbar) as Ref<Application[]>

  // 搜索
  const search = ref(true)
  const toggleSearch = (show: boolean) => {
    search.value = show
  }

  // 小部件
  const widget = ref(true)
  const toggleWidget = (show: boolean) => {
    widget.value = show
  }

  // 位置
  const location = ref<TaskbarLocation>(TaskbarLocation.Center)
  const setLocation = (loc: TaskbarLocation) => {
    location.value = loc
  }

  return {
    apps,
    search,
    toggleSearch,
    widget,
    toggleWidget,
    location,
    setLocation,
  }
})

export default useTaskbar
