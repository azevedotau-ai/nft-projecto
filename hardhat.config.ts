import dotenv from 'dotenv'
import '@nomiclabs/hardhat-ethers'

dotenv.config()

const { API_URL, PRIVATE_KEY } = process.env

export const solidity = '0.7.3'
export const defaultNetwork = 'ropsten'
export const networks = {
  hardhat: {},
  ropsten: {
    url: API_URL,
    accounts: [`0x${PRIVATE_KEY}`],
  },
}
