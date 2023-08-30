import Header from '@components/Header';
import { SessionProvider } from 'next-auth/react';

export default function MainLayout({ children }) {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-0 lg:px-8 ">{children}</div>
        </main>
      </div>
    </>
  );
}

