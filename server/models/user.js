const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  //Este código define la estructura del esquema de usuario.
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  category: {
    type: [{ type: Schema.Types.ObjectId, ref: 'NombramientoSacerdote' }],
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
  DeletedAt: {
    type: Date,
  },
  type: {
    type: [String], // admin, guest, priest
  },
});

//Esta línea exporta el modelo de usuario. Si el modelo ya está definido, se utiliza mongoose.models.User, de lo contrario, se crea un nuevo modelo llamado 'User' utilizando el esquema UserSchema.
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
