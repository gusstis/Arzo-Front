class NotFoundError extends Error {
    constructor(field) {
        super("field: " + field + " not found.");
        this.name = this.constructor.name;
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