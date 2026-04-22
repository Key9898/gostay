import { describe, it, expect } from 'vitest'
import { cn, truncate, slugify, capitalize } from './helpers'

describe('cn', () => {
  it('merges conflicting tailwind classes, last wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('handles conditional values', () => {
    const show = false as boolean
    expect(cn('a', show && 'b', null, 'c')).toBe('a c')
  })
})

describe('truncate', () => {
  it('returns original when shorter than limit', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('adds ellipsis when cut', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })
})

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('strips punctuation', () => {
    expect(slugify('Bangkok, Thailand!')).toBe('bangkok-thailand')
  })

  it('collapses consecutive separators', () => {
    expect(slugify('a__b  c')).toBe('a-b-c')
  })
})

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('yangon')).toBe('Yangon')
  })

  it('returns empty string for empty input', () => {
    expect(capitalize('')).toBe('')
  })
})
