
  
const mongoose = require('mongoose');
  
const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
module.exports = mongoose.models.Nombramiento ||  mongoose.model('Image', imageSchema);