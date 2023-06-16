//Acá se define un contexto de autenticación (AuthContext) y un hook personalizado (useAuth) para gestionar la autenticación en una aplicación React.

import React, { useState, useContext, createContext } from 'react'; //dependencias necesarias de React para definir el contexto y el estado local.
import Cookie from 'js-cookie'; //biblioteca js-cookie, que se utiliza para manipular las cookies en el navegador.
import axios from 'axios'; //se utiliza para realizar solicitudes HTTP.
import endPoints from '@services/api/'; //los endpoints de la API de autenticación.

//Creamos un contexto de autenticación llamado AuthContext utilizando la función createContext() de React. Este contexto se utilizará para compartir el estado de autenticación en la aplicación.
const AuthContext = createContext();

//Se define el componente ProviderAuth que envuelve los componentes hijos con el contexto de autenticación (AuthContext.Provider) y proporciona el valor del contexto mediante el hook personalizado useProviderAuth().
export function ProviderAuth({ children }) {
  const auth = useProviderAuth();

  //Envolvemos los componentes hijos con el proveedor de contexto AuthContext.Provider. Pasamos el valor auth como el valor del contexto para que esté disponible en los componentes hijos.
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

//Exportamos el custom hook useAuth, que permite acceder al contexto de autenticación (AuthContext) en otros componentes utilizando useContext(AuthContext).
export const useAuth = () => {
  return useContext(AuthContext);
};

//Se define el hook personalizado useProviderAuth que contiene el estado de autenticación (user) y las funciones relacionadas (signIn, logout) para gestionar la autenticación.
function useProviderAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    // Realiza una solicitud de inicio de sesión a través de la API
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    // Establece el token de autenticación en las cookies.
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);

    // Actualiza el estado de usuario con la información del usuario autenticado.
    if (access_token) {
      const token = access_token.access_token;
      Cookie.set('token', token, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(user);
    }
  };

  const logout = () => {
    // Elimina el token de autenticación de las cookies,
    // restablece el estado de usuario a null y realiza una redirección a la página de inicio de sesión.
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logout,
  };
}

//Por ejemplo: En el archivo _app.js (o cualquier otro archivo de alto nivel), envuelvo los componentes con el componente ProviderAuth para que el contexto de autenticación esté disponible en toda la aplicación:
/* import { ProviderAuth } from './hooks/useAuth';

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <Component {...pageProps} />
    </ProviderAuth>
  );
}

export default MyApp; */

//En cualquier componente donde necesites realizar la autenticación, importa el hook useAuth y úsalo para acceder al estado de autenticación y las funciones relacionadas:
/* import { useAuth } from '../hooks/useAuth';

function ProfilePage() {
  const { user, signIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please sign in</h1>
          <button onClick={() => signIn('user@example.com', 'password')}>Sign In</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage; */
//En este ejemplo, el componente ProfilePage utiliza el hook useAuth para acceder al estado user (que representa el usuario autenticado) y las funciones signIn y logout. Dependiendo del estado de autenticación, se muestra un mensaje de bienvenida y un botón de cierre de sesión o un mensaje de inicio de sesión y un botón para iniciar sesión.
