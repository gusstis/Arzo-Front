//Este componente crudTable se utiliza para renderizar una tabla CRUD en la interfaz de usuario, donde data contiene los datos de las filas y title es el texto accesible que describe la tabla. Las columnas se generan dinámicamente a partir de las propiedades del primer objeto en data.

//Table is used to display tabular data using rows and columns. They allow users to quickly scan, sort, compare, and take action on large amounts of data.
import { Table } from '@nextui-org/react';

//Exporta por defecto una función de componente llamada crudTable que acepta los parámetros data y title
export default function crudTable({ data }, title) {
  let columns = [];

  //Itera sobre las propiedades del primer objeto en data y agrega objetos de columna al array columns
  for (var key in data[0]?.getOwnPropertyNames()) {
    columns.push({
      key: key,
      label: key,
    });
  }
  console.log(columns);

  const rows = data; // Define la variable rows como el valor de data
  return (
    //Devuelve la estructura JSX que representa la tabla CRUD utilizando el componente Table
    <Table
      aria-label={title} // atributo para establecer el texto accesible para identificar la tabla.
      className="container mx-auto"
    >
      <Table.Header columns={columns}>
        {' '}
        {/* componente que representa la cabecera de la tabla y recibe la prop columns con la configuración de las columnas. */}
        {(column) => (
          <Table.Column key={column.key} className="text-gray-700 font-bold">
            {' '}
            {/* componente que representa una columna de la cabecera de la tabla. */}
            {column.label}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {' '}
        {/* componente que representa el cuerpo de la tabla y recibe la prop items con los datos de las filas. */}
        {(item) => (
          <Table.Row key={item.key}>
            {' '}
            {/* componente que representa una fila de la tabla. */}
            {(columnKey) => (
              <Table.Cell className="border">{item[columnKey]}</Table.Cell> //componente que representa una celda de la tabla, renderizando el valor correspondiente según la clave de la columna (columnKey) del objeto de datos (item).
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
//se ha añadido la clase container mx-auto al componente Table para centrarlo horizontalmente en el contenedor. También se ha añadido la clase text-gray-700 font-bold al componente Table.Column para aplicar estilos de color y fuente en la cabecera de la columna. Además, se ha añadido la clase border al componente Table.Cell para agregar bordes a las celdas de la tabla.
