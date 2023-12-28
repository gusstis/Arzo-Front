import { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
//import sacerdote from 'server/models/sacerdote';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  lastname: Yup.string().required('El apellido es obligatorio'),
  dni: Yup.string(). required('Se requiere Número de Documento') ,
  address: Yup.string().required('La dirección es obligatoria'),
  phone: Yup.string(),
  email: Yup.string().email('Debe ser un correo electrónico válido'),
});

function EditSacerdotePage() {
  const router = useRouter();
  const { id } = router.query;
  const [sacerdoteData, setSacerdoteData] = useState(null);

  useEffect(() => {
    // Realiza una llamada a la API para obtener los datos del sacerdote por su ID
    if (id) {
      axios.get(`/api/sacerdotes/${id}`)
        .then((response) => {
          setSacerdoteData(response.data.sacerdote); // Almacena los datos del sacerdote en el estado
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  if (!sacerdoteData) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }


  const formikInitialValues = {
    name: sacerdoteData.name || '',
    lastname: sacerdoteData.lastname || '',
    dni: sacerdoteData.dni || '',
    placeOfBirth: sacerdoteData.placeOfBirth || '',
    dateOfBirth: sacerdoteData.dateOfBirth || '',
    address: sacerdoteData.address || '',
    locality: sacerdoteData.locality || '',
    postalCode: sacerdoteData.postalCode || '',
    phone: sacerdoteData.phone || '',
    celPhone: sacerdoteData.celPhone || '',
    imagen: sacerdoteData.imagen || '',
    email: sacerdoteData.email || '',
    healthCond: sacerdoteData.healthCond || '',
    obraSocial: sacerdoteData.obraSocial || '',
    numObraSocial: sacerdoteData.numObraSocial || '',
    fides: sacerdoteData.fides || '',
    socioFides: sacerdoteData.socioFides || '',
    summary: sacerdoteData.summary || '',
    education: sacerdoteData.education || [{ edType: '', degree: '', institution: '', receiptDate: '' }],
    experience: sacerdoteData.experience || [{ charge: '', place: '', decree: '', startDate: '', endDate: '' }],
    ministeries: sacerdoteData.ministeries || [{ ordinationDate: '', ministery: '', place: '', libro: '',folio: ''}],
  };

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
              <label htmlFor="dni" className="block font-bold mb-1">
                DNI:
              </label>
              <Field type="text" id="dni" name="dni" className="border rounded w-full p-2" />
              <ErrorMessage name="dni" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="placeOfBirth" className="block font-bold mb-1">
                Lugar de Nacimiento:
              </label>
              <Field type="text" id="placeOfBirth" name="placeOfBirth" className="border rounded w-full p-2" />
              <ErrorMessage name="placeOfBirth" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block font-semibold mb-1">
                Fecha de Nacimiento
              </label>
              <Field type="date" id="dateOfBirth" name="dateOfBirth" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block font-bold mb-1">
                Domicilio:
              </label>
              <Field type="text" id="address" name="address" className="border rounded w-full p-2" />
              <ErrorMessage name="address" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="locality" className="block font-bold mb-1">
                Localidad:
              </label>
              <Field type="text" id="locality" name="locality" className="border rounded w-full p-2" />
              <ErrorMessage name="locality" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block font-bold mb-1">
                Teléfono:
              </label>
              <Field type="text" id="phone" name="phone" className="border rounded w-full p-2" />
              <ErrorMessage name="phone" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="celPhone" className="block font-bold mb-1">
                Celular:
              </label>
              <Field type="text" id="celPhone" name="celPhone" className="border rounded w-full p-2" />
              <ErrorMessage name="celPhone" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="imagen" className="block font-bold mb-1">
                Imagen:
              </label>
              <Field type="text" id="imagen" name="imagen" className="border rounded w-full p-2" />
              <ErrorMessage name="imagen" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-1">
                Correo electrónico
              </label>
              <Field type="email" id="email" name="email" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="healthCond" className="block font-bold mb-1">
                Estado de Salud:
              </label>
              <Field type="text" id="healthCond" name="healthCond" className="border rounded w-full p-2" />
              <ErrorMessage name="healthCond" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="obraSocial" className="block font-semibold mb-1">
                Obra Social:
              </label>
              <Field type="text" id="obraSocial" name="obraSocial" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="obraSocial" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="numObraSocial" className="block font-semibold mb-1">
                Número de Obra Social
              </label>
              <Field type="text" id="numObraSocial" name="numObraSocial" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="numObraSocial" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="fides" className="block font-semibold mb-1">
                FIDES
              </label>
              <Field type="text" id="fides" name="fides" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="fides" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="socioFides" className="block font-semibold mb-1">
                Socio FIDES
              </label>
              <Field type="text" id="socioFides" name="socioFides" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="socioFides" component="div" className="text-red-500 mt-1" />
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
                            values?.education?.map((education, index) => {
                              // Código de mapeo aquí
                              return <div key={index}>{index}</div>;
                            })
                          ) : (
                            // Código si no hay elementos en values.education
                            <>Sin Datos de Educación</>
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
                      Agregar Estudios
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block font-semibold mb-1">
                Oficios/Cargos
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
                      Agregar Cargo
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="mb-4">
              <label htmlFor="ministeries" className="block font-semibold mb-1">
                Ministerios
              </label>
              <FieldArray name="ministeries">
                {(arrayHelpers) => (
                  <div>
                    {values?.ministeries?.map((_, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center">
                          <Field type="date" name={`ministeries[${index}].ordinatioDate`} className="w-full rounded border-gray-300 p-2" placeholder="Fecha Orden" />
                          <button type="button" onClick={() => arrayHelpers.remove(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                            Eliminar
                          </button>
                        </div>
                        <ErrorMessage name={`ministeries[${index}].ordinatioDate`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`ministeries[${index}].ministery`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Ministerio" />
                        <ErrorMessage name={`ministeries[${index}].ministery`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`ministeries[${index}].place`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Lugar" />
                        <ErrorMessage name={`ministeries[${index}].place`} component="div" className="text-red-500 mt-1" />
                        </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push({ position: '', years: '', company: '', highlights: [''] })} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Agregar Ministerio
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
