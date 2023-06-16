import dbConnect from '../lib/mongodb';
import Sacerdote from '../server/models/sacerdote';
import Cards from '../pages/menu/index';

import React from 'react';

export default function prueba() {
  return;
  <>
    <div>prueba</div>
    <>sacerdotes dashboard</>
  </>;
}

async function testDbConnect() {
  try {
    const connection = await dbConnect();
    console.log('Conexión exitosa en prueba.js');
    let sacerdote = new Sacerdote({
      name: 'sacerdote3',
      lastname: 'Tres',
      nombramiento: 'nombrado',
      postalCode: '5425',
      address: 'Mendoza 540 Norte',
      phone: '2641234567',
      imagen: 'string_de_la_img',
      dateOfBirth: '1990-02-03',
      CreatedAt: '2023-02-05',
    });
    console.log(sacerdote);
    await sacerdote.save();
    // Aquí puedes realizar consultas u operaciones en la base de datos utilizando la conexión establecida
  } catch (error) {
    console.error('Error al conectar a la base de datos (catch):', error);
  }
}

testDbConnect();
