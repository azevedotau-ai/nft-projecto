import axios from 'axios'
import { GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'
import { apiClient } from '../config/api-client'
import styles from '../styles/Home.module.css'
import { TokenMetadata } from './api/model/TokenMetadata'

interface HomeProps {
  tokens: TokenMetadata[]
}

export default function Home(props: HomeProps) {
  const { tokens } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to NFT store</h1>

        <p className={styles.description}>Check our awesome tokens</p>

        <div className={styles.grid}>
          {tokens.map((token, idx) => (
            <a key={idx} href={token.image} className={styles.card}>
              <h3>{token.name}</h3>
              <p>{token.description}</p>
              <img alt={token.description} src={token.image} />
            </a>
          ))}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤ by AE Studio
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const tokens = await apiClient.get<TokenMetadata[]>('/api/tokens')

  return {
    props: {
      tokens: tokens.data,
    },
  }
}
