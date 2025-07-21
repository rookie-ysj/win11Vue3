import dayjs from 'dayjs'

export const isUndefined = (value: unknown): value is undefined => value === undefined
export const isArray: typeof Array.isArray = Array.isArray
export const isNull = (value: unknown): value is null => value === null
export const isObject = (value: unknown): value is object => typeof value === 'object' && !isArray(value) && !isNull(value)
// eslint-disable-next-line ts/no-unsafe-function-type
export const isFunction = (value: unknown): value is Function => typeof value === 'function'
export const isString = (value: unknown): value is string => typeof value === 'string'
export const isNumber = (value: unknown): value is number => typeof value === 'number'
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

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
