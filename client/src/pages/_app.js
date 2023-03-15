import Seo from '../components/Seo';
import '@/src/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Seo />
      <Component {...pageProps} />
    </>
  );
}
