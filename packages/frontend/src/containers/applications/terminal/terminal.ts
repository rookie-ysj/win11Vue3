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

export const MKDIR: Cmd = {
  name: 'mkdir',
  info: 'make directory',
}

export const TOUCH: Cmd = {
  name: 'touch',
  info: 'create file',
}

export const RM: Cmd = {
  name: 'rm',
  info: 'remove file',
}

export const LS: Cmd = {
  name: 'ls',
  info: 'list files',
}

export const CLEAR: Cmd = {
  name: 'clear',
  info: 'clear terminal',
}

export const IPCONFIG: Cmd = {
  name: 'ipconfig',
  info: 'show ipconfig',
}

export const EXIT: Cmd = {
  name: 'exit',
  info: 'exit terminal',
}

export const CMD_LIST = [
  HELP,
  PWD,
  CD,
  LS,
  CLEAR,
  IPCONFIG,
  EXIT,
  MKDIR,
  RM,
  TOUCH,
]
