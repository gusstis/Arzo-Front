import Image from 'next/image';
export default function about() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <picture>
        <Image src="/xaju.jpg" alt="imagin" width={200} height={200} />
      </picture>
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md self-center">
          <picture>
            <Image src="/arzo-logo.jpg" alt="imaginn" width={200} height={200} />
          </picture>
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p>Dirección: B. Mitre 250 Oeste J5402CXF - SAN JUAN Teléfono/fax: (0264) 422-2578 - fax: (0264) 427-3530 Horario: lunes a viernes de 8,30 a 12,30 y de 16 a 20</p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                  Arzobispo:
                    <code className="text-sm font-bold text-gray-900">Mons. Jorge Lozano</code> 
                  </p>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                  Obispos Auxiliares:
                    <code className="text-sm font-bold text-gray-900">Mons. Gustavo Larrazábal C.F.M. Mons. Mario Héctor Robles</code>
                  </p>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">Arzobispo Emérito: Mons. Alfonso Delgado</p>
                </li>
              </ul>
              <p>Diócesis sufragáneas: La Rioja y San Luis :: Jurisdicción: Comprende todo el territorio de la provincia de San Juan.</p>
            </div>
            <div className="pt-8 text-base font-semibold leading-7">
              <p className="text-gray-900">Contacto: arzobispadosanjuan@infovia.com.ar</p>
              <p>
                <a href="https://arzobispadosanjuan.org.ar/" className="text-sky-500 hover:text-sky-600">
                Página web oficial: Arquidiócesis de San Juan de Cuyo &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
