
const mongoose = require('mongoose');
const Parroquia = require("../../server/models/Parroquia");

export function IsParroquiaSacerdoteValid(sacerdote) {
    return ( true && Parroquia.findById(sacerdote.parroquia))
}