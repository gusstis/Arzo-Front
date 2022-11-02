{/*import "../styles/globals.css";
import 'tailwindcss/tailwind.css';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;*/}
import "/styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title key="title">Arzobispado App</title>
        <meta key="description" name="description" content="Contactanos!" />
      </Head>
      <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
    </>
  );
}