const { findOneAndUpdate } = require("../models/Producto");
const Producto = require("../models/Producto");


exports.crearProducto = async(req, res) => {
    
    try {
        let producto;

        //Creamos nuestro producto
        producto= new Producto(req.body);

        await producto.save();
        res.send(producto);

        console.log(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error.....post");
    };
} 

exports.obtenerProductos = async (req, res) => {


    try {

        const productos = await Producto.find();
        res.json(productos)
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error.....get");     
    }
}

exports.actualizarProducto = async (req, res) => {

    try {

        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'Producto inexistente' })
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;
        
        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new:true });
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error.....put");
    }

}

exports.obtenerProducto = async (req, res) => {

    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'Producto inexistente' })
        }

        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en el mtd obtenerProducto");
    }

}

exports.eliminarProducto = async (req, res) => {

    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'Producto inexistente' })
        }

        await Producto.findOneAndRemove({ _id: req.params.id })
        res.json({msg: 'Producto eliminado con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error, en el mtd eliminarProducto");
    }

}