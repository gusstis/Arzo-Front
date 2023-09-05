import { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  address: Yup.string().required('La dirección es obligatoria'),
  postalCode: Yup.string().required('El código postal es obligatorio'),
  CreatedAt: Yup.date().required('La Fecha de Creación es obligatoria')

});

function EditParroquiaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [formikInitialValues, setFormikInitialValues] = useState({});

  useEffect(() => {
    // Obtener los datos actuales de la parroquia usando el ID
    const fetchParroquiaData = async () => {
      try {
        const response = await axios.get(`/api/parroquias/${id}`);
        const parroquiaData = response.data;

        //parroquiaData.CreatedAt = new Date(parroquiaData.CreatedAt);
        // Establecer los valores iniciales del formulario con los datos actuales
        setFormikInitialValues(parroquiaData);
      
      
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {fetchParroquiaData()}
  }, [id]);

  const handleSubmit = async (values) => {
    console.log('Values in handleSubmit:', values);
    try {
      // Ahora podemos realizar la llamada a la API después de que los valores iniciales se hayan configurado
      const apiResponse = await axios.patch(`/api/parroquias/${id}`, parroquiaData);
      console.log(apiResponse.data); // Podemos hacer algo con la respuesta de la API
      // Redirigir a la página de detalles del sacerdote después de la actualización exitosa
      router.push(`/parroquias/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const setInitialValues = (parroquiaData) => {
    const initialValues = {
      name: parroquiaData.name,
      address: parroquiaData.address,
      postalCode: parroquiaData.postalCode,
      CreatedAt: parroquiaData.CreatedAt,
      email: parroquiaData.email,
    };

    setFormikInitialValues(initialValues);
  };
  console.log('formikInitialValues: ')
  console.log(formikInitialValues)

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Editar parroquia</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Editar parroquia</h1>
      <Formik initialValues={formikInitialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-1">
                Nombre:
              </label>
              <Field type="text" id="name" name="name" className="border rounded w-full p-2" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="address" className="block font-bold mb-1">
                Dirección:
              </label>
              <Field type="text" id="address" name="address" className="border rounded w-full p-2" />
              <ErrorMessage name="address" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="postalCode" className="block font-bold mb-1">
                Código Postal:
              </label>
              <Field type="text" id="postalCode" name="postalCode" className="border rounded w-full p-2" />
              <ErrorMessage name="postalCode" component="div" className="text-red-500" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="CreatedAt" className="block font-semibold mb-1">
                Fecha de creación
              </label>
              <Field type="date" id="CreatedAt" name="CreatedAt" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="CreatedAt" component="div" className="text-red-500 mt-1" />
            </div>
           
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditParroquiaPage;
