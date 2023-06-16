import dbConnect from 'lib/mongodb';
import Sacerdote from 'server/models/sacerdote';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const sacerdote = await Sacerdote.findById(id);

        if (!sacerdote) {
          return res.status(404).json({ message: 'Sacerdote not found' });
        }

        res.status(200).json({ sacerdote });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving sacerdote' });
      }
      break;

    case 'PUT':
      try {
        const updatedSacerdote = await Sacerdote.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedSacerdote) {
          return res.status(404).json({ message: 'Sacerdote not found' });
        }

        res.status(200).json({ sacerdote: updatedSacerdote });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating sacerdote' });
      }
      break;

    case 'DELETE':
      try {
        const deletedSacerdote = await Sacerdote.findByIdAndDelete(id);

        if (!deletedSacerdote) {
          return res.status(404).json({ message: 'Sacerdote not found' });
        }

        res.status(200).json({ message: 'Sacerdote deleted successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting sacerdote' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
