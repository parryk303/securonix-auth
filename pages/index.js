import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';
import Secret from './secret.js';

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Securonix Risk Assessment</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        {!session && (
          <h1 id='notice'>Not signed in</h1>
        )}
        {session && (
          <Secret />
        )}
      </main>
    </div>
  );
}
