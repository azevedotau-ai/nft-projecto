# Before you start

If you are new in the NFT universe, you should start with these articles:

- [People are spending millions on NFTs. What? Why?](https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq)
- [Intro to Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/)
- [Transactions](https://ethereum.org/en/developers/docs/transactions/)
- [How to create an NFT](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-an-nft)

The steps bellow are part of [this](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft) tutorial.

## 1. Connect to the Ethereum network

In this project we're using [Alchemy](https://www.alchemyapi.io/), a blockchain developer platform and API that allows us to communicate with the Ethereum chain without having to run our own nodes.

If you don’t already have an Alchemy account, you can sign up for free [here](https://www.alchemyapi.io/).

## 2. Create your app (and API key)

Once you’ve created an Alchemy account, you can generate an API key by creating an app. This will allow us to make requests to the Ropsten test network.

1. Navigate to the “Create App” page in your Alchemy Dashboard by hovering over “Apps” in the nav bar and clicking “Create App”

   ![alt text](./img/create-app-1.png 'Create app step 1')

1. Name your app, offer a short description, select “Staging” for the Environment (used for your app bookkeeping), and choose “Ropsten” for your network.

   ![alt text](./img/create-app-2.png 'Create app step 2')

1. Click “Create app” and that’s it! Your app should appear in the table below.

## 3. Create an Ethereum account (address)

We need an Ethereum account to send and receive transactions. For this project, we’ll use Metamask, a virtual wallet in the browser used to manage your Ethereum account address.

You can download and create a Metamask account for free here. When you are creating an account, or if you already have an account, make sure to switch over to the “Ropsten Test Network” in the upper right (so that we’re not dealing with real money).

![alt text](./img/metamask.png 'MetaMask')

## 4. Add ether from a Faucet

In order to deploy our smart contract to the test network, we’ll need some fake Eth. To get Eth you can go to the [Ropsten faucet](https://faucet.ropsten.be/) and enter your Ropsten account address, then click “Send Ropsten Eth.” You should see Eth in your Metamask account soon after!

# How to run this project

## Credentials

Create a `.env` based on `.env.example` and add your Metamask private key and HTTP Alchemy API URL to it.

- Follow [these instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) to export your private key from Metamask
- See below to get HTTP Alchemy API URL and copy it to your clipboard

  ![alt text](./img/alchemy-api-url.gif 'Alchemy API URL')

## Install

You can use your favorite JavaScript package manager, for example:

```
yarn install
```

## Compile the contract

```bash
yarn compile-contracts
```

## Deploy the contract

```bash
yarn deploy-contracts
```

You should then see something like:

```
Contract deployed to address: 0x81c587EB0fE773404c42c1d2666b5f557C470eED
```

You can go to the [Ropsten etherscan](https://ropsten.etherscan.io/) and search for your contract address.

## Run project

```bash
yarn dev
```

## Mint a NFT

`http://localhost:3000/api/mint-nft`

## How to view your NFT in your Wallet

Please check [this](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft/how-to-view-your-nft-in-your-wallet) guide.
