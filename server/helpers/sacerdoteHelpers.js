const mongoose = require('mongoose');
const Parroquia = require('../../server/models/parroquia');

export function IsParroquiaSacerdoteValid(sacerdote) {
  console.log('se encontro la parroquia:', Parroquia.findById(sacerdote.parroquia));
  return true && Parroquia.findById(sacerdote.parroquia);
}
