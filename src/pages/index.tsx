import Head from 'next/head';

import Header from '../components/Header';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Início | Conversor BRL-USD</title>
      </Head>

      <Header />
    </>
  );
}
