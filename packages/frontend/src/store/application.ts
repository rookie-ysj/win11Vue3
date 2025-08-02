import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { APPLICATION } from '@/constants'
import { Application } from '@/types'
import { isBoolean } from '@/utils'

interface ApplicationInfo extends Application {
  left: number
  top: number
  width: number
  height: number
  zIndex: number
  hide: boolean
  open: boolean
}

const APPLICATION_INFO: Record<string, ApplicationInfo> = {}
APPLICATION.forEach((app) => {
  APPLICATION_INFO[app.name] = {
    ...app,
    left: 0,
    top: 0,
    width: 300,
    height: 200,
    zIndex: 1,
    hide: true,
    open: false,
  }
},
)

const useApplication = defineStore('application', () => {
  const applications = reactive<Record<string, ApplicationInfo>>(APPLICATION_INFO)
  const zIndex = ref(1)

  function setApplicationInfo(name: string, info: Partial<ApplicationInfo>) {
    applications[name] = {
      ...applications[name],
      ...info,
    }
  }

  function toggleApplicationHide(name: string, hide?: boolean) {
    if (!isBoolean(hide)) {
      hide = !applications[name].hide
    }
    applications[name].hide = hide
    applications[name].open = true
    if (!hide) {
      zIndex.value++
      applications[name].zIndex = zIndex.value
    }
  }

  function toggleApplicationOpen(name: string, open?: boolean) {
    if (!isBoolean(open)) {
      open = !applications[name].open
    }
    applications[name].open = open
    applications[name].hide = true
    if (open) {
      zIndex.value++
      applications[name].zIndex = zIndex.value
    }
  }

  return {
    applications,
    setApplicationInfo,
    toggleApplicationHide,
    toggleApplicationOpen,
    zIndex,
  }
})

export default useApplication
