// container.js es un componente de contenedor genérico que se utiliza para envolver el contenido y aplicar estilos de diseño.

import React from 'react';

export default function Container(props) {
  return (
    /* El contenedor es un <div> que tiene varias clases CSS aplicadas. Estas clases se generan dinámicamente utilizando plantillas literales y las props proporcionadas.

    container: clase CSS para establecer los estilos básicos de un contenedor.
    
    p-8: clase CSS para agregar un padding interno de 8 píxeles en todas las direcciones.
    
    mx-auto: clase CSS para centrar horizontalmente el contenedor mediante márgenes automáticos.
    
    xl:px-0: clase CSS específica para pantallas extra grandes (resolución "xl") que establece el padding horizontal a 0 (sin relleno).
    
    props.className ? props.className : "": esta expresión verifica si se proporciona una prop className al componente. Si se proporciona, se agrega al conjunto de clases CSS del contenedor; de lo contrario, se agrega una cadena vacía. */

    <div className={`container p-8 mx-auto xl:px-0 ${props.className ? props.className : ''}`}>
      {props.children} {/* esto renderiza el contenido hijo que se pasa al componente Container.  */}
    </div>
  );
}

/* Los componentes o elementos JSX colocados dentro de <Container>...</Container> en otro lugar del código se representarán aquí dentro del <div> del contenedor.

Al utilizar este componente Container, puedes envolver el contenido que deseas que esté dentro de un contenedor con estilos predefinidos y personalizables. Por ejemplo: */

/* <Container> className="my-custom-class"> {Contenido a ser envuelto} </Container> */

//En este caso, el contenedor aplicará los estilos predeterminados junto con la clase CSS adicional "my-custom-class".
