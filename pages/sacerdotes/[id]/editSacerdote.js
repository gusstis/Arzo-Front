import { useEffect, useState } from 'react';
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

function EditSacerdotePage() {
  const router = useRouter();
  const { id } = router.query;
  const [formikInitialValues, setFormikInitialValues] = useState({});

  useEffect(() => {
    // Obtener los datos actuales del sacerdote usando el ID
    const fetchSacerdoteData = async () => {
      try {
        const response = await axios.get(`/api/sacerdotes/${id}`);
        const sacerdoteData = response.data;
        
        // Establecer los valores iniciales del formulario con los datos actuales
        setFormikInitialValues(sacerdoteData);
      
      
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {fetchSacerdoteData()};
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      // Realizar la llamada a la API para actualizar los datos del sacerdote
      const response = await axios.put(`/api/sacerdotes/${id}`, values);
      console.log('Resp de la API: ',response.data); // Puedes hacer algo con la respuesta de la API

      // Redirigir a la página de detalles del sacerdote después de la actualización exitosa
      router.push(`/sacerdotes/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const setInitialValues = (sacerdoteData) => {
    console.log(' const setInitialValues');
    console.log("Datos recibidos:", sacerdoteData);
    const initialValues = {
      name: sacerdoteData.name,
      lastname: sacerdoteData.lastname,
      address: sacerdoteData.address,
      postalCode: sacerdoteData.postalCode,
      phone: sacerdoteData.phone,
      nombramiento: sacerdoteData.nombramiento,
      imagen: sacerdoteData.imagen,
      parroquia: sacerdoteData.parroquia,
      dateOfBirth: sacerdoteData.dateOfBirth,
      summary: sacerdoteData.summary,
      website: sacerdoteData.website,
      age: sacerdoteData.age,
      degree: sacerdoteData.degree,
      email: sacerdoteData.email,
      freelance: sacerdoteData.freelance,
      about: sacerdoteData.about,
      education: sacerdoteData.education || [{ degree: '', year: '', institution: '', description: '' }],
      experience: sacerdoteData.experience || [{ position: '', years: '', company: '', highlights: [''] }],
    };
    console.log("Valores iniciales:");
    console.log(initialValues);
    setFormikInitialValues(initialValues);
  };


  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Editar sacerdote</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Editar sacerdote</h1>
      <Formik
        initialValues={formikInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-1">
                Nombre:
              </label>
              <Field type="text" id="name" name="name" className="border rounded w-full p-2"  />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block font-bold mb-1">
                Apellido:
              </label>
              <Field type="text" id="lastname" name="lastname" className="border rounded w-full p-2" />
              <ErrorMessage name="lastname" component="div" className="text-red-500" />
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
              <label htmlFor="phone" className="block font-bold mb-1">
                Teléfono:
              </label>
              <Field type="text" id="phone" name="phone" className="border rounded w-full p-2" />
              <ErrorMessage name="phone" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="nombramiento" className="block font-bold mb-1">
                Nombramiento:
              </label>
              <Field type="text" id="nombramiento" name="nombramiento" className="border rounded w-full p-2" />
              <ErrorMessage name="nombramiento" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="imagen" className="block font-bold mb-1">
                Imagen:
              </label>
              <Field type="text" id="imagen" name="imagen" className="border rounded w-full p-2" />
              <ErrorMessage name="imagen" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="parroquia" className="block font-bold mb-1">
                Parroquia:
              </label>
              <Field type="text" id="parroquia" name="parroquia" className="border rounded w-full p-2" />
              <ErrorMessage name="parroquia" component="div" className="text-red-500" />
            </div>
            {/* Resto del formulario */}

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
                    <FieldArray name="education">
                      {(arrayHelpers) => (
                        <div>
                          {Array.isArray(values.education) && values.education.length > 0 ? (
                            values?.education?.map((_, index) => {
                              // Código de mapeo aquí
                              return <div key={index}>Elemento {index}</div>;
                            })
                          ) : (
                            // Código si no hay elementos en values.education
                            <></>
                          )}
                        </div>
                      )}
                    </FieldArray>

                    {values?.education?.map((education, index) => (
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
                    {values?.experience?.map((_, index) => (
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

            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditSacerdotePage;
