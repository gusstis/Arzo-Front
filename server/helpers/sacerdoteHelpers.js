
const mongoose = require('mongoose');

export function IsSacerdoteValid(sacerdote) {
    return (mongoose.Types.ObjectId.isValid(sacerdote.parroquia) && Parroquia.findById(sacerdote.parroquia))
}