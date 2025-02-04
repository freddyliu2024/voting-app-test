// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import VotingapptestIDL from '../target/idl/votingapptest.json'
import type { Votingapptest } from '../target/types/votingapptest'

// Re-export the generated IDL and type
export { Votingapptest, VotingapptestIDL }

// The programId is imported from the program IDL.
export const VOTINGAPPTEST_PROGRAM_ID = new PublicKey(VotingapptestIDL.address)

// This is a helper function to get the Votingapptest Anchor program.
export function getVotingapptestProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...VotingapptestIDL, address: address ? address.toBase58() : VotingapptestIDL.address } as Votingapptest, provider)
}

// This is a helper function to get the program ID for the Votingapptest program depending on the cluster.
export function getVotingapptestProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Votingapptest program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return VOTINGAPPTEST_PROGRAM_ID
  }
}
