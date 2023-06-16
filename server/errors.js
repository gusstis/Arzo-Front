//Este componente define una clase de error personalizada, junto con constantes y una función para manejar errores. Estas definiciones permiten manejar diferentes tipos de errores y generar respuestas JSON adecuadas cuando se produce un error en el sistema.

//Exportación de la clase InvalidSacerdote:
//InvalidSacerdote es una clase que extiende la clase Error nativa de JavaScript. Tiene un constructor que acepta una descripción como parámetro.
//El constructor llama al constructor de la clase base (super(description)) y establece algunas propiedades adicionales, como code, description y message.
//Esta clase representa un error de sacerdote inválido y se utiliza para generar instancias de errores cuando sea necesario.
export class InvalidSacerdote extends Error {
  constructor(description) {
    super(description);
    this.code = '01';
    this.description = description;
    this.message = 'Sacerdote Invalido';
  }
}

//    parroquiaNotFound: Es un objeto que contiene propiedades code y message con valores que indican que no se encontró la parroquia.
export const parroquiaNotFound = {
  code: '01',
  message: 'parroquia not found',
};

//sacerdoteNotFound: Es una cadena de texto en formato JSON que representa un objeto con propiedades code y message que indican que no se encontró el sacerdote.
export const sacerdoteNotFound = JSON.stringify({
  code: '11',
  message: 'sacerdote not found',
});

//nombramientoNotFound: Es una cadena de texto en formato JSON que representa un objeto con propiedades code y message que indican que no se encontró el nombramiento.
export const nombramientoNotFound = JSON.stringify({
  code: '11',
  message: 'nombramiento not found',
});

/*     handleError es una función que toma un error como parámetro.
Dentro de la función, se realiza una comprobación en base al nombre del error.
Si el nombre del error es "ValidationError", se devuelve un objeto JSON con un código y mensaje específicos del error de validación.
Si el nombre del error es "CastError" y el tipo de error es "ObjectId", se devuelve un objeto JSON indicando que el valor proporcionado no corresponde al tipo esperado.
En caso contrario, se devuelve un objeto JSON con el código, mensaje y descripción del error original. */
export function handleError(error) {
  if (error.name == 'ValidationError') {
    return JSON.stringify({ code: '111', message: error.message });
  }
  if (error.name == 'CastError') {
    if (error.kind == 'ObjectId') {
      return JSON.stringify({
        code: '00',
        message: 'El valor ' + error.value + ' no corresponde al tipo: ' + error.kind,
      });
    }
  }
  return JSON.stringify({ code: error.code, message: error.message, description: error.description });
}
