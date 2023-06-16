const mongoose = require('mongoose');

//Este código define la estructura del esquema de nombramiento. Cada campo del esquema representa una propiedad de nombramiento, como nombre, endDate y CreatedAt. Algunos campos tienen la opción required: true, lo que significa que deben proporcionarse al crear un objeto de nombramiento.
const NombramientoSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  EndDate: {
    type: Date,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

//Esta línea exporta el modelo de nombramiento. Si el modelo ya está definido, se utiliza mongoose.models.Nombramiento, de lo contrario, se crea un nuevo modelo llamado 'Nombramiento' utilizando el esquema NombramientoSchema.
module.exports = mongoose.models.Nombramiento || mongoose.model('Nombramiento', NombramientoSchema);
module.exports = Nombramiento;
