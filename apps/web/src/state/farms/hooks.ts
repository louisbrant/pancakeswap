import BigNumber from 'bignumber.js'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import { useMemo } from 'react'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
/**
 * @deprecated use the BUSD hook in /hooks
 */
export const usePriceCakeBusd = ({ forceMainnet } = { forceMainnet: false }): BigNumber => {
  const price = useCakeBusdPrice({ forceMainnet })
  return useMemo(() => (price ? new BigNumber(price.toSignificant(6)) : BIG_ZERO), [price])
}
