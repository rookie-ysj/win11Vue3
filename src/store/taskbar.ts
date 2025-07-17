import { defineStore } from 'pinia'
import { ref } from 'vue'
import { APPLICATION } from '@/constants'

const Taskbar = [
  'edge',
  'File Explorer',
  'Settings',
]

export enum TaskbarLocation {
  Left,
  Center,
}

const useTaskbar = defineStore('taskbar', () => {
  const apps = ref(APPLICATION.filter(app => Taskbar.includes(app.name)))

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
