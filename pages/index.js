import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
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
          <>
            Not signed in <br />
          </>
        )}
        {session && (
          <Secret />
        )}
      </main>
    </div>
  );
}
