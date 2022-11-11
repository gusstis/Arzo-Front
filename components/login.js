import { signIn, signOut, useSession, getProviders, SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

console.log('Pasando por: login.js...');

export default function LoginPage() {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      console.log('providers:', providers);
    })();
  }, []);

  useEffect(() => {
    if (data) {
      router.push('/');
    }
  }, [data, router]);

  return (
    <div className="flex justify-center items-center mt-30 flex-col">
      <h1>login</h1>
      <button className=" bg-blue-300 hover:bg-blue-200 text-gray-900 px-8 py-3 font-black tracking-widest text-lg rounded-md m-5" onClick={() => signIn('github')}>
        Login with Github
      </button>
      <button className=" bg-blue-300 hover:bg-blue-200 text-gray-900 px-8 py-3 font-black tracking-widest text-lg rounded-md m-2 " onClick={() => signIn('google')}>
        Login with google
      </button>
    </div>
  );
};                            
