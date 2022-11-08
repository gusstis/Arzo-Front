 const Parroquia = require("../../server/models/Parroquia");
 import dbConnect from '../../lib/mongodb'


 export default async function handler(req, res) {
     const { method } = req

     await dbConnect()


     switch (method) {
         case 'POST':

             try {
                 let parroquia;
                 console.log(req.body)

                 //Creamos nuestro parroquia
                 parroquia = new Parroquia(req.body);

                 await parroquia.save();
                 res.send(parroquia);

                 console.log(req.body)
             } catch (error) {
                 console.log(error);
                 handleError(error)
             } finally {
                 return
             };
         case 'GET':

             try {

                 const parroquias = await Parroquia.find();
                 res.json(parroquias)

             } catch (error) {
                 console.log(error);
                 res.status(500).send("error.....get");
             } finally {
                 return
             };
         case 'PUT':
             try {

                 const { nombre, categoria, ubicacion, precio } = req.body;
                 let parroquia = await Parroquia.findById(req.params.id);

                 if (!parroquia) {
                     res.status(404).json({ msg: 'Parroquia inexistente' })
                 }

                 parroquia.name = nombre;
                 parroquia.categoria = categoria;
                 parroquia.ubicacion = ubicacion;
                 parroquia.precio = precio;

                 parroquia = await Parroquia.findOneAndUpdate({ _id: req.params.id }, parroquia, { new: true });
                 res.json(parroquia);

             } catch (error) {
                 console.log(error);
                 res.status(500).send("error.....put");
             } finally {
                 return
             };

         case 'DELETE':

             try {
                 let parroquia = await Parroquia.findById(req.params.id);

                 if (!parroquia) {
                     res.status(404).json({ msg: 'Parroquia inexistente' })
                 }

                 await Parroquia.findOneAndRemove({ _id: req.params.id })
                 res.json({ msg: 'Parroquia eliminado con éxito' });

             } catch (error) {
                 console.log(error);
                 res.status(500).send("error, en el mtd eliminarParroquia");
             } finally {
                 return
             };
         case 'DEFAULT':
             console.log(error);
             res.status(404).send("method not found");
             return
     }
 }