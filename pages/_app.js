import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MainLayout from '@layout/MainLayout';
import 'tailwindcss/tailwind.css';
import Header from '../components/Header';
import Navbar from '../components/navbar';
import { NextUIProvider } from '@nextui-org/react';
import Footer from 'components/footer';

console.log('leendo: _app');

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('Página cambiada:', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <NextUIProvider>
        <Head>
          <title>Arquidiócesis de San Juan de Cuyo</title>
          {/* Agregar aquí los meta tags, estilos, scripts, etc. */}
        </Head>
        {/* <Navbar></Navbar> */}
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        <Footer />
      </NextUIProvider>
    </>
  );
}
