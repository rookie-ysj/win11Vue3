import { describe, expect, it } from 'vitest'
import { getCssPx } from './index.ts'

describe('utils', () => {
  it('getCssPx', () => {
    expect(getCssPx(123)).toBe('123px')
    expect(getCssPx('123px')).toBe('123px')
  })
})
