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
import 'tailwindcss/tailwind.css';
import Head from "../components/Head";
import Navbar from '../components/navbar'
import { SessionProvider } from "next-auth/react";
import Footer from 'components/footer';
import { NextUIProvider } from '@nextui-org/react';
console.log(' leendo: _app');

export default function MyApp({ Component, pageProps:{session, ...pageProps}, }) {
  console.log('entrando a Component...')
  console.log( 'pageProps.session: ' + pageProps.session);

  return (
    <>
    <NextUIProvider>
    <Navbar></Navbar>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
    <Footer></Footer>
    </NextUIProvider>
    </>
    
  );
}
