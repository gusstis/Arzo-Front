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
  phone: Yup.string()
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
          dni: '',
          placeOfBirth: '',
          dateOfBirth: '',
          address: '',
          locality: '',
          postalCode: '',
          phone: '',
          celPhone: '',
          imagen: '',
          email: '',
          healthCond: '',
          obraSocial: '',
          numObraSocial: '',
          fides: '',
          socioFides: '',
          nombramiento: [],
          parroquia: [],
          education: [{ edType: '', degree: '', institution: '', receiptDate: '' }],
          experience: [{ charge: '', place: '', decree: '', startDate: '', endDate: '' }],
          ministeries: [{ ordinationDate: '', ministery: '', place: ''}],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-1">
                Nombres
              </label>
              <Field type="text" id="name" name="name" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="lastname" className="block font-semibold mb-1">
                Apellidos
              </label>
              <Field type="text" id="lastname" name="lastname" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="lastname" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="dni" className="block font-semibold mb-1">
                DNI
              </label>
              <Field type="text" id="dni" name="dni" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="dni" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="placeOfBirth" className="block font-semibold mb-1">
                Lugar de Nacimiento
              </label>
              <Field type="text" id="placeOfBirth" name="placeOfBirth" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="placeOfBirth" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block font-semibold mb-1">
                Fecha de Nacimiento
              </label>
              <Field type="date" id="dateOfBirth" name="dateOfBirth" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block font-semibold mb-1">
                Domicilio
              </label>
              <Field type="text" id="address" name="address" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="address" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="locality" className="block font-semibold mb-1">
                Localidad
              </label>
              <Field type="text" id="locality" name="locality" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="locality" component="div" className="text-red-500 mt-1" />
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
              <label htmlFor="celPhone" className="block font-semibold mb-1">
                Celular
              </label>
              <Field type="text" id="celPhone" name="celPhone" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="celPhone" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="imagen" className="block font-semibold mb-1">
                Imagen
              </label>
              <Field type="text" id="imagen" name="imagen" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="imagen" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-1">
                Correo electrónico
              </label>
              <Field type="email" id="email" name="email" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="healthCond" className="block font-semibold mb-1">
                Condición de Salud
              </label>
              <Field type="healthCond" id="healthCond" name="healthCond" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="healthCond" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="obraSocial" className="block font-semibold mb-1">
                Obra Social
              </label>
              <Field type="obraSocial" id="obraSocial" name="obraSocial" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="obraSocial" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="nunObraSocial" className="block font-semibold mb-1">
                Número de Obra Social
              </label>
              <Field type="nunObraSocial" id="nunObraSocial" name="nunObraSocial" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="nunObraSocial" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="fides" className="block font-semibold mb-1">
                FIDES
              </label>
              <Field type="fides" id="fides" name="fides" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="fides" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="socioFides" className="block font-semibold mb-1">
                Socio FIDES
              </label>
              <Field type="socioFides" id="socioFides" name="socioFides" className="w-full rounded border-gray-300 p-2" />
              <ErrorMessage name="socioFides" component="div" className="text-red-500 mt-1" />
            </div>


            {/*<div className="mb-4">
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
                  </div>*/}


            <div className="mb-4">
              <label htmlFor="education" className="block font-semibold mb-1">
                Estudios Realizados
              </label>
              <FieldArray name="education">
                {(arrayHelpers) => (
                  <div>
                    {values.education.map((_, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center">
                          <Field type="text" name={`education[${index}].edType`} className="w-full rounded border-gray-300 p-2" placeholder="Tipo" />
                          <button type="button" onClick={() => arrayHelpers.remove(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                            Eliminar
                          </button>
                        </div>
                        <ErrorMessage name={`education[${index}].edType`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`education[${index}].degree`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Título" />
                        <ErrorMessage name={`education[${index}].degree`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`education[${index}].institution`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Lugar" />
                        <ErrorMessage name={`education[${index}].institution`} component="div" className="text-red-500 mt-1" />
                        <label className="text-gray-600 text-sm">Fecha Recibida</label>
                        <Field type="date" name={`education[${index}].receiptDate`} rows="4" className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Fecha Recibida" />
                        <ErrorMessage name={`education[${index}].receiptDate`} component="div" className="text-red-500 mt-1" />
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push({ edType: '', degree: '', institution: '', receiptDate: '' })} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Agregar Estudios Realizados
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block font-semibold mb-1">
                Oficios / Cargos
              </label>
              <FieldArray name="experience">
  {(arrayHelpers) => (
    <div>
      {values.experience.map((_, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center">
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Desde</label>
              <Field type="date" name={`experience[${index}].startDate`} className="w-full rounded border-gray-300 p-2" />
            </div>
            <div className="flex flex-col ml-2">
              <label className="text-gray-600 text-sm">Hasta</label>
              <Field type="date" name={`experience[${index}].endDate`} className="w-full rounded border-gray-300 p-2" />
            </div>
            <button type="button" onClick={() => arrayHelpers.remove(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
              Eliminar
            </button>
          </div>
          <ErrorMessage name={`experience[${index}].startDate`} component="div" className="text-red-500 mt-1" />
          <ErrorMessage name={`experience[${index}].endDate`} component="div" className="text-red-500 mt-1" />
          <Field type="text" name={`experience[${index}].charge`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Cargo" />
          <ErrorMessage name={`experience[${index}].charge`} component="div" className="text-red-500 mt-1" />
          <Field type="text" name={`experience[${index}].place`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Lugar" />
          <ErrorMessage name={`experience[${index}].place`} component="div" className="text-red-500 mt-1" />
          <Field type="text" name={`experience[${index}].decree`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Decreto" />
          <ErrorMessage name={`experience[${index}].decree`} component="div" className="text-red-500 mt-1" />
        </div>
      ))}
      <button type="button" onClick={() => arrayHelpers.push({ edType: '', degree: '', institution: '', receiptDate: '' })} className="bg-blue-500 text-white px-2 py-1 rounded">
        Agregar Oficios/Cargos
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
                    {values.ministeries.map((_, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center">
                        <div>
                        <label className="text-gray-600 text-sm">Fecha Orden</label>
                          <Field type="date" name={`ministeries[${index}].ordinationDate`} className="w-full rounded border-gray-300 p-2" placeholder="Fecha Orden" />
                        </div>
                          <button type="button" onClick={() => arrayHelpers.remove(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                            Eliminar
                          </button>
                        </div>
                        <ErrorMessage name={`ministeries[${index}].ordinationDate`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`ministeries[${index}].ministery`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Ministerio" />
                        <ErrorMessage name={`ministeries[${index}].ministery`} component="div" className="text-red-500 mt-1" />
                        <Field type="text" name={`ministeries[${index}].place`} className="w-full rounded border-gray-300 p-2 mt-2" placeholder="Lugar" />
                        <ErrorMessage name={`ministeries[${index}].place`} component="div" className="text-red-500 mt-1" />
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push({ edType: '', degree: '', institution: '', receiptDate: '' })} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Agregar Ministerios
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
