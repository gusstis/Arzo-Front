const mongoose = require('mongoose');

const SacerdoteSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Debe colocar un Nombre'],
  },
  lastname: {
    type: String,
    required: [true, 'debe proporcionar el Apellido'],
  },
  nombramiento: {
    type: [String],
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
  },
  phone: {
    type: String,
    required: false,
  },
  imagen: {
    type: String,
    required: false,
  },
  parroquia: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parroquia' }],
    populate: {
      path: 'parroquia',
      select: 'name'
    },
    virtual: true
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  degree: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  freelance: {
    type: Boolean,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  education: {
    type: [
      {
        degree: String,
        year: String,
        institution: String,
        description: String,
      },
    ],
    required: false,
  },
  experience: {
    type: [
      {
        position: String,
        years: String,
        company: String,
        highlights: [String],
      },
    ],
    required: false,
  },
  CreatedAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
  deletedAt: {
    type: Date,
    required: false,
  },
})


module.exports = mongoose.models.Sacerdote || mongoose.model('Sacerdote', SacerdoteSchema);

