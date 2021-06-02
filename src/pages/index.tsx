import { useEffect, useState } from 'react';
import Head from 'next/head';

import Header from '../components/Header';
import Input from '../components/Input';
import ConvertButton from '../components/ConvertButton';

import styles from '../styles/home.module.scss';

export default function Home(): JSX.Element {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [paymentType, setPaymentType] = useState('cash');
  const [amount, setAmount] = useState('$ 1,00');
  const [tax, setTax] = useState('');

  useEffect(() => {
    if (amount.length > 0 && tax.length > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [amount, tax]);

  function handleSubmit() {
    console.log({
      paymentType,
      amount,
      tax,
    });
  }

  return (
    <>
      <Head>
        <title>Início | Conversor BRL-USD</title>
      </Head>

      <img src="/graph.svg" alt="Círculos" className="graphImage" />

      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.inputGroup}>
          <Input
            name="amount"
            label="Dólar"
            placeholder="$ 1,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
            value={tax}
            onChange={(e) => setTax(e.target.value)}
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
