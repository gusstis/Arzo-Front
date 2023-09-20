import dbConnect from 'lib/mongodb';
import Parroquia from 'server/models/parroquia';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const parroquia = await Parroquia.findById(id);

        if (!parroquia) {
          return res.status(404).json({ message: 'Parroquia not found' });
        }

        res.status(200).json({ parroquia });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving parroquia' });
      }
      break;

    case 'PUT':
      try {
        const { name, address, postalCode, emailParroquia, CreatedAt } = req.body;
        const updatedParroquiaData = { name, address, postalCode, emailParroquia };
        
        // Si CreatedAt está presente en el cuerpo de la solicitud, conviértelo a un objeto Date
        if (CreatedAt) {
          updatedParroquiaData.CreatedAt = new Date(CreatedAt);
    }
        
        const updatedParroquia = await Parroquia.findByIdAndUpdate(id, updatedParroquiaData, { new: true });

        if (!updatedParroquia) {
          return res.status(404).json({ message: 'Parroquia not found' });
        }

        res.status(200).json({ parroquia: updatedParroquia });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating parroquia' });
      }
      break;

    case 'DELETE':
      try {
        const deletedParroquia = await Parroquia.findByIdAndDelete(id);

        if (!deletedParroquia) {
          return res.status(404).json({ message: 'Parroquia not found' });
        }

        res.status(200).json({ message: 'Parroquia deleted successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting parroquia' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
