import { getSession } from 'next-auth/client'; //Aquí se importa la función getSession de next-auth/client para obtener la sesión del usuario.

export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log(session);

  if (!session) {
    console.log('En /pages/index.js, exp async ftion getServerSideProps => !session...');

    //se verifica si existe una sesión. Si no existe, se redirecciona al usuario a la página de inicio de sesión.
    return {
      redirect: {
        destination: '/components/login',
        permanent: false,
      },
    };
  }

  console.log('Ya hay una sesión guardada..');

  //Si existe una sesión, se retorna la sesión como una propiedad (session) en el objeto de retorno.
  return {
    props: {
      session,
    },
  };
}

//he eliminado la línea export default authSession(); ya que no es necesario exportar una función llamada authSession. El método getServerSideProps se exporta directamente.
//export default authSession();
