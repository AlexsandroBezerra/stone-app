import Head from 'next/head';

import Header from '../components/Header';
import Input from '../components/Input';

import styles from '../styles/home.module.scss';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Início | Conversor BRL-USD</title>
      </Head>

      <Header />

      <main className={styles.mainContainer}>
        <Input name="amount" label="Dólar" placeholder="$ 1,00" />
      </main>
    </>
  );
}
