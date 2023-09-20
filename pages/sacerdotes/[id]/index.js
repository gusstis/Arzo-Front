import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import ErrorMsg from '@common/ErrorMsg'
import Loader from '@common/Loader'
import DateFormatter from '@common/DateFormatter';


export default function SacerdoteDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sacerdote, setSacerdote] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/sacerdotes/${id}`);
        const sacerdote = response.data.sacerdote;
        //const parroquiaId = sacerdote.parroquia[0];
  
        {/*// Realizar una solicitud adicional para obtener información de la parroquia
        if (parroquiaId) {
          const parroquiaResponse = await axios.get(`/api/parroquias/${parroquiaId}`);
          const parroquia = parroquiaResponse.data.parroquia;
          sacerdote.parroquia[0] = parroquia.name;
          console.log('parroquia: ', sacerdote.parroquia[0])
        }*/}
  
        setSacerdote(sacerdote);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
  
    if (id) {
      fetchData();
    }
  }, [id]);
  
  
  //console.log(sacerdote.parroquia)

  return (
    <>
      {loading && <Loader />}
    {error && <ErrorMsg message="Hubo un error al cargar los datos." />}
      {sacerdote && (
        <>
          <section id="about" className="mt-8 mb-12">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2 className="text-3xl font-bold">{sacerdote.name || ''} {sacerdote.lastname || ''}</h2>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3">
                  <Image src={sacerdote.imagen || ''} className="img-fluid" alt="avatar" width={200} height={200} />
                </div>
                <div className="lg:w-2/3 pt-4 pt-lg-0 content">
                  <h6 className="text-2xl font-bold">
                    {sacerdote.lastname || ''} {sacerdote.name || ''}
                  </h6>

                 {/*<h6 className="text-1xl font-bold">
                    Parroquia: {sacerdote.parroquia[0] || 'no ta'}
                  </h6>*/}
                  {<h6 className="text-1xl font-bold">
                      DNI: {sacerdote.dni}
                    </h6>}                  
                  <p className="italic">{sacerdote.nombramiento || ''}</p>
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <ul>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Lugar de Nacimiento:</strong> {sacerdote.placeOfBirth || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Dirección:</strong> {sacerdote.address || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Teléfono:</strong> {sacerdote.phone || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Celular:</strong> {sacerdote.celPhone || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Estado de Salud:</strong> {sacerdote.healthCond || ''}
                        </li>
                      </ul>
                    </div>
                    <div className="lg:w-1/2">
                      <ul>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Fecha de Nacimiento:</strong> <DateFormatter dateString={sacerdote.dateOfBirth || ''} />
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Localidad:</strong> {sacerdote.locality || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Email:</strong> {sacerdote.email || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Obra Social:</strong> {sacerdote.obraSocial || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>FIDES:</strong> {sacerdote.fides ? 'Available' : 'Not Available'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container mt-8 mb-12">
            <h3 className="text-2xl font-bold">Estudios Realizados</h3>
            <div className="grid grid-cols-2 gap-4">
              {sacerdote.education &&
                sacerdote.education.map((educationItem, index) => (
                  <div className="p-4 bg-gray-100 rounded" key={index}>
                    <h4 className="text-lg font-bold">{educationItem.edType || ''}</h4>
                    <h5 className="text-md">{educationItem.degree || ''}</h5>
                    <p>
                      <em>{educationItem.institution || ''}</em>
                    </p>
                    <p>{educationItem.receiptDate || ''}</p>
                  </div>
                ))}
            </div>

            <h3 className="mt-8 mb-4 text-2xl font-bold">Oficios / Cargos</h3>
            <div className="grid grid-cols-2 gap-4">
              {sacerdote.experience &&
                sacerdote.experience.map((experienceItem, index) => (
                  <div className="p-4 bg-gray-100 rounded" key={index}>
                    <h4 className="text-lg font-bold">{experienceItem.startDate || ''}</h4>
                    <h5 className="text-md">{experienceItem.endDate || ''}</h5>
                    <h4 className="text-lg font-bold">{experienceItem.charge || ''}</h4>
                    <h5 className="text-md">{experienceItem.place || ''}</h5>
                    <h5 className="text-md">{experienceItem.decree || ''}</h5>
                  </div>
                ))}
            </div>

            <h3 className="mt-8 mb-4 text-2xl font-bold">Ministerios</h3>
            <div className="grid grid-cols-2 gap-4">
              {sacerdote.experience &&
                sacerdote.experience.map((experienceItem, index) => (
                  <div className="p-4 bg-gray-100 rounded" key={index}>
                    <h4 className="text-lg font-bold">{experienceItem.ordinationDate || ''}</h4>
                    <h5 className="text-md">{experienceItem.ministery || ''}</h5>
                    <h4 className="text-lg font-bold">{experienceItem.place || ''}</h4>
                  </div>
                ))}
</div>
          </div>
        </>
      )}
    </>
  );
}

{/* Recomendaciones para manejar mejor el estado de carga al obtener datos asíncronos en un componente React:

1. Separar estado de loading:

En lugar de sólo tener sacerdote, puedes manejar estado loading y error separado:

jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null); 
const [sacerdote, setSacerdote] = useState(null);

2. Setear loading antes del fetch:
Antes de la llamada asincrónica, settea loading en true:

jsx
setLoading(true);

axios.get(url)
  .then(res => {
    setLoading(false);
    setSacerdote(res.data); 
  })
  .catch(err => {
    setLoading(false);
    setError(err);
  })

  3. Renderizar estado:

Muestra un loader mientras loading es true:

jsx
return (
  {loading && <Loader />}
  {error && <ErrorMsg />}
  {sacerdote && <SacerdoteDetails />}
)

4. useAsync custom hook
Externaliza la lógica en un custom hook:

js
function useAsync(request) {
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    setLoading(true);
    try {
      const response = await request();
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  return { execute, loading };
}

Y luego en el componente:

jsx
const { execute, loading } = useAsync(fetchSacerdote); 

useEffect(() => {
  execute();
}, [])

Esto permite reutilizar la lógica en múltiples componentes.

En resumen, manejar el estado de loading explícitamente y externalizar la lógica puede ayudar a tener un componente más robusto y predecible.*/}


