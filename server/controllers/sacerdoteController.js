const { findOneAndUpdate } = require("../models/Sacerdote");
const Sacerdote = require("../models/Sacerdote");


exports.crearSacerdote = async(req, res) => {

    try {
        let sacerdote;

        //Creamos nuestro sacerdote
        sacerdote = new Sacerdote(req.body);

        await sacerdote.save();
        res.send(sacerdote);

        console.log(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).send("error.....post");
    };
}

exports.obtenerSacerdotes = async(req, res) => {


    try {

        const sacerdotes = await Sacerdote.find();
        res.json(sacerdotes)

    } catch (error) {
        console.log(error);
        res.status(500).send("error.....get");
    }
}

exports.actualizarSacerdote = async(req, res) => {

    try {

        const { nombre, categoria, ubicacion, precio } = req.body;
        let sacerdote = await Sacerdote.findById(req.params.id);

        if (!sacerdote) {
            res.status(404).json({ msg: 'Sacerdote inexistente' })
        }

        sacerdote.nombre = nombre;
        sacerdote.categoria = categoria;
        sacerdote.ubicacion = ubicacion;
        sacerdote.precio = precio;

        sacerdote = await Sacerdote.findOneAndUpdate({ _id: req.params.id }, sacerdote, { new: true });
        res.json(sacerdote);

    } catch (error) {
        console.log(error);
        res.status(500).send("error.....put");
    }

}

exports.obtenerSacerdote = async(req, res) => {

    try {
        let sacerdote = await Sacerdote.findById(req.params.id);

        if (!sacerdote) {
            res.status(404).json({ msg: 'Sacerdote inexistente' })
        }

        res.json(sacerdote);

    } catch (error) {
        console.log(error);
        res.status(500).send("error en el mtd obtenerSacerdote");
    }

}

exports.eliminarSacerdote = async(req, res) => {

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

}