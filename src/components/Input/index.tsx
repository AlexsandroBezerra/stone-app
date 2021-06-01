import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  name, label, placeholder = '', ...rest
}: InputProps): JSX.Element {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} placeholder={placeholder} {...rest} />
    </div>
  );
}
