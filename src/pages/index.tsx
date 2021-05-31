import Head from 'next/head';

import Header from '../components/Header';

import styles from '../styles/home.module.scss';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Início | Conversor BRL-USD</title>
      </Head>

      <Header />

      <main className={styles.mainContainer}>
        <h1>Hello World!</h1>
      </main>
    </>
  );
}
