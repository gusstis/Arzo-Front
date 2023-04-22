export class InvalidSacerdote extends Error {
    constructor(description) {
        super(description)
        this.code = "01"
        this.description = description
        this.message = "Sacerdote Invalido"
        
    }
}
export const parroquiaNotFound ={
    code: "01",
    message: "parroquia not found"
}
export const sacerdoteNotFound = JSON.stringify({
    "code": "11",
    "message": "sacerdote not found"
})
export const nombramientoNotFound = JSON.stringify({
    "code": "11",
    "message": "nombramiento not found"
})

export function handleError(error) {
    if (error.name=="ValidationError"){
        return JSON.stringify({code:"111",
            message:error.message});
    }
    if (error.name=="CastError"){
        if (error.kind == "ObjectId"){
            return JSON.stringify({
                code:"00",
                message:("El valor "+error.value+" no corresponde al tipo: "+error.kind)
            })
        }
    }
    return JSON.stringify({code:error.code,message:error.message,description:error.description});
}