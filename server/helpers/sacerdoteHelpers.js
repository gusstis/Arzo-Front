export function IsSacerdoteValid() {
    return (mongoose.Types.ObjectId.isValid(sacerdote.parroquia) && Parroquia.findById(sacerdote.parroquia))
}