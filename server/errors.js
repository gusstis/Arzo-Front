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
    
    return JSON.stringify(error);
}