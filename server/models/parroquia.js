const mongoose = require('mongoose');

//Este código define la estructura del esquema de parroquia. Cada campo del esquema representa una propiedad de parroquia.
const ParroquiaSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Debe proporcionar Nombre a la Parroquia'],
  },
  address: {
    type: String,
    required: [true, 'debe colocar una dorección'],
  },
  postalCode: {
    type: String,
    required: [true, 'El código postal debe existir'],
  },
  deletedAt: {
    type: Date,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

//Esta línea exporta el modelo de parroquia. Si el modelo ya está definido, se utiliza mongoose.models.Parroquia, de lo contrario, se crea un nuevo modelo llamado 'Parroquia' utilizando el esquema ParroquiaSchema.
module.exports = mongoose.models.Parroquia || mongoose.model('Parroquia', ParroquiaSchema);
