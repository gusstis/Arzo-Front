//Este hook se utiliza para realizar solicitudes HTTP utilizando Axios y recuperar datos de una API. El hook useFetch acepta un parámetro llamado endpoint, que representa la URL de la API desde la cual se obtendrán los datos. En resumen, simplifica la realización de solicitudes HTTP y la recuperación de datos de una API en componentes de React. Puede ser utilizado para encapsular la lógica de obtención de datos y reutilizarse en varios componentes de la aplicación.

import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);

  //define una función fetchData asincrónica que realiza una solicitud GET a la endpoint utilizando Axios y actualiza el estado data con los datos obtenidos de la respuesta.
  async function fetchData() {
    const response = await axios.get(endpoint);
    setData(response.data);
  }

  //se utiliza useEffect para llamar a la función fetchData cuando el componente se monta por primera vez. Esto se logra pasando un arreglo vacío como segundo argumento del efecto, lo que indica que solo se debe ejecutar una vez durante el ciclo de vida del componente.
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Finalmente, el hook useFetch devuelve el estado data, que contiene los datos obtenidos de la API. Este estado puede ser utilizado por el componente que utilice el hook para mostrar los datos en la interfaz de usuario.
  return data;
};

export default useFetch;
