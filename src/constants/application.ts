import type { Application } from '@/types'

export const EDGE: Application = {
  name: 'Edge',
  icon: 'edge',
} as const

export const GITHUB: Application = {
  name: 'GitHub',
  icon: 'github',
} as const

export const FILE_EXPLORER: Application = {
  name: 'File Explorer',
  icon: 'explorer',
} as const

export const TASK_MANAGER: Application = {
  name: 'Task Manager',
  icon: 'task-manager',
} as const

export const SETTING: Application = {
  name: 'Setting',
  icon: 'setting',
} as const

export const APPLICATION: Application[] = [
  EDGE,
  GITHUB,
  FILE_EXPLORER,
  TASK_MANAGER,
  SETTING,
] as const
