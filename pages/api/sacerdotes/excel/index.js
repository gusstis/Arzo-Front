import XLSX from 'xlsx';
import dbConnect from '@lib/mongodb';
const Sacerdote = require('../../../../server/models/sacerdote'); // importo modelo de Sacerdote
import fs from 'fs';
//import { ObjectId } from 'mongodb';

const columnNamesMapping = {
    healthCond: "Estado de Salud",
    name: "Nombre",
    lastName: "Apellido",
    birthDate: "Fecha de Nacimiento",
    birthPlace: "Lugar de Nacimiento",
    gender: "Genero",
    address: "Direccion",
    phone: "Telefono",
    email: "Correo Electronico",
    obraSocial: "Obra Social",
    numObraSocial: "Numero de Obra Social",
    fides: "FIDES",
    socioFides: "Socio FIDES",
    parroquiaActual: "Parroquia Actual",
    parroquiaAntigua: "Parroquia Antigua",
    parroquiaNacimiento: "Parroquia de Nacimiento",
    nacimiento: "Nacimiento",
    cedula: "Cedula",
    nacionalidad: "Nacionalidad",
    estadoCivil: "Estado Civil",
    numHijos: "Numero de Hijos",
    education: "Educacion",
    experience: "Experiencia",
    ministeries: "Ministerios",
  };

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    
    case 'GET':
      try {
        const sacerdotes = await Sacerdote.find(); 
        console.log('sacerdotes', sacerdotes);
        // Convert JSON data to sheet
        const ws = XLSX.utils.json_to_sheet(sacerdotes.map(sacerdote => {
            const flatObject= {
                ...sacerdote.toObject(),
            educacion: JSON.stringify(sacerdote.education),
            experiencia: JSON.stringify(sacerdote.experience),
            ministerios: JSON.stringify(sacerdote.ministeries)
        }
        const renamedObject = Object.keys(flatObject).reduce((newObj, key) => {
            const newKey = columnNamesMapping[key] || key; // Use new name if exists, else use old name
            newObj[newKey] = flatObject[key];
            return newObj;
          }, {});
          return renamedObject
        }));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sacerdotes");

        // Temporary filename
        const tmpFileName = `sacerdotes_${new Date().getTime()}.xlsx`;

        // Write workbook to temporary file
        XLSX.writeFile(wb, tmpFileName);

        // Set the return type to Excel file format
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${tmpFileName}`);
        
        // Read the temp file and pipe it to response
        const fileStream = fs.createReadStream(tmpFileName);
        fileStream.pipe(res);

        // Optional: Delete file after sending (handle errors appropriately, consider async deletion)
        fileStream.on('end', function() {
            try {
              fs.unlinkSync(tmpFileName); // Delete the temp file
              console.log(`Successfully deleted ${tmpFileName}`);
            } catch (error) {
              // Handle errors in deletion here
              console.error(`Error deleting ${tmpFileName}: `, error);
            }
          });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error generating or sending the Excel file');
      }
      return;

  }
}
