import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

export default function SacerdoteDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [sacerdote, setSacerdote] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/sacerdotes/${id}`)
        .then((response) => {
          setSacerdote(response.data.sacerdote);
          console.log('response.data.sacerdote');
          //console.log(response.data.sacerdote);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  console.log(sacerdote && sacerdote.imagen);
  console.log('sacerdote.imagen');

  return (
    <>
      {sacerdote && (
        <>
          <section id="about" className="mt-8 mb-12">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2 className="text-3xl font-bold">Commentary</h2>
                <p>{sacerdote.summary || ''}</p>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3">
                  <Image src={sacerdote.imagen || ''} className="img-fluid" alt="" width={200} height={200} />
                </div>
                <div className="lg:w-2/3 pt-4 pt-lg-0 content">
                  <h3 className="text-2xl font-bold">
                    {sacerdote.name || ''} {sacerdote.lastname || ''}
                  </h3>
                  <p className="italic">{sacerdote.nombramiento || ''}</p>
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <ul>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Fecha de Nacimiento:</strong> {sacerdote.dateOfBirth || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Website:</strong> {sacerdote.website || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Teléfono:</strong> {sacerdote.phone || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Dirección:</strong> {sacerdote.address || ''}
                        </li>
                      </ul>
                    </div>
                    <div className="lg:w-1/2">
                      <ul>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Edad:</strong> {sacerdote.age || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Degree:</strong> {sacerdote.degree || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Email:</strong> {sacerdote.email || ''}
                        </li>
                        <li>
                          <i className="bi bi-rounded-right"></i> <strong>Freelance:</strong> {sacerdote.freelance ? 'Available' : 'Not Available'}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>{sacerdote.about || ''}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="container mt-8 mb-12">
            <h3 className="text-2xl font-bold">Formación Académica</h3>
            <div className="grid grid-cols-2 gap-4">
              {sacerdote.education &&
                sacerdote.education.map((educationItem, index) => (
                  <div className="p-4 bg-gray-100 rounded" key={index}>
                    <h4 className="text-lg font-bold">{educationItem.degree || ''}</h4>
                    <h5 className="text-md">{educationItem.year || ''}</h5>
                    <p>
                      <em>{educationItem.institution || ''}</em>
                    </p>
                    <p>{educationItem.description || ''}</p>
                  </div>
                ))}
            </div>

            <h3 className="mt-8 mb-4 text-2xl font-bold">Professional Experience</h3>
            <div className="grid grid-cols-2 gap-4">
              {sacerdote.experience &&
                sacerdote.experience.map((experienceItem, index) => (
                  <div className="p-4 bg-gray-100 rounded" key={index}>
                    <h4 className="text-lg font-bold">{experienceItem.position || ''}</h4>
                    <h5 className="text-md">{experienceItem.years || ''}</h5>
                    <p>
                      <em>{experienceItem.company || ''}</em>
                    </p>
                    <ul className="list-disc list-inside">{experienceItem.highlights && experienceItem.highlights.map((highlight, index) => <li key={index}>{highlight}</li>)}</ul>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
