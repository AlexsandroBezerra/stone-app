import { FormEvent, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Header from '../components/Header';
import Input from '../components/Input';
import ConvertButton from '../components/ConvertButton';

import styles from '../styles/home.module.scss';
import RadioButton from '../components/RadioButton';

interface HomeProps {
  date: string
  dollarValue: number
}

export default function Home({ date, dollarValue }: HomeProps): JSX.Element {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [paymentType, setPaymentType] = useState<'cash' | 'card'>('cash');
  const [amountText, setAmountText] = useState('$ 1,00');
  const [taxText, setTaxText] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (amountText.length > 0 && taxText.length > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [amountText, taxText]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

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

      const data = {
        result,
        iof,
        tax: taxWithoutMask,
        dollarValue,
        paymentType: 'dinheiro',
        date,
      };

      sessionStorage.setItem('@stone-app/last-request', JSON.stringify(data));
      router.push('/result');
    } else {
      const iof = 1.0638;
      const result = amount * tax * dollarValue * iof;

      const data = {
        result,
        iof,
        tax: taxWithoutMask,
        dollarValue,
        paymentType: 'cartão',
        date,
      };

      localStorage.setItem('@stone-app/last-request', JSON.stringify(data));
      router.push('/result');
    }
  }

  return (
    <>
      <Head>
        <title>Início | Conversor BRL-USD</title>
      </Head>

      <Header date={date} />

      <main className={styles.mainContainer}>
        <form onSubmit={handleSubmit}>
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
            <RadioButton
              id="money"
              name="payment-type"
              checked={paymentType === 'cash'}
              onChange={() => setPaymentType('cash')}
              label="Dinheiro"
            />

            <RadioButton
              id="card"
              name="payment-type"
              checked={paymentType === 'card'}
              onChange={() => setPaymentType('card')}
              label="Cartão"
            />
          </div>

          <ConvertButton type="submit" disabled={!isButtonEnabled} />
        </form>
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
