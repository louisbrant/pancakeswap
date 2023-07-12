import { ChainId, Currency, CurrencyAmount, Native, Token, WNATIVE } from '@pancakeswap/sdk'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency?.isNative ? WNATIVE[chainId] : currency?.isToken ? currency : undefined
}
