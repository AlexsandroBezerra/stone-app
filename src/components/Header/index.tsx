import styles from './styles.module.scss';

interface HeaderProps {
  date: string
}

export default function Header({ date }: HeaderProps): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <img src="/stone_logo.svg" alt="Logo da Stone Currency" />

      <div className={styles.headerContent}>
        <time>{date}</time>
        <p>Dados de câmbio disponibilizados pela Morningstar.</p>
      </div>
    </header>
  );
}
