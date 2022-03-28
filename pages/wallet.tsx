import Head from "next/head";
import { useEffect, useState } from "react";
import MetaMaskOnboarding from '@metamask/onboarding'

let web3; // this is not suposed to be reactive
const forwarderOrigin = 'http://localhost:3000';
const alchemyEndpoint = "wss://eth-ropsten.ws.alchemyapi.io/v2/Ji2svmQPCSmogF_WigI3HDpEbtevKOlk";
const receiverWalletAddress = '0x0000000000000000000000000000000000000000';

export default function Wallet() {
  const [installed, setInstalled] = useState(false)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [lastTxHash, setLastTxHash] = useState('')

  const { ethereum, Web3 } = globalThis;

  useEffect(() => {
    if(!Web3) return;
    setInstalled(ethereum && ethereum.isMetaMask);
    web3 = new Web3(alchemyEndpoint);
    if(localStorage['account']) {
      setInstalled(true);
      setAccount(localStorage['account']);
    }
  }, [Web3])

  useEffect(() => {
    loadBalance()
  }, [account])

  const installExtension = async () => {
    console.log('installing extension...');
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
    onboarding.startOnboarding();
  }

  const connectWallet = async () => {
    console.log('connecting wallet...');
    await ethereum.request({ method: 'eth_requestAccounts' });
    const [newAccount] = await ethereum.request({ method: 'eth_accounts' });
    setAccount(newAccount);
    localStorage['account'] = newAccount;
  }

  const loadBalance = async () => {
    const newBalance = await web3.eth.getBalance(account)
    setBalance(web3.utils.fromWei(newBalance, "ether"))
  }

  const makeTransaction = async () => {
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
      gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: receiverWalletAddress, // Required except during contract publications.
      from: ethereum.selectedAddress, // must match user's active address.
      value: '0x00', // Only required to send ether to the recipient from the initiating external account.
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
      chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    const hash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    setLastTxHash(hash)
  }

  return (
    <section>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
      </Head>
      {!installed && !!balance &&
        <button onClick={installExtension}> 
          Click here to install MetaMask 
        </button>
      }
      {installed && !balance &&
        <button onClick={connectWallet}> 
          Connect Wallet 
        </button>
      }
      {!!balance &&
        <div>
          <button onClick={makeTransaction}> Make transaction </button>
          <p> 
            Balance: {balance}
          </p>
          <button onClick={loadBalance}> Reload Balance </button>
          {!!lastTxHash && 
            <p> last transaction hash: {lastTxHash}</p>
          }
        </div>
      }
    </section>
  )
}