import Image from 'next/image';

const people = [
  {
    name: 'Pbro. Miguel Darío Tejada',
    address: 'Arzobispado San Juan de Cuyo',
    department: 'San Telmo, CABA',
    title: 'Vicecanciller',
    dni: '27.754.114',
    birth: '20-05-1980',
    birth_place: 'Capital, San Juan, Argentina',
    email: 'migueld.tejada@hotmail.com',
    obra_social: 'San Pedro, Socio 1015395',
    tel_number: '',
    mob_number: '2644829679',
    image: 'https://static.vecteezy.com/system/resources/previews/014/684/503/non_2x/catholic-priest-icon-flat-style-vector.jpg',
  },
  {
    name: 'P. Carlos Daniel Perez',
    address: 'Basílica de Ntra Sra de los Desamparados, San Juan',
    department: 'Rivadavia,San Juan',
    title: 'Diácono',
    dni: '27.754.115',
    birth: '20-05-1980',
    birth_place: 'Capital, San Juan, Argentina',
    email: 'carlos.perez@hotmail.com',
    obra_social: 'San Pedro, Socio 1015395',
    tel_number: '',
    mob_number: '2644829679',
    image: 'https://static.vecteezy.com/system/resources/previews/012/704/562/non_2x/illustration-of-a-priest-in-a-cassock-with-a-rosary-in-his-hands-profession-flat-style-vector.jpg',
  },
  {
    name: 'S. Aurelio Agustin de Hipona',
    address: 'Obispado Hipona',
    department: 'Hipona, Africa del Norte',
    title: 'Obispo',
    dni: '27.754.116',
    birth: '20-05-1980',
    birth_place: 'Capital, San Juan, Argentina',
    email: 'san.agustin@heavenmail.com',
    obra_social: 'San Pedro, Socio 1015395',
    tel_number: '',
    mob_number: '2644829679',
    image: 'https://static.vecteezy.com/system/resources/previews/005/520/234/non_2x/cartoon-drawing-of-a-priest-vector.jpg',
  },
  {
    name: 'Mons. Jorge Eduardo Lozano',
    address: 'Arzobispado San Juan de Cuyo',
    department: 'San Juan, Argentina',
    title: 'Secretario general del Consejo Episcopal Latinoamericano(CELAM)',
    dni: '27.754.117',
    birth: '20-05-1980',
    birth_place: 'Capital, San Juan, Argentina',
    email: 'mons.lozano@hotmail.com',
    obra_social: 'San Pedro, Socio 1015395',
    tel_number: '',
    mob_number: '2644829679',
    image: 'https://static.vecteezy.com/system/resources/previews/007/116/185/non_2x/cute-priest-preaching-an-blessing-chibi-cartoon-character-illustration-vector.jpg',
  },
  {
    name: 'Sacerdote equis',
    address: 'Capillita de San Juan',
    department: 'San Telmo, CABA',
    title: 'Cura Párroco',
    dni: '27.754.118',
    birth: '20-05-1980',
    birth_place: 'Capital, San Juan, Argentina',
    email: 'sac.equis@hotmail.com',
    obra_social: 'San Pedro, Socio 1015395',
    tel_number: '',
    mob_number: '2644829679',
    image: 'https://static.vecteezy.com/system/resources/previews/007/116/179/non_2x/cute-priest-with-empty-paper-chibi-cartoon-character-illustration-vector.jpg',
  },
  {
    name: 'Sacerdote ye',
    address: 'Parroquia de Villa Krawse, Rawson',
    department: 'San Telmo, CABA',
    title: 'Vicecanciller',
    dni: '27.754.119',
    birth: '20-05-1980',
    birth_place: 'Capital, San Juan, Argentina',
    email: 'sac.ye@hotmail.com',
    obra_social: 'San Pedro, Socio 1015395',
    tel_number: '',
    mob_number: '2644829679',
    image: 'https://static.vecteezy.com/system/resources/previews/007/116/181/non_2x/cute-priest-reading-the-bible-chibi-cartoon-character-illustration-vector.jpg',
  },
];
//https://scontent.fcor12-1.fna.fbcdn.net/v/t39.30808-6/307683431_395148716143711_8203636527430177267_n.jpg?stp=c18.0.206.206a_dst-jpg_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=da31f3&_nc_ohc=WwyTUhcXPIUAX9x8K15&_nc_ht=scontent.fcor12-1.fna&oh=00_AfBAjjDnhJVt_dTffj5Le9SFoJVLb775U0qVSLRhoU-d7A&oe=636B12BC

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actividad
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doc Identidad
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <Image className="h-25 w-auto rounded-full" src={person.image} alt="" width={100} height={100} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            <div className="text-sm text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.title}</div>
                        <div className="text-sm text-gray-500">{person.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.dni}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
