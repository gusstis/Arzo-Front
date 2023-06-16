const mongoose = require('mongoose');

const SacerdoteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
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
    required: true,
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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'parroquia' }],
    required: false,
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
});

const Sacerdote = mongoose.models.Sacerdote || mongoose.model('Sacerdote', SacerdoteSchema);

module.exports = Sacerdote;
