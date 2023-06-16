// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(process.env.devUrl + `/api/church`);
  const data = await res.json();

  console.log('data:==========', data);
  return { props: { data } };
}

/*   El código que se muestra es una función llamada getServerSideProps, que se ejecuta en cada solicitud al servidor. Esta función se utiliza para obtener los datos necesarios antes de renderizar la página correspondiente.

  Dentro de la función, hay una solicitud HTTP utilizando la función fetch. Se realiza una solicitud a la URL definida en process.env.devUrl concatenada con /api/church. Esto indica que se está haciendo una llamada a una API en el servidor para obtener los datos relacionados con una iglesia.
  
  Luego, se espera a que la respuesta de la solicitud se resuelva usando await res.json(). Esto convierte la respuesta en formato JSON en un objeto JavaScript utilizable.
  
  Después, se imprime en la consola la variable data que contiene los datos obtenidos de la API de la iglesia.
  
  Por último, se retorna un objeto con la propiedad props, que contiene los datos obtenidos de la API. Estos datos estarán disponibles en el componente de la página correspondiente, permitiendo su renderización con los datos actualizados.
  
  En resumen, este código se utiliza para obtener los datos de una API de iglesias en el servidor antes de renderizar la página. Los datos obtenidos se pasan como props al componente de la página, lo que permite mostrar la información actualizada en la interfaz de usuario. */
