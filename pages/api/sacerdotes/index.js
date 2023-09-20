const Sacerdote = require('../../../server/models/sacerdote'); // importo modelo de Sacerdote
//const Parroquia = require('../../../server/models/parroquia');
import { handleError, InvalidSacerdote, sacerdoteNotFound, parroquiaNotFound } from 'server/errors';
//import { IsParroquiaSacerdoteValid } from 'server/helpers/sacerdoteHelpers';
import dbConnect from '@lib/mongodb';
//import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  console.log('dbConnect from /pages/api/sacerdotes');

  //console.log('method', method);

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

        //console.log(Sacerdote);
        const sacerdotes = await Sacerdote.find(); // busca y devuelve una lista de todos los sacerdotes en mongodb
        res.status(200).json({ sacerdotes }); // se envían como respuesta en formato json
        //console.log(sacerdotes);
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
        updatedSacerdote.dni = req.body.dni || updatedSacerdote.dni;
        updatedSacerdote.postalCode = req.body.postalCode || updatedSacerdote.postalCode;
        updatedSacerdote.phone = req.body.phone || updatedSacerdote.phone;
        updatedSacerdote.imagen = req.body.imagen || updatedSacerdote.imagen;
        updatedSacerdote.placeOfBirth = req.body.placeOfBirth || updatedSacerdote.placeOfBirth;
        updatedSacerdote.dateOfBirth = req.body.dateOfBirth || updatedSacerdote.dateOfBirth;
        updatedSacerdote.locality = req.body.locality || updatedSacerdote.locality;
        updatedSacerdote.celPhone = req.body.celPhone || updatedSacerdote.celPhone;
        updatedSacerdote.healthCond = req.body.healthCond || updatedSacerdote.healthCond;
        updatedSacerdote.obraSocial = req.body.obraSocial || updatedSacerdote.obraSocial;
        updatedSacerdote.email = req.body.email || updatedSacerdote.email;
        updatedSacerdote.numObraSocial = req.body.numObraSocial || updatedSacerdote.numObraSocial;
        updatedSacerdote.education = req.body.education || updatedSacerdote.education;
        updatedSacerdote.experience = req.body.experience || updatedSacerdote.experience;
        updatedSacerdote.ministeries = req.body.ministeries || updatedSacerdote.ministeries;
        updatedSacerdote.fides = req.body.fides || updatedSacerdote.fides;
        updatedSacerdote.socioFides = req.body.socioFides || updatedSacerdote.socioFides;
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


