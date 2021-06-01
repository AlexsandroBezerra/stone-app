import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

export default function ConvertButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
): JSX.Element {
  return (
    <button className={styles.buttonContainer} {...props}>
      <img src="/transfer_icon.svg" alt="" />
      Converter
    </button>
  );
}
