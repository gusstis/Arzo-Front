import dbConnect from '@lib/mongodb';
import Parroquia from '@models/parroquia';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const parroquia = new Parroquia(req.body);
        await parroquia.save();
        res.status(200).json({ parroquia });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la parroquia' });
      }
      break;
    case 'GET':
      try {
        const parroquias = await Parroquia.find();
        res.status(200).json({ parroquias });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las parroquias' });
      }
      break;
    case 'PUT':
      try {
        const { id } = req.query;
        const parroquia = await Parroquia.findById(id);

        if (!parroquia) {
          return res.status(404).json({ message: 'Parroquia no encontrada' });
        }

        parroquia.name = req.body.name;
        parroquia.address = req.body.address;
        parroquia.postalCode = req.body.postalCode;
        parroquia.emailParroquia = req.body.emailParroquia

        await parroquia.save();
        res.status(200).json({ parroquia });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la parroquia' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.query;
        const parroquia = await Parroquia.findById(id);

        if (!parroquia) {
          return res.status(404).json({ message: 'Parroquia no encontrada' });
        }

        await parroquia.remove();
        res.status(200).json({ message: 'Parroquia eliminada correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la parroquia' });
      }
      break;
    default:
      res.status(404).json({ error: 'Método no encontrado' });
      break;
  }
}
