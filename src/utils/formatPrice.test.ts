import { describe, it, expect } from 'vitest'
import { formatPrice, convertCurrency, getCurrencySymbol } from './formatPrice'

describe('formatPrice', () => {
  it('formats MMK with Ks suffix', () => {
    expect(formatPrice(480000, 'MMK')).toBe('480,000 Ks')
  })

  it('formats THB with Baht symbol', () => {
    expect(formatPrice(18500, 'THB')).toBe('18,500 ฿')
  })

  it('formats USD with $ symbol', () => {
    expect(formatPrice(1200, 'USD')).toBe('1,200 $')
  })

  it('defaults to MMK', () => {
    expect(formatPrice(1000)).toBe('1,000 Ks')
  })

  it('drops fractional digits', () => {
    expect(formatPrice(1234.56, 'USD')).toBe('1,235 $')
  })
})

describe('convertCurrency', () => {
  it('returns same amount when source and target match', () => {
    expect(convertCurrency(1000, 'MMK', 'MMK')).toBe(1000)
  })

  it('converts MMK to THB using rate', () => {
    const thb = convertCurrency(100000, 'MMK', 'THB')
    expect(thb).toBeCloseTo(1700, 0)
  })

  it('round-trips within floating-point tolerance', () => {
    const back = convertCurrency(convertCurrency(5000, 'MMK', 'USD'), 'USD', 'MMK')
    expect(back).toBeCloseTo(5000, 0)
  })
})

describe('getCurrencySymbol', () => {
  it.each([
    ['MMK', 'Ks'],
    ['THB', '฿'],
    ['USD', '$'],
  ] as const)('returns %s symbol', (cur, sym) => {
    expect(getCurrencySymbol(cur)).toBe(sym)
  })
})
