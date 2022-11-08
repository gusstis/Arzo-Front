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
//import MainLayout from '@layout/MainLayout'
import '../styles/globals.css';
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
    </>
  );
}