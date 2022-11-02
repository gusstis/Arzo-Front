import { signIn, useSession, getProviders, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function LoginPage() {
const { data, status } = useSession()
  const router = useRouter();
 useEffect(() => {
   (async () => {
     const providers = await getProviders();
     console.log("providers:",providers);
   })();
 }, []);

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div>
      <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" onClick={() => signIn("github")}>Login with Github</button>
      <h1>login</h1>
      <button onClick={() => signIn("google")}>Login with google</button>
      <h1>login</h1>
    </div>
    
  );
}

export default LoginPage;
