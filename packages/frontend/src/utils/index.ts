import dayjs from 'dayjs'
import { isNumber } from 'es-toolkit/compat'

export function getCurrentDate() {
  return dayjs().format('YYYY-MM-DD')
}

export function getCurrentTime() {
  return dayjs().format('h:mm A')
}

export function getCssPx(value: number | string): string {
  if (isNumber((value)))
    return `${value}px`
  if (value.endsWith('px'))
    return value
  return `${value}px`
}
