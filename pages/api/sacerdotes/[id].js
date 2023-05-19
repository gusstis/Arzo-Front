const Sacerdote = require("server/models/sacerdote");
const Parroquia = require("server/models/parroquia");
import { handleError, InvalidSacerdote } from 'server/errors';
import dbConnect from 'lib/mongodb'
import { useRouter } from 'next/router'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':

            try {

                const sacerdotes = await Sacerdote.find({_id:req.query.id});
                if (sacerdotes.length==0){
                    throw new InvalidSacerdote("No existe un sacerdote con el id indicado")
                }
                res.json(sacerdotes)

            } catch (error) {
                console.log(error);
                res.status(500).send(handleError(error));
            }
                return
            
        case 'PUT':
            try {

                const { nombre, categoria, ubicacion, precio } = req.body;
                let sacerdote = await Sacerdote.findById(req.query.id);

                if (!sacerdote) {
                    throw new InvalidSacerdote("No existe un sacerdote con el id indicado")
                }

                sacerdote.name = nombre;
                sacerdote.categoria = categoria;
                sacerdote.ubicacion = ubicacion;
                sacerdote.precio = precio;

                sacerdote = await Sacerdote.findOneAndUpdate({ _id: req.query.id }, sacerdote, { new: true });
                res.json(sacerdote);

            } catch (error) {
                console.log(error);
                res.status(500).send("error.....put");
            }
                return
            

        case 'DELETE':

            try {
                let sacerdote = await Sacerdote.findById(req.params.id);

                if (!sacerdote) {
                    throw new InvalidSacerdote("No existe un sacerdote con el id indicado")
                }

                await Sacerdote.findOneAndRemove({ _id: req.params.id })
                res.json({ msg: 'Sacerdote eliminado con éxito' });

            } catch (error) {
                console.log(error);
                res.status(500).send("error, en el mtd eliminarSacerdote");
            }
                return
            
        case 'DEFAULT':
            console.log(error);
            res.status(404).send("method not found");
            return
    }
}