export class InvalidSacerdote extends Error {
    constructor(description) {
        super(description)
        this.code = "01"
        this.description = description
        this.message = "Sacerdote Invalido"
    }
}
export const parroquiaNotFound = JSON.stringify({
    "code": "11",
    "message": "parroquia not found"
})
export const sacerdoteNotFound = JSON.stringify({
    "code": "11",
    "message": "sacerdote not found"
})
export const nombramientoNotFound = JSON.stringify({
    "code": "11",
    "message": "nombramiento not found"
})

export function handleError(error) {
    console.log('error :>>', error)
    console.log('error.name :>>', error.name)
    console.log('error.message :>>', error.message)
    console.log('error :>>', error)
    if (error.name=="ValidationError"){
        return JSON.stringify({code:"111",
            message:error.message});
    }
    return JSON.stringify(error);
}