import Head from 'next/head';
import '@/src/styles/globals.css'


export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css@1.12/mvp.css" /> 
      </Head>
      <Component {...pageProps} />
    </>
  )
}
