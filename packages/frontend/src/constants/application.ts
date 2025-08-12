import type { Application } from '@/types'

export const EDGE: Application = {
  name: 'Edge',
  icon: 'edge',
  inTaskbar: true,
  inDesktop: true,
  inStartMenu: true,
} as const

export const GITHUB: Application = {
  name: 'GitHub',
  icon: 'github',
  inTaskbar: false,
  inDesktop: true,
  inStartMenu: false,
  onClick: () => window.open('https://github.com/rookie-ysj/win11Vue3'),
} as const

export const FILE_EXPLORER: Application = {
  name: 'FileExplorer',
  icon: 'explorer',
  inTaskbar: true,
  inDesktop: true,
  inStartMenu: true,
} as const

export const SETTING: Application = {
  name: 'Setting',
  icon: 'settings',
  inTaskbar: true,
  inDesktop: true,
  inStartMenu: true,
} as const

export const COMPUTER: Application = {
  name: 'Computer',
  icon: 'win/user',
  inTaskbar: false,
  inDesktop: true,
  inStartMenu: false,
} as const

export const STORE: Application = {
  name: 'Store',
  icon: 'store',
  inTaskbar: true,
  inDesktop: true,
  inStartMenu: true,
} as const

export const RECYCLE_BIN: Application = {
  name: 'RecycleBin',
  icon: 'bin0',
  inTaskbar: false,
  inDesktop: true,
  inStartMenu: false,
} as const

export const TERMINAL: Application = {
  name: 'Terminal',
  icon: 'terminal',
  inTaskbar: true,
  inDesktop: true,
  inStartMenu: true,
} as const

export const APPLICATION: Application[] = [
  EDGE,
  GITHUB,
  FILE_EXPLORER,
  SETTING,
  COMPUTER,
  STORE,
  RECYCLE_BIN,
  TERMINAL,
] as const
