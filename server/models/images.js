//Este código define un modelo de imágenes utilizando Mongoose. El modelo se llama Image y tiene tres campos: name, desc y img.

//El campo name es de tipo String y almacena el nombre de la imagen.
//El campo desc también es de tipo String y se utiliza para almacenar una descripción de la imagen.
//El campo img es un objeto que contiene dos subcampos: data y contentType. El subcampo data es de tipo Buffer y se utiliza para almacenar los datos binarios de la imagen como un búfer. El subcampo contentType es de tipo String y se utiliza para almacenar el tipo de contenido de la imagen, como "image/jpeg" o "image/png".

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.models.Nombramiento || mongoose.model('Image', imageSchema);
