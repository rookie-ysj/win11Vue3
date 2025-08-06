import { TreeEntity } from '@/api/data-contracts.ts'

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

export const TREE: Cmd = {
  name: 'tree',
  info: 'show tree',
}

export function generateTreeVisual(tree: TreeEntity) {
  let result = `<div class="flex">${tree.name ?? '~'}`
  if (tree.children.length > 0) {
    result += `—<div class="flex flex-col">`
    tree.children.forEach((child, index) => {
      const res = generateTreeVisual(child)
      const className = ['flex']
      if (tree.children.length > 1) {
        className.push('terminal__tree__item')
        if (index === 0) {
          className.push('terminal__tree__item--first')
        }
        else if (index === tree.children.length - 1) {
          className.push('terminal__tree__item--last')
        }
      }
      result += `<div class="${className.join(' ')}">————${res}</div>`
    })
    result += '</div>'
  }
  result += '</div>'
  return result
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
  TREE,
]
