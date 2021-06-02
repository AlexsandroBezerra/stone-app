import { InputHTMLAttributes } from 'react';
import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  maskOptions: Record<string, unknown>;
}

export default function Input({
  name, label, maskOptions, ...rest
}: InputProps): JSX.Element {
  const currencyMask = createNumberMask(maskOptions);

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>

      <MaskedInput mask={currencyMask} id={name} {...rest} />
    </div>
  );
}
