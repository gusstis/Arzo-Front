import React, { useState } from 'react';
import axios from 'axios';

const ParroquiaForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear objeto de parroquia con los valores ingresados ​​por el usuario
    const newParroquia = {
      name,
      address,
      postalCode,
      category,
    };

    try {
      // Hacer una solicitud POST al servidor para crear la parroquia
      const res = await axios.post('/api/parroquias', newParroquia);

      // Limpiar el formulario después de que la parroquia se haya creado exitosamente
      setName('');
      setAddress('');
      setPostalCode('');

      console.log('Parroquia creada:', res.data);
    } catch (error) {
      console.error('Error al crear la parroquia:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Dirección:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label>Código Postal:</label>
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ParroquiaForm;
