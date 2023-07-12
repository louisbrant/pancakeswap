/* eslint-disable no-param-reassign */
import { Currency, ERC20Token, ChainId } from '@pancakeswap/sdk'
import { TokenAddressMap } from '@pancakeswap/token-lists'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import {
  combinedTokenMapFromActiveUrlsAtom,
  combinedTokenMapFromOfficialsUrlsAtom,
} from '../state/lists/hooks'
import useUserAddedTokens from '../state/user/hooks/useUserAddedTokens'
import { isAddress } from '../utils'
import useNativeCurrency from './useNativeCurrency'
import { useActiveChainId } from './useActiveChainId'
import multicall from '../utils/multicall'
import erc20ABI from '../config/abi/erc20.json'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import { FetchStatus } from '../config/constants/types'

const mapWithoutUrls = (tokenMap: TokenAddressMap<ChainId>, chainId: number) =>
  Object.keys(tokenMap[chainId] || {}).reduce<{ [address: string]: ERC20Token }>((newMap, address) => {
    const checksummedAddress = isAddress(address)

    if (checksummedAddress && !newMap[checksummedAddress]) {
      newMap[checksummedAddress] = tokenMap[chainId][address].token
    }

    return newMap
  }, {})

/**
 * Returns all tokens that are from active urls and user added tokens
 */
export function useAllTokens(): { [address: string]: ERC20Token } {
  const { chainId } = useActiveChainId()
  const tokenMap = useAtomValue(combinedTokenMapFromActiveUrlsAtom)
  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: ERC20Token }>(
          (tokenMap_, token) => {
            const checksummedAddress = isAddress(token.address)

            if (checksummedAddress) {
              tokenMap_[checksummedAddress] = token
            }

            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          mapWithoutUrls(tokenMap, chainId),
        )
    )
  }, [userAddedTokens, tokenMap, chainId])
}

/**
 * Returns all tokens that are from officials token list and user added tokens
 */
export function useOfficialsAndUserAddedTokens(): { [address: string]: ERC20Token } {
  const { chainId } = useActiveChainId()
  const tokenMap = useAtomValue(combinedTokenMapFromOfficialsUrlsAtom)

  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: ERC20Token }>(
          (tokenMap_, token) => {
            const checksummedAddress = isAddress(token.address)

            if (checksummedAddress) {
              tokenMap_[checksummedAddress] = token
            }

            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          mapWithoutUrls(tokenMap, chainId),
        )
    )
  }, [userAddedTokens, tokenMap, chainId])
}