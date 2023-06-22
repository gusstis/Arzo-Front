import nextConnect from 'next-connect'; // Permite crear una instancia del controlador de rutas
import middleware from 'middlewares/middleware'; //middleware personalizado a definir para procesar cualquier lógica adicional antes de que se ejecute el controlador de la ruta.
import usersController from 'controllers/users';

const handler = nextConnect(); //Creamos la instancia del manejadorde rutas

handler.use(middleware); //Middleware de autenticación, validación de datos...

//Definimos las rutas y los controladores asociados:
handler.post(usersController);
handler.get(usersController);
handler.put(usersController);
handler.delete(usersController);

export default handler;
