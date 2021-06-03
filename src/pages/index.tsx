import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Header from '../components/Header';
import Input from '../components/Input';
import ConvertButton from '../components/ConvertButton';

import styles from '../styles/home.module.scss';

interface HomeProps {
  date: string
  dollarValue: number
}

export default function Home({ date, dollarValue }: HomeProps): JSX.Element {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [paymentType, setPaymentType] = useState<'cash' | 'card'>('cash');
  const [amountText, setAmountText] = useState('$ 1,00');
  const [taxText, setTaxText] = useState('');

  useEffect(() => {
    if (amountText.length > 0 && taxText.length > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [amountText, taxText]);

  function handleSubmit() {
    const amountWithoutMask = amountText
      .split(' ')[1]
      .replaceAll('.', '')
      .replace(',', '.');

    const taxWithoutMask = taxText
      .split(' ')[0]
      .replace(',', '.');

    const amount = Number(amountWithoutMask);
    const tax = (Number(taxWithoutMask) / 100) + 1;

    if (paymentType === 'cash') {
      const iof = 1.011;
      const result = amount * tax * dollarValue * iof;

      window.alert(`Valor em reais: ${result}`);
    } else {
      const iof = 1.0638;
      const result = amount * tax * dollarValue * iof;

      window.alert(`Valor em reais: ${result}`);
    }
  }

  return (
    <>
      <Head>
        <title>Início | Conversor BRL-USD</title>
      </Head>

      <img src="/graph.svg" alt="Círculos" className="graphImageBackground" />

      <Header date={date} />

      <main className={styles.mainContainer}>
        <div className={styles.inputGroup}>
          <Input
            name="amount"
            label="Dólar"
            placeholder="$ 1,00"
            value={amountText}
            onChange={(e) => setAmountText(e.target.value)}
            maskOptions={{
              prefix: '$ ',
              includeThousandsSeparator: true,
              thousandsSeparatorSymbol: '.',
              allowDecimal: true,
              decimalSymbol: ',',
              decimalLimit: 2,
              integerLimit: 7,
              allowNegative: false,
              allowLeadingZeroes: false,
            }}
          />

          <Input
            name="tax"
            label="Taxa do Estado"
            placeholder="0 %"
            value={taxText}
            onChange={(e) => setTaxText(e.target.value)}
            maskOptions={{
              prefix: '',
              suffix: ' %',
              allowDecimal: true,
              decimalSymbol: ',',
              decimalLimit: 2,
              integerLimit: 3,
              allowNegative: false,
              allowLeadingZeroes: false,
            }}
          />
        </div>

        <p className={styles.inputTitle}>Tipo de compra</p>

        <div className={styles.inputGroup}>
          <label htmlFor="money" className={styles.radioButtonContainer}>
            <input
              type="radio"
              id="money"
              name="payment-type"
              checked={paymentType === 'cash'}
              onChange={() => setPaymentType('cash')}
            />

            <span>Dinheiro</span>
          </label>

          <label htmlFor="card" className={styles.radioButtonContainer}>
            <input
              type="radio"
              id="card"
              name="payment-type"
              checked={paymentType === 'card'}
              onChange={() => setPaymentType('card')}
            />
            <span>Cartão</span>
          </label>
        </div>

        <ConvertButton
          type="button"
          disabled={!isButtonEnabled}
          onClick={handleSubmit}
        />
      </main>
    </>
  );
}

type FetchResponse = {
  USDBRL: {
    ask: string;
    create_date: string;
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL',
  );
  const parsedResponse: FetchResponse = await response.json();

  const date = new Date(parsedResponse.USDBRL.create_date);
  const formattedDate = format(
    date,
    "dd 'de' MMMM yyyy | HH:mm 'UTC'",
    { locale: ptBR },
  );

  return {
    props: {
      date: formattedDate,
      dollarValue: Number(parsedResponse.USDBRL.ask),
    },
    revalidate: 30,
  };
};
