const mongoose = require('mongoose');

const NombramientoSchema = mongoose.Schema({

    nombre: {
        type: String,
        require: true
    },
    EndDate: {
        type: Date
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Nombramiento', NombramientoSchema);