import { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function RadioButton({
  id,
  label,
  ...rest
}: RadioButtonProps): JSX.Element {
  return (
    <label htmlFor={id} className={styles.radioButtonContainer}>
      <input {...rest} type="radio" id={id} />

      <span>{label}</span>
    </label>
  );
}
