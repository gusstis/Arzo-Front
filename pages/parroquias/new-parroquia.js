import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  address: Yup.string().required('La dirección es obligatoria'),
  postalCode: Yup.string().required('El código postal es obligatorio'),
});

function NewParroquiaPage() {
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      // Realizar la llamada a la API para crear una nueva parroquia
      const response = await axios.post('/api/parroquias', values);
      console.log(response.data); // Puedes hacer algo con la respuesta de la API

      // Redirigir a la página de lista de parroquias después de la creación exitosa
      router.push('/parroquias');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Crear nueva Parroquia</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Crear nueva parroquia</h1>

      <Formik
        initialValues={{
          name: '',
          lastname: '',
          address: '',
          postalCode: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-1">
                Nombre
              </label>
              <Field type="text" id="name" name="name" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block font-semibold mb-1">
                Dirección
              </label>
              <Field type="text" id="address" name="address" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="address" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="postalCode" className="block font-semibold mb-1">
                Código Postal
              </label>
              <Field type="text" id="postalCode" name="postalCode" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="postalCode" component="div" className="text-red-500 mt-1" />
            </div>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Crear Parroquia
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewParroquiaPage;
