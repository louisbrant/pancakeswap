import useSWRImmutable from 'swr/immutable'

export const useVotingStatus = () => {
  const { data: votingStatus = null } = useSWRImmutable('anyActiveSoonCoreProposals', async () => {
    return null
  })
  return votingStatus
}
