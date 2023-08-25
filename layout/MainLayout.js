import Header from '@components/Header';
import { SessionProvider } from 'next-auth/react';

export default function MainLayout({ children }) {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-0 lg:px-8 ">{children}</div>
        </main>
      </div>
    </>
  );
}

/* Este código define un componente de diseño llamado MainLayout.
El componente tiene una prop children, que es un contenido que se insertará dentro del componente en el lugar donde se encuentra la expresión {children}.

Dentro del componente MainLayout, se importan dos componentes adicionales: Header y Nav.
Los nombres de los componentes están precedidos por una cadena @ que se utiliza como atajo para la carpeta raíz del proyecto.
Por lo tanto, se espera que estos componentes estén ubicados en components/Header.js y common/Nav.js respectivamente.

El componente Header representa el encabezado de la página, y Nav representa la navegación de la página.
Ambos componentes se ubican en la parte superior de la página, seguidos de un elemento main que contiene el contenido dinámico.

Dentro de main, hay un contenedor div con una clase max-w-7xl mx-auto py-6 sm:px-0 lg:px-8.
Esta clase se utiliza para dar estilo al contenedor y limitar su ancho máximo a 7xl (un tamaño de pantalla estándar en tailwindcss), centrarlo horizontalmente en la pantalla y agregar algunos espacios alrededor.

En general, MainLayout se utiliza como un componente de diseño para proporcionar una estructura común a varias páginas o secciones de un sitio web.
Permite que los componentes comunes, como el encabezado y la navegación, se reutilicen en varias páginas, y proporciona un contenedor consistente para el contenido de la página. */
