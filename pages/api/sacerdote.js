const Sacerdote = require("../../server/models/Sacerdote");
const mongoose = require('mongoose');
const Parroquia = require("../../server/models/Parroquia");
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
                if (mongoose.Types.ObjectId.isValid(sacerdote.parroquia) && Parroquia.findById(sacerdote.parroquia)) {
                    await sacerdote.save();
                    res.send(sacerdote);
                } else {
                    res.status(500)
                        .send(
                            JSON.stringify({
                                "code": "11",
                                "message": "parroquia not found"
                            })
                        )
                }

                console.log(req.body)
            } catch (error) {
                console.log(error);
                res.status(500).send("error.....post");
            } finally {
                return
            };
        case 'GET':

            try {

                const sacerdotes = await Sacerdote.find();
                res.json(sacerdotes)

            } catch (error) {
                console.log(error);
                res.status(500).send("error.....get");
            } finally {
                return
            };
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
            } finally {
                return
            };

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
            } finally {
                return
            };
        case 'DEFAULT':
            console.log(error);
            res.status(404).send("method not found");
            return
    }
}