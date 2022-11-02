const mongoose = require('mongoose');

const SacerdoteSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    nombramiento: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NombramientoSacerdote' }],
        require: true
    },
    postalCode: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    parroquia: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'parroquia' }],
        require: true
    },
    dateOfBirth: {
        type: Date,
        require: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
    DeletedAt: {
        type: Date
    },
});

module.exports = mongoose.model('Sacerdote', SacerdoteSchema) || mongoose.models.Sacerdote;