import { describe, expect, it } from 'vitest'
import { getCssPx, isBoolean, isFunction, isNull, isNumber, isObject, isString, isUndefined } from './index.ts'

describe('utils', () => {
  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
  })

  it('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
  })

  it('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
  })

  it('isArray', () => {
    expect(Array.isArray([])).toBe(true)
    expect(Array.isArray(null)).toBe(false)
  })

  it('isFunction', () => {
    expect(isFunction(() => {
    })).toBe(true)
    expect(isFunction(null)).toBe(false)
  })

  it('isString', () => {
    expect(isString('')).toBe(true)
    expect(isString(123)).toBe(false)
  })

  it('isNumber', () => {
    expect(isNumber(123)).toBe(true)
    expect(isNumber('123')).toBe(false)
  })

  it('isBoolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean('true')).toBe(false)
  })

  it('getCssPx', () => {
    expect(getCssPx(123)).toBe('123px')
    expect(getCssPx('123px')).toBe('123px')
  })
})
