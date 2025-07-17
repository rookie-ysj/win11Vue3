import type { Application } from '@/types'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { APPLICATION } from '@/constants'

interface ApplicationInfo extends Application {
  left: number
  top: number
  width: number
  height: number
  zIndex: number
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
  }
})

const useApplication = defineStore('application', () => {
  const applications = reactive<Record<string, ApplicationInfo>>(APPLICATION_INFO)

  return {
    applications,
  }
})

export default useApplication
