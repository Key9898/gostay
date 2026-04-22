const CURRENCY_SYMBOLS = {
  MMK: 'Ks',
  THB: '฿',
  USD: '$',
} as const

const EXCHANGE_RATES = {
  MMK: 1,
  THB: 0.017,
  USD: 0.00048,
} as const

export type Currency = keyof typeof CURRENCY_SYMBOLS

export function formatPrice(
  amount: number,
  currency: Currency = 'MMK',
  locale: string = 'en-US'
): string {
  const symbol = CURRENCY_SYMBOLS[currency]
  const formattedAmount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
  return `${formattedAmount} ${symbol}`
}

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  if (fromCurrency === toCurrency) return amount
  const inMMK = amount / EXCHANGE_RATES[fromCurrency]
  return inMMK * EXCHANGE_RATES[toCurrency]
}

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency]
}
