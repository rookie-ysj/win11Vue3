export interface Cmd {
  name: string
  info: string
}

export const HELP: Cmd = {
  name: 'help',
  info: 'show help',
}

export const PWD: Cmd = {
  name: 'pwd',
  info: 'show work path',
}

export const CD: Cmd = {
  name: 'cd',
  info: 'change work path',
}

export const LS: Cmd = {
  name: 'ls',
  info: 'list files',
}

export const CLEAR: Cmd = {
  name: 'clear',
  info: 'clear terminal',
}

export const CMD_LIST = [
  HELP,
  PWD,
  CD,
  LS,
  CLEAR,
]
