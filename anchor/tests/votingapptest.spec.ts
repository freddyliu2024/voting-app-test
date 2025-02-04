import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Votingapptest} from '../target/types/votingapptest'

describe('votingapptest', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Votingapptest as Program<Votingapptest>

  const votingapptestKeypair = Keypair.generate()

  it('Initialize Votingapptest', async () => {
    await program.methods
      .initialize()
      .accounts({
        votingapptest: votingapptestKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([votingapptestKeypair])
      .rpc()

    const currentCount = await program.account.votingapptest.fetch(votingapptestKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Votingapptest', async () => {
    await program.methods.increment().accounts({ votingapptest: votingapptestKeypair.publicKey }).rpc()

    const currentCount = await program.account.votingapptest.fetch(votingapptestKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Votingapptest Again', async () => {
    await program.methods.increment().accounts({ votingapptest: votingapptestKeypair.publicKey }).rpc()

    const currentCount = await program.account.votingapptest.fetch(votingapptestKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Votingapptest', async () => {
    await program.methods.decrement().accounts({ votingapptest: votingapptestKeypair.publicKey }).rpc()

    const currentCount = await program.account.votingapptest.fetch(votingapptestKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set votingapptest value', async () => {
    await program.methods.set(42).accounts({ votingapptest: votingapptestKeypair.publicKey }).rpc()

    const currentCount = await program.account.votingapptest.fetch(votingapptestKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the votingapptest account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        votingapptest: votingapptestKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.votingapptest.fetchNullable(votingapptestKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
