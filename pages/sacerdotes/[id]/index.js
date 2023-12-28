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
                <h3 className="text-3xl font-bold">{sacerdote.name || ''} {sacerdote.lastname || ''}</h3>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3">
                  <Image src={sacerdote.imagen || ''} className="img-fluid" alt="avatar" width={200} height={200} />
                </div>
                <div className="lg:w-2/3 pt-4 pt-lg-0 content">
                <h2 className="text-3xl font-bold">Datos Personales</h2>
                  <h6 className="text-1xl font-bold">
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
                          <i className="bi bi-rounded-right"></i> <strong>FIDES:</strong> {sacerdote.fides ? 'Disponible' : 'No Disponible'}
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
                    <h4 className="text-lg font-bold"> Tipo: {educationItem.edType || ''}</h4>
                    <h5 className="text-md"> Título: {educationItem.degree || ''}</h5>
                    <p>
                      <em> Lugar: {educationItem.institution || ''}</em>
                    </p>
                    <p> Fecha Recibida: <DateFormatter dateString={educationItem.receiptDate || ''} /></p>
                  </div>
                ))}
            </div>

            <h3 className="mt-8 mb-4 text-2xl font-bold">Oficios / Cargos</h3>
            <div className="grid grid-cols-2 gap-4">
              {sacerdote.experience &&
                sacerdote.experience.map((experienceItem, index) => (
                  <div className="p-4 bg-gray-100 rounded" key={index}>
                    <h4 className="text-lg font-bold"> Desde:   <DateFormatter dateString={experienceItem.startDate || ''}/> </h4> 
                    <h5 className="text-md"> Hasta:    <DateFormatter dateString={experienceItem.endDate || ''}/> </h5>
                    <h4 className="text-lg font-bold">Cargo: {experienceItem.charge || ''}</h4>
                    <h5 className="text-md"> Lugar:  {experienceItem.place || ''}</h5>
                    <h5 className="text-md"> Decreto: {experienceItem.decree || ''}</h5>
                  </div>
                ))}
            </div>

            <h3 className="mt-8 mb-4 text-2xl font-bold">Ministerios</h3>
            <div className="grid grid-cols-3 gap-4">
              {sacerdote.ministeries &&
                sacerdote.ministeries.map((ministeriesItem, index) => (
                  <div className="p-4 bg-gray-100 rounded" key={index}>
                    <h4 className="text-lg "> Fecha Orden: <DateFormatter dateString={ministeriesItem.ordinationDate || ''} /> </h4>
                    <h5 className="text-md font-bold"> Ministerio: {ministeriesItem.ministery || ''}</h5>
                    <h4 className="text-lg "> Lugar: {ministeriesItem.place || ''}</h4>
                    <h4 className="text-lg "> Folio: {ministeriesItem.folio || ''}</h4>
                    <h4 className="text-lg "> Libro: {ministeriesItem.libro || ''}</h4>
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


