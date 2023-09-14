import {useState, useEffect} from 'react';
import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  lastname: Yup.string().required('El apellido es obligatorio'),
  address: Yup.string().required('La dirección es obligatoria'),
  postalCode: Yup.string().required('El código postal es obligatorio'),
  phone: Yup.string().required('El teléfono es obligatorio'),
});

function NewSacerdotePage() {
  const router = useRouter();
  const [parroquias, setParroquias] = useState([])

  {/*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/parroquias');
        //console.log(response.data);
        setParroquias(response.data.parroquias);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);*/}

  useEffect(() => {
    axios.get('/api/parroquias')
      .then(response => {
        setParroquias(response.data.parroquias); // Actualiza 'parroquias' con los datos de la API
        console.log('parroquias: ', parroquias)  
      })
      .catch(error => {
        console.error(error);
      });
      
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Realizar la llamada a la API para crear un nuevo sacerdote
      const response = await axios.post('/api/sacerdotes', values);
      console.log(response.data); // Puedes hacer algo con la respuesta de la API

      // Redirigir a la página de lista de sacerdotes después de la creación exitosa
      router.push('/sacerdotes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Crear nuevo sacerdote</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Crear nuevo sacerdote</h1>

      <Formik
        initialValues={{
          name: '',
          lastname: '',
          address: '',
          postalCode: '',
          phone: '',
          nombramiento: [],
          imagen: '',
          parroquia: [],
          dateOfBirth: '',
          summary: '',
          website: '',
          age: 0,
          degree: '',
          email: '',
          freelance: false,
          about: '',
          education: [{ degree: '', year: '', institution: '', description: '' }],
          experience: [{ position: '', years: '', company: '', highlights: [''] }],
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
              <label htmlFor="lastname" className="block font-semibold mb-1">
                Apellido
              </label>
              <Field type="text" id="lastname" name="lastname" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="lastname" component="div" className="text-red-500 mt-1" />
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

            <div className="mb-4">
              <label htmlFor="phone" className="block font-semibold mb-1">
                Teléfono
              </label>
              <Field type="text" id="phone" name="phone" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="phone" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="nombramiento" className="block font-semibold mb-1">
                Nombramiento
              </label>
              <Field type="text" id="nombramiento" name="nombramiento" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="nombramiento" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="imagen" className="block font-semibold mb-1">
                Imagen
              </label>
              <Field type="text" id="imagen" name="imagen" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="imagen" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="parroquia" className="block font-semibold mb-1">
                Parroquia
              </label>
              <Field as="select" id="parroquia" name="parroquiaActual" className="w-full rounded border-gray-300 p-2">
                <option value="">Selecciona una parroquia</option>
                {parroquias.length > 0 ? (
                  parroquias.map((parroquia) => (
                    <option key={parroquia._id} value={parroquia._id}>
                      {parroquia.name}
                    </option>
                  ))
                  ) : (
                    <option value="" disabled>
                      Cargando parroquias...
                    </option>
                  )}
                    </Field>
                        <ErrorMessage name="parroquia" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block font-semibold mb-1">
                Fecha de Nacimiento
              </label>
              <Field type="date" id="dateOfBirth" name="dateOfBirth" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="summary" className="block font-semibold mb-1">
                Resumen
              </label>
              <Field as="textarea" id="summary" name="summary" rows="4" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="summary" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="website" className="block font-semibold mb-1">
                Sitio web
              </label>
              <Field type="text" id="website" name="website" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="website" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="degree" className="block font-semibold mb-1">
                Grado
              </label>
              <Field type="text" id="degree" name="degree" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="degree" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="about" className="block font-semibold mb-1">
                Acerca de
              </label>
              <Field as="textarea" id="about" name="about" rows="4" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="about" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-1">
                Correo electrónico
              </label>
              <Field type="email" id="email" name="email" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="education" className="block font-semibold mb-1">
                Educación
              </label>
              <FieldArray name="education">
                {(arrayHelpers) => (
                  <div>
                    {values.education.map((_, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center">
                          <Field type="text" name={`education[${index}].degree`} className="w-full rounded border-gray-300 p-2" placeholder="Grado" />
                          <button type="button" onClick={() => arrayHelpers.remove(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                            Eliminar
                          </button>
                        </div>
                        <ErrorMessage name={`education[${index}].degree`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`education[${index}].year`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Año" />
                        <ErrorMessage name={`education[${index}].year`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`education[${index}].institution`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Institución" />
                        <ErrorMessage name={`education[${index}].institution`} component="div" className="text-red-500 mt-1" />
                        <Field as="textarea" name={`education[${index}].description`} rows="4" className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Descripción" />
                        <ErrorMessage name={`education[${index}].description`} component="div" className="text-red-500 mt-1" />
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push({ degree: '', year: '', institution: '', description: '' })} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Agregar educación
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block font-semibold mb-1">
                Experiencia
              </label>
              <FieldArray name="experience">
                {(arrayHelpers) => (
                  <div>
                    {values.experience.map((_, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center">
                          <Field type="text" name={`experience[${index}].position`} className="w-full rounded border-gray-300 p-2" placeholder="Posición" />
                          <button type="button" onClick={() => arrayHelpers.remove(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                            Eliminar
                          </button>
                        </div>
                        <ErrorMessage name={`experience[${index}].position`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`experience[${index}].years`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Años" />
                        <ErrorMessage name={`experience[${index}].years`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`experience[${index}].company`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Compañía" />
                        <ErrorMessage name={`experience[${index}].company`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`experience[${index}].highlights[0]`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Aspecto destacado" />
                        <ErrorMessage name={`experience[${index}].highlights[0]`} component="div" className="text-red-500 mt-1" />
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push({ position: '', years: '', company: '', highlights: [''] })} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Agregar experiencia
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <button type="submit" className="bg-blue-300 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded">
              Crear sacerdote
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewSacerdotePage;
