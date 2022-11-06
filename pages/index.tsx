import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import Copyright from '../components/Copyright';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>V-core9 - Home Page</title>
        <meta name="description" content="V-core9 Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/">V-core9</Link>
        </h1>
      </main>

      <Copyright sx={{ mt: 8, mb: 4, padding: 1 }} />
    </div>
  )
}

export default Home
