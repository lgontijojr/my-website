import type { AppProps } from 'next/app';

import '../css/_app.css';
import '../css/components/_body.css';
import '../css/components/_footer.css';
import '../css/components/_section.css';
import '../css/components/_profile.css';
import '../css/components/_mobile_navbar.css';
import '../css/components/_navbar.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
