import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

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
          <>
            Signed in as {session.user.email} <br />
            <div>You can now access our super secret pages</div>
            <button>
              <Link href='/secret'>To the secret</Link>
            </button>
          </>
        )}
      </main>
    </div>
  );
}
