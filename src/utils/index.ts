import dayjs from 'dayjs'

export const isUndefined = (value: unknown): value is undefined => value === undefined
export const isArray: typeof Array.isArray = Array.isArray
export const isNull = (value: unknown): value is null => value === null
export const isObject = (value: unknown): value is object => typeof value === 'object' && !isArray(value) && !isNull(value)
// eslint-disable-next-line ts/no-unsafe-function-type
export const isFunction = (value: unknown): value is Function => typeof value === 'function'
export const isString = (value: unknown): value is string => typeof value === 'string'
export const isNumber = (value: unknown): value is number => typeof value === 'number'

export function getDayOfWeek(date: number): string {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return days[date]
}

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
