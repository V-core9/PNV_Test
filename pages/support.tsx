import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import Copyright from '../components/Copyright';
import DocHead from '../components/DocHead';

const SupportPage: NextPage = () => {
  return (
    <div className={styles.container}>

      <DocHead
        title="V-core9 - Support List of Pages"
        description="Generated by create next app"
      />

      <main className={styles.main}>

        <h1 className={styles.title}>
          List of available pages
        </h1>

        <div className={styles.grid}>
          <Link href="/">
            <a className={styles.card}>
              <h2>Home Page 🏠</h2>
              <p>Websites Index Landing Page, so called Homepage.</p>
            </a>
          </Link>

          <Link href="/register">
            <a className={styles.card}>
              <h2>Register Account 🚀</h2>
              <p>Create your free account. No credit card required.</p>
            </a>
          </Link>

          <Link href="/login">
            <a className={styles.card}>
              <h2>Login Page 🔐</h2>
              <p>Existing users can quickly login using this page.</p>
            </a>
          </Link>

          <Link href="/terms-and-conditions" >
            <a className={styles.card}>
              <h2>Terms and Conditions 📃</h2>
              <p>Learn about our boilerplate example terms and conditions!</p>
            </a>
          </Link>

          <Link href="/application" >
            <a className={styles.card}>
              <h2>Application Page ⚡</h2>
              <p>
                Example of Material UI library for react in Next.
              </p>
            </a>
          </Link>

          <Link href="/forgot-password">
            <a className={styles.card}>
              <h2>Forgot Password 🔎</h2>
              <p>
                This is a page where user can ask for password reset link.
              </p>
            </a>
          </Link>
        </div>
      </main>

      <Copyright sx={{ mt: 5, padding: 1 }} />
    </div>
  )
}

export default SupportPage
