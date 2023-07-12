import { useUserCakeLockStatus } from 'hooks/useUserCakeLockStatus'
import { useMemo } from 'react'
import { useCompetitionStatus } from './useCompetitionStatus'
import { useVotingStatus } from './useVotingStatus'

export const useMenuItemsStatus = (): Record<string, string> => {
  const competitionStatus = useCompetitionStatus()
  const votingStatus = useVotingStatus()
  const isUserLocked = useUserCakeLockStatus()

  return useMemo(() => {
    return {
      '/competition': competitionStatus,
      ...(votingStatus && {
        '/voting': votingStatus,
      }),
      ...(isUserLocked && {
        '/pools': 'lock_end',
      }),
    }
  }, [competitionStatus, votingStatus, isUserLocked])
}
