import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

export default function ParroquiaDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [parroquia, setParroquia] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/parroquias/${id}`)
        .then((response) => {
          setParroquia(response.data.parroquia);
          console.log('response.data.parroquia');
          //console.log(response.data.parroquia);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  
  return (
    <>
      {parroquia && (
        <>
          <section id="about" className="mt-8 mb-12">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2 className="text-3xl font-bold">Commentary</h2>
                <p>{parroquia.summary || ''}</p>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3">
                  <Image src={parroquia.imagen || ''} className="img-fluid" alt="" width={200} height={200} />
                </div>
                <div className="lg:w-2/3 pt-4 pt-lg-0 content">
                  <h3 className="text-2xl font-bold">
                    {parroquia.name || ''} {parroquia.lastname || ''}
                  </h3>
                  <p className="italic">{parroquia.nombramiento || ''}</p>
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <ul>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Fecha de Nacimiento:</strong> {parroquia.dateOfBirth || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Website:</strong> {parroquia.website || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Teléfono:</strong> {parroquia.phone || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Dirección:</strong> {parroquia.address || ''}
                        </li>
                      </ul>
                    </div>
                    <div className="lg:w-1/2">
                      <ul>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Código Postal:</strong> {parroquia.postalCode || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Fecha de creación:</strong> {parroquia.CreatedAt || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Email:</strong> {parroquia.email || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Freelance:</strong> {parroquia.freelance ? 'Available' : 'Not Available'}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>{parroquia.about || ''}</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
