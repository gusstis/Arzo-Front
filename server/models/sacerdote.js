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
  dni: {
    type: String,
    required: false,
  },
  placeOfBirth: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
  },
  locality: {
  type: String,
  required: false,
},
    postalCode: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  celPhone: {
    type: String,
    required: false,
  },
  imagen: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  healthCond: {
    type: String,
    required: false,
  },
  obraSocial: {
    type: String,
    required: false,
  },
  numObraSocial: {
    type: String,
    required: false,
  },
  fides: {
    type: String,
    required: false,
  },
  socioFides: {
    type: String,
    required: false,
  },
  nombramiento: {
    type: [String],
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
  education: {
    type: [
      {
        edType: String,
        degree: String,
        institution: String,
        receiptDate: Date,
      },
    ],
    required: false,
  },
  experience: {
    type: [
      {
        charge: String,
        place: String,
        decree: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    required: false,
  },
  ministeries: {
    type: [
      {
        ordinationDate: Date,
        ministery: String,
        place: String,
        folio: Number,
        libro: Number,
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
