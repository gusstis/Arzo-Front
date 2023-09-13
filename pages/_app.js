import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MainLayout from '@layout/MainLayout';
import 'tailwindcss/tailwind.css';
import Header from '@components/Header';
import Navbar from '@components/navbar';
import { NextUIProvider } from '@nextui-org/react';
import Footer from '@components/footer';
import { SessionProvider } from 'next-auth/react';

console.log('Pasando por _app.js');

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {


  return (
    <>
      <NextUIProvider>
        <Head>
          <title>Arquidiócesis de San Juan de Cuyo</title>
          {/* Agregar aquí los meta tags, estilos, scripts, etc. */}
        </Head>
          <SessionProvider session={session} >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
          </SessionProvider>
        <Footer />
      </NextUIProvider>
    </>
  );
}
