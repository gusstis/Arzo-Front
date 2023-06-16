const Sacerdote = require('../../../server/models/sacerdote'); //importo modelo de Sacerdote
const Parroquia = require('../../../server/models/parroquia');
import { handleError, InvalidSacerdote, sacerdoteNotFound, parroquiaNotFound } from 'server/errors';
import { IsParroquiaSacerdoteValid } from 'server/helpers/sacerdoteHelpers';
import dbConnect from 'lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  console.log('Conectado a arzo-users-db');

  console.log('method', method);

  switch (method) {
    case 'POST':
      try {
        let sacerdote;
        sacerdote = new Sacerdote(req.body); //Creamos nuestro sacerdote
        console.log('guardando sacerdote');
        await sacerdote.save(); //se guarda el objeto Sacerdote en mongodb
        res.send(sacerdote); //se envía como respuesta

        console.log(req.body);
      } catch (error) {
        console.log('error', error);
        res.status(500).send(handleError(error));
      }
      console.log('retornando');
      return;
    case 'GET':
      try {
        const sacerdotes = await Sacerdote.find(); // busca y devuelve una lista de todos los sacerdotes en mongodb
        res.status(200).json({ sacerdotes }); // se envían como respuesta en formato json
        console.log(sacerdotes);
      } catch (error) {
        console.log(error);
        res.status(500).send('error get sacerdotes'); // Internal Server Error
      }
      return;

    case 'PUT':
      try {
        const { id } = req.query; // Obtén el ID del sacerdote de la ruta
        const updatedSacerdote = await Sacerdote.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedSacerdote) {
          // Si el sacerdote no existe, devuelve un error
          return res.status(404).json({ message: 'Sacerdote no encontrado' });
        }

        // Actualiza los datos del sacerdote con los valores enviados en la solicitud
        updatedSacerdote.name = req.body.name || updatedSacerdote.name;
        updatedSacerdote.lastname = req.body.lastname || updatedSacerdote.lastname;
        updatedSacerdote.address = req.body.address || updatedSacerdote.address;
        updatedSacerdote.nombramiento = req.body.nombramiento || updatedSacerdote.nombramiento;
        updatedSacerdote.postalCode = req.body.postalCode || updatedSacerdote.postalCode;
        updatedSacerdote.phone = req.body.phone || updatedSacerdote.phone;
        updatedSacerdote.imagen = req.body.imagen || updatedSacerdote.imagen;
        updatedSacerdote.parroquia = req.body.parroquia || updatedSacerdote.parroquia;
        updatedSacerdote.dateOfBirth = req.body.dateOfBirth || updatedSacerdote.dateOfBirth;
        updatedSacerdote.summary = req.body.summary || updatedSacerdote.summary;
        updatedSacerdote.website = req.body.website || updatedSacerdote.website;
        updatedSacerdote.age = req.body.age || updatedSacerdote.age;
        updatedSacerdote.degree = req.body.degree || updatedSacerdote.degree;
        updatedSacerdote.email = req.body.email || updatedSacerdote.email;
        updatedSacerdote.freelance = req.body.freelance || updatedSacerdote.freelance;
        updatedSacerdote.about = req.body.about || updatedSacerdote.about;
        updatedSacerdote.education = req.body.education || updatedSacerdote.education;
        updatedSacerdote.experience = req.body.experience || updatedSacerdote.experience;
        updatedSacerdote.CreatedAt = req.body.CreatedAt || updatedSacerdote.CreatedAt;
        updatedSacerdote.deletedAt = req.body.deletedAt || updatedSacerdote.deletedAt;

        await updatedSacerdote.save(); // Guarda los cambios en la base de datos

        res.status(200).json({ sacerdote: updatedSacerdote });
      } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el sacerdote');
      }
      return;

    case 'DELETE':
      try {
        const { id } = req.query; // Obtén el ID del sacerdote de la ruta
        const sacerdote = await Sacerdote.findById(id); // Busca el sacerdote en la base de datos por su ID

        if (!sacerdote) {
          // Si el sacerdote no existe, devuelve un error
          return res.status(404).json({ message: 'Sacerdote no encontrado' });
        }

        await sacerdote.remove(); // Elimina el sacerdote de la base de datos

        res.status(200).json({ message: 'Sacerdote eliminado correctamente' });
      } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el sacerdote');
      }
      return;
    default:
      res.status(404).send('method not found');
      return;

    case 'DEFAULT':
      console.log(error);
      res.status(404).send('method not found');
      return;
  }
}

// Este archivo se encarga de manejar las solicitudes relacionadas con los sacerdotes. Proporciona la lógica necesaria para crear nuevos sacerdotes, obtener una lista de sacerdotes y manejar métodos HTTP no admitidos.

/*
 * La función handler es el controlador principal de la ruta API. Toma la solicitud (req) y la respuesta (res) como parámetros y maneja la lógica para diferentes métodos HTTP (POST, GET, etc.).
 */

/*
 *Antes de procesar cualquier solicitud, se llama a la función dbConnect() para establecer una conexión con la base de datos. Esto garantiza que la conexión esté establecida antes de realizar cualquier operación en la base de datos. */

/* *
   * Se utiliza un switch para manejar diferentes métodos HTTP. Dependiendo del método, se ejecutará un bloque de código específico.
   *POST: En este caso, se crea un nuevo objeto Sacerdote utilizando los datos proporcionados en la solicitud (req.body). Luego se verifica si la parroquia asociada al sacerdote existe en la base de datos. Si no existe, se lanza una excepción. Después de realizar las validaciones, se guarda el objeto Sacerdote en la base de datos y se envía como respuesta (res.send()).
  *
  *  GET: Aquí, se busca y devuelve una lista de todos los sacerdotes existentes en la base de datos utilizando Sacerdote.find(). Los sacerdotes se envían como respuesta en formato JSON (res.json()).

  * DEFAULT: En caso de que se reciba un método no admitido, se devuelve una respuesta de estado 404 y se muestra el mensaje "method not found". 
  * */

// ? Cómo hacer una solicitud PUT?
/* import axios from 'axios';

const sacerdoteId = '647b4891ad096569733eaa97'; // ID del sacerdote que deseas actualizar

const newData = {
  nombre: 'Nuevo nombre',
  direccion: 'Nueva dirección',
  // Agrega aquí los demás campos que deseas actualizar
};

axios
  .put(`/api/sacerdotes/${sacerdoteId}`, newData)
  .then(response => {
    console.log('Sacerdote actualizado:', response.data);
  })
  .catch(error => {
    console.error('Error al actualizar el sacerdote:', error);
  }); */
