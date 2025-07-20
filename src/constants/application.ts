import type { Application } from '@/types'

export const EDGE: Application = {
  name: 'Edge',
  icon: 'edge',
} as const

export const GITHUB: Application = {
  name: 'GitHub',
  icon: 'github',
  onClick: () => window.open('https://github.com/rookie-ysj/win11Vue3'),
} as const

export const FILE_EXPLORER: Application = {
  name: 'FileExplorer',
  icon: 'explorer',
} as const

export const SETTING: Application = {
  name: 'Setting',
  icon: 'settings',
} as const

export const COMPUTER: Application = {
  name: 'Computer',
  icon: 'win/user',
} as const

export const STORE: Application = {
  name: 'Store',
  icon: 'store',
} as const

export const RECYCLE_BIN: Application = {
  name: 'RecycleBin',
  icon: 'bin0',
} as const

export const APPLICATION: Application[] = [
  EDGE,
  GITHUB,
  FILE_EXPLORER,
  SETTING,
] as const
