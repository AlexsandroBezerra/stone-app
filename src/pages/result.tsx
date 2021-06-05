import Head from 'next/head';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import Header from '../components/Header';
import formatCurrency from '../utils/formatCurrency';

import styles from '../styles/result.module.scss';

type ResultProps = {
  lastRequest: {
    dollarValue: number;
    result: number;
    iof: number;
    tax: number;
    date: string;
    paymentType: 'cash' | 'card';
  };
};

const paymentTypes = {
  cash: 'dinheiro',
  card: 'cartão',
};

export default function Result({ lastRequest }: ResultProps): JSX.Element {
  function goBack() {
    Router.push('/');
  }

  return (
    <>
      <Head>
        <title>Resultado | Conversor BRL-USD</title>
      </Head>

      <Header date={lastRequest.date} />

      <main className={styles.mainContainer}>
        <button className={styles.backButton} onClick={goBack}>
          <img src="/arrow-left.svg" alt="Seta para esquerda" />
          Voltar
        </button>

        <h2>O resultado do cálculo é</h2>
        <h1>{formatCurrency(lastRequest.result)}</h1>

        <p>
          Compra no
          {' '}
          {paymentTypes[lastRequest.paymentType]}
          {' '}
          e taxa de
          {' '}
          {lastRequest.tax}
          %
        </p>
        <p>
          Cotação do dólar: $ 1,00 =
          {' '}
          {formatCurrency(lastRequest.dollarValue)}
        </p>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'stonecurrency.last_request': lastRequest } = parseCookies(ctx);

  if (!lastRequest) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const parsedLastRequest = JSON.parse(lastRequest);

  return {
    props: { lastRequest: parsedLastRequest },
  };
};
