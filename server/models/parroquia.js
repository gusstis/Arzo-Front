const mongoose = require('mongoose');

const ParroquiaSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    postalCode: {
        type: String,
        require: true
    },
    DeletedAt: {
        type: Date
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.models.Parroquia || mongoose.model('Parroquia', ParroquiaSchema);