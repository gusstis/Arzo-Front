const { findOneAndUpdate } = require("../models/Parroquia");
const Parroquia = require("../models/Parroquia");


exports.crearParroquia = async(req, res) => {

    try {
        let parroquia;

        //Creamos nuestro parroquia
        parroquia = new Parroquia(req.body);

        await parroquia.save();
        res.send(parroquia);

        console.log(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).send("error.....post");
    };
}

exports.obtenerParroquias = async(req, res) => {


    try {

        const parroquias = await Parroquia.find();
        res.json(parroquias)

    } catch (error) {
        console.log(error);
        res.status(500).send("error.....get");
    }
}

exports.actualizarParroquia = async(req, res) => {

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
    }

}

exports.obtenerParroquia = async(req, res) => {

    try {
        let parroquia = await Parroquia.findById(req.params.id);

        if (!parroquia) {
            res.status(404).json({ msg: 'Parroquia inexistente' })
        }

        res.json(parroquia);

    } catch (error) {
        console.log(error);
        res.status(500).send("error en el mtd obtenerParroquia");
    }

}

exports.eliminarParroquia = async(req, res) => {

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
    }

}