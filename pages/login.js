import {useRouter} from 'next/router';

import {signIn, useSession, getProviders} from 'next-auth/react';
import { useEffect } from 'react';

function LoginPage() {
    const {data: session, status} = useSession()
    const router = useRouter()
    
    //este useEffect es para obtener {session} desde el backend 
    useEffect(() => {
        (async() => {
            const providers = await getProviders()
            console.log(providers)
        })();
    }, [])

        if ( status !== 'loading' && status === 'authenticated' ) {
            router.push('/')
        }
    

    return (
        <div>
            <button onClick={(e) => {
           e.preventDefault()
           signIn() }} />
                

            Signin with
        </div>
    );
}

export default LoginPage;