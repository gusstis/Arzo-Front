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
        type: [{ type: Schema.Types.ObjectId, ref: 'NombramientoSacerdote' }],
        require: true
    },
    postalCode: {
        type: string,
        require: true
    },
    address: {
        type: string,
        require: true
    },
    phone: {
        type: string,
        require: true
    },
    parroquia: {
        type: [{ type: Schema.Types.ObjectId, ref: 'parroquia' }],
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

module.exports = mongoose.model('Sacerdote', SacerdoteSchema);