import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import formatCurrency from '../utils/formatCurrency';

import styles from '../styles/result.module.scss';

type Data = {
  result: number
  iof: number
  tax: number
  dollarValue: number
  paymentType: string
  date: string
}

export default function Result(): JSX.Element {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const dataString = sessionStorage.getItem('@stone-app/last-request');

    if (!dataString) {
      router.push('/');
    } else {
      setData(JSON.parse(dataString));
    }
  }, []);

  function goBack() {
    router.push('/');
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Resultado | Conversor BRL-USD</title>
      </Head>

      <Header date={data.date} />

      <main className={styles.mainContainer}>
        <button className={styles.backButton} onClick={goBack}>
          <img src="/arrow-left.svg" alt="Seta para esquerda" />
          Voltar
        </button>

        <h2>O resultado do cálculo é</h2>
        <h1>{formatCurrency(data.result)}</h1>

        <p>
          Compra no
          {' '}
          {data.paymentType}
          {' '}
          e taxa de 5.3%
        </p>
        <p>
          Cotação do dólar: $ 1,00 =
          {' '}
          {formatCurrency(data.dollarValue)}
        </p>
      </main>
    </>
  );
}
