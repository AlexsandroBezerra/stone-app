import { AppProps } from 'next/dist/next-server/lib/router/router';

import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <img src="/graph.svg" alt="Círculos" className="graphImageBackground" />
      <Component {...pageProps} />
    </>
  );
}
