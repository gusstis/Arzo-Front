import dbConnect from 'lib/mongodb';
import User from 'server/models/user';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { name, lastname, category, email, type } = req.body;

        // Crear un nuevo usuario con los datos proporcionados
        const newUser = await User.create({
          name,
          lastname,
          category,
          email,
          type,
        });

        res.status(201).json({ user: newUser });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user' });
      }
      break;

    case 'GET':
      try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving user' });
      }
      break;

    case 'PUT':
      try {
        const { lastname, category, email, type } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { lastname, category, email, type }, { new: true });

        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: updatedUser });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating user' });
      }
      break;

    case 'DELETE':
      try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
