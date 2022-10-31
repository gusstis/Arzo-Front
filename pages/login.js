import { signIn, useSession, getProviders } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function LoginPage() {
  const { data, status } = useSession();
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
      <button onClick={() => signIn("github")}>Login with Github</button>
      <h1>login</h1>
      <button onClick={() => signIn("google")}>Login with google</button>
      <h1>login</h1>
    </div>
    
  );
}

export default LoginPage;
