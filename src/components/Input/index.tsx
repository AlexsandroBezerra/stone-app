import styles from './styles.module.scss';

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
}

export default function Input({ name, label, placeholder = '' }: InputProps): JSX.Element {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} placeholder={placeholder} />
    </div>
  );
}
