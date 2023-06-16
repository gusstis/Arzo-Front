const axios = require('axios');

const data = {
  name: 'Rubén Gustavo',
  lastname: 'Priesting',
  nombramiento: ['Lectorado'],
  postalCode: '1281',
  address: 'Iglesia Catedral',
  phone: '15-482-0011',
  imagen: 'https://static.vecteezy.com/system/resources/previews/023/218/006/non_2x/spy-african-pose-design-character-on-white-background-free-vector.jpg',
  parroquia: ['609', '508'],
  dateOfBirth: '1950-05-20',
  summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  website: 'https://example.com',
  age: 34,
  degree: 'Diácono',
  email: 'joseepe@gmail.com',
  freelance: true,
  about:
    'By default, NextAuth.js will normalize the email address. It treats values as case-insensitive (which is technically not compliant to the RFC 2821 spec, but in practice this causes more problems than it solves, eg. when looking up users by e-mail from databases.) and also removes any secondary email address that was passed in as a comma-separated list. You can apply your own normalization via the normalizeIdentifier method on the EmailProvider.',
  education: [
    {
      degree: 'Profesor de Psicología',
      year: '2019',
      institution: 'Universidad Católica de Cuyo',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      degree: 'Profesor de Teología',
      year: '2010',
      institution: 'Universidad Católica de Cuyo',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ],
  experience: [
    {
      position: 'Vicario Parroquial',
      years: '2009-2011',
      company: 'Parroquia Villa Krawse',
      highlights: ['Organized community events', 'Led youth group activities'],
    },
    {
      position: 'Vicario Parroquial',
      years: '2010-2012',
      company: 'Parroquia Sagrado Corazón Marquezado',
      highlights: ['Developed outreach programs', 'Led weekly worship services'],
    },
    /*     {
      position: 'Miembro del Tribunal Eclesiástico',
      years: '2016- --',
      company: 'Notario',
      highlights: ['Developed outreach programs', 'Led weekly worship services'],
    }, */
    {
      position: 'Capellán',
      years: '2014-2015',
      company: 'Interno, de la Parroquia Nuestra Señora de Lourdes, Arquidiócesis de Buenos Aires',
      highlights: ['Developed outreach programs', 'Led weekly worship services'],
    },
  ],
};

axios
  .post('http://localhost:3000/api/sacerdotes', data)
  .then((response) => {
    console.log('Documento guardado:', response.data);
  })
  .catch((error) => {
    console.error('Error al guardar el documento:', error);
  });
