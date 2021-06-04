import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import formatCurrency from '../utils/formatCurrency';

import styles from '../styles/result.module.scss';

type Data = {
  dollarValue: number
  result: number
  iof: number
  tax: number
  date: string
  paymentType: string
}

export default function Result(): JSX.Element {
  const router = useRouter();
  const [storedData, setStoredData] = useState<Data | null>(null);

  useEffect(() => {
    const dataString = sessionStorage.getItem('@stone-app/last-request');

    if (!dataString) {
      router.push('/');
    } else {
      setStoredData(JSON.parse(dataString));
    }
  }, []);

  function goBack() {
    router.push('/');
  }

  if (!storedData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Resultado | Conversor BRL-USD</title>
      </Head>

      <Header date={storedData.date} />

      <main className={styles.mainContainer}>
        <button className={styles.backButton} onClick={goBack}>
          <img src="/arrow-left.svg" alt="Seta para esquerda" />
          Voltar
        </button>

        <h2>O resultado do cálculo é</h2>
        <h1>{formatCurrency(storedData.result)}</h1>

        <p>
          Compra no
          {' '}
          {storedData.paymentType}
          {' '}
          e taxa de
          {' '}
          {storedData.tax}
          %
        </p>
        <p>
          Cotação do dólar: $ 1,00 =
          {' '}
          {formatCurrency(storedData.dollarValue)}
        </p>
      </main>
    </>
  );
}
