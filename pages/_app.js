
import MainLayout from '@layout/MainLayout'
import { ProviderAuth } from '@hooks/useAuth';
import 'tailwindcss/tailwind.css';
import Header from '../components/Header';
import Navbar from '../components/navbar';
import { SessionProvider } from 'next-auth/react';
import Footer from 'components/footer';
import { NextUIProvider } from '@nextui-org/react';
console.log(' leendo: _app');

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log('entrando a /_app.js => exp def func MyApp ({ Component, pageProps:{session, ...pageProps}, })...');
  console.log('pageProps.session: ' + pageProps.session);

  return (
    <>
      <NextUIProvider>
        {/*<Navbar></Navbar>*/}
        <MainLayout >
          <Component {...pageProps} />
        </MainLayout>
        <Footer></Footer>
      </NextUIProvider>
    </>
  );
}
