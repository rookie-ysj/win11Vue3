import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum TaskbarLocation {
  Left,
  Center,
}

const useTaskbar = defineStore('taskbar', () => {
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
    search,
    toggleSearch,
    widget,
    toggleWidget,
    location,
    setLocation,
  }
})

export default useTaskbar
