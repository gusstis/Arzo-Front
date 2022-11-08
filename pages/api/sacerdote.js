const Sacerdote = require("../../server/models/Sacerdote");
const Parroquia = require("../../server/models/Parroquia");
import { handleError, InvalidSacerdote } from 'server/errors';
import { IsParroquiaSacerdoteValid } from 'server/helpers/sacerdoteHelpers';
import dbConnect from '../../lib/mongodb'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()


    switch (method) {
        case 'POST':

            try {
                let parroquia;
                let sacerdote;
                console.log(req.body)

                //Creamos nuestro sacerdote
                sacerdote = new Sacerdote(req.body);
                console.log("sacerdote.parroquia:", sacerdote.parroquia)

                if (IsParroquiaSacerdoteValid(sacerdote)) {
                    await sacerdote.save();
                    res.send(sacerdote);
                } else {
                    throw new InvalidSacerdote("La parroquia del sacerdote no existe")
                }

                console.log(req.body)
            } catch (error) {
                console.log(error);
                res.status(500).send(handleError(error));
            } 
                return
            
        case 'GET':

            try {

                const sacerdotes = await Sacerdote.find();
                res.json(sacerdotes)

            } catch (error) {
                console.log(error);
                res.status(500).send("error.....get");
            }
                return
            
        case 'PUT':
            try {

                const { nombre, categoria, ubicacion, precio } = req.body;
                let sacerdote = await Sacerdote.findById(req.params.id);

                if (!sacerdote) {
                    res.status(404).json({ msg: 'Sacerdote inexistente' })
                }

                sacerdote.name = nombre;
                sacerdote.categoria = categoria;
                sacerdote.ubicacion = ubicacion;
                sacerdote.precio = precio;

                sacerdote = await Sacerdote.findOneAndUpdate({ _id: req.params.id }, sacerdote, { new: true });
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
                    res.status(404).json({ msg: 'Sacerdote inexistente' })
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