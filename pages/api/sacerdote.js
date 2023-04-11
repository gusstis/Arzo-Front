const Sacerdote = require("server/models/Sacerdote");
const Parroquia = require("server/models/Parroquia");
import { handleError, InvalidSacerdote,sacerdoteNotFound } from 'server/errors';
import { IsParroquiaSacerdoteValid } from 'server/helpers/sacerdoteHelpers';
import dbConnect from 'lib/mongodb'
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

console.log("method",method)
    switch (method) {
        case 'POST':
 
            try {
                let sacerdote;
                //Creamos nuestro sacerdote
                sacerdote = new Sacerdote(req.body);
                console.log("sacerdote.parroquia:", sacerdote.parroquia)
                console.log("sacerdote.image:", sacerdote.imagen)
                let error=false;
                const count = await Parroquia.countDocuments({_id: sacerdote.parroquia}); 
                console.log("error:",error)
                if(count==0){
                throw sacerdoteNotFound
                }
                console.log("guardando sacerdote")
                    // console.log("parroquia=========",Parroquia.find({_id:sacerdote.parroquia}))
                    await sacerdote.save();
                    res.send(sacerdote);
               

                console.log(req.body)
            } catch (error) {
                console.log("error",error);
                res.status(500).send(handleError(error));
            } 
            console.log("retornando")
                return
        case 'GET':

            try {

                const sacerdotes = await Sacerdote.find();
                res.json(sacerdotes)

            } catch (error) {
                console.log(error);
                res.status(500).send("error get sacerdotes");
            }
                return
            
        case 'DEFAULT':
            console.log(error);
            res.status(404).send("method not found");
            return
    }
}