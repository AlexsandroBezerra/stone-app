import styles from './styles.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <img src="/stone_logo.svg" alt="Logo da Stone Currency" />

      <div className={styles.headerContent}>
        <time>14 de janeiro 2021    |     21:00 UTC</time>
        <p>Dados de câmbio disponibilizados pela Morningstar.</p>
      </div>
    </header>
  );
}
