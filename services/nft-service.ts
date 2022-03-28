import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import axios from 'axios'
import { abi } from '../artifacts/contracts/MyNFT.sol/MyNFT.json'
import { TokenMetadata } from '../pages/api/model/TokenMetadata'

const { API_URL, PUBLIC_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env

const web3 = createAlchemyWeb3(API_URL)

const nftContract = new web3.eth.Contract(abi as any, CONTRACT_ADDRESS)

export const tokens = async () => {
  const tokens: TokenMetadata[] = []

  try {
    const balance = await nftContract.methods.balanceOf(PUBLIC_KEY).call()

    for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
      const tokenId = await nftContract.methods
        .tokenOfOwnerByIndex(PUBLIC_KEY, tokenIndex)
        .call()
      const tokenURI = await nftContract.methods.tokenURI(tokenId).call()

      try {
        const meta = await axios.get<TokenMetadata>(tokenURI)
        tokens.push(meta.data)
      } catch (error) {
        console.error('Unable to read token meta ', error)
      }
    }
  } catch (error) {
    console.error('Unable to get tokens info ', error)
  }

  return tokens
}

export const mintNFT = async (tokenURI: string): Promise<string> => {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') //get latest nonce

  const transaction = {
    from: PUBLIC_KEY,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    gas: 500000, //Gwei 10^-9 ETH
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  try {
    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      PRIVATE_KEY
    )

    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    )

    return `The hash of your transaction is: ${transactionReceipt.blockHash} \nCheck Alchemy's Mempool to view the status of your transaction!`
  } catch (error) {
    return `Something went wrong when submitting your transaction: ${error}`
  }
}
