import axios from 'axios';
import { useEffect, useState } from 'react';

import { DateTime } from 'luxon';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';


function formatDate(dateString) {
  const date = DateTime.fromISO(dateString);
  return date.toLocaleString({
    locale: 'es-ES',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

function ParroquiasPage() {
  const [parroquias, setParroquias] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/parroquias');
        //console.log(response.data);
        setParroquias(response.data.parroquias);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleParroquiaClick = (parroquiaId) => {
    router.push(`/parroquias/${parroquiaId}`);
  };

  const handleDeleteParroquia = async (parroquiaId) => {
    try {
      await axios.delete(`/api/parroquias/${parroquiaId}`);
      setSuccessMessage('Parroquia eliminada con éxito.');
      const updatedParroquias = parroquias.filter((parroquia) => parroquia._id !== parroquiaId);
      setParroquias(updatedParroquias);
      //router.push(`/parroquias`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      {successMessage && (
        <div class="flex bg-blue-100 rounded-lg p-4 mb-4">
          <svg class="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <p class="ml-3 text-sm text-blue-700">
            <span class="font-medium">{successMessage}</span>
          </p>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <Link href="/parroquias/new-parroquia" className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Crear Nueva Parroquia
        </Link>
      </div>

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
                      Dirección
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código Postal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de creación
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parroquias.length > 0 ? (
                    parroquias.map((parroquia) => (
                      <tr key={parroquia._id} onClick={() => handleParroquiaClick(parroquia._id)} className="cursor-pointer hover:bg-gray-400 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">{parroquia.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{parroquia.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{parroquia.postalCode}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatDate(parroquia.CreatedAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button onClick={(e) => {
                              e.stopPropagation(); // Evita que el clic se propague al td
                              handleDeleteParroquia(parroquia._id)
                            }}>
                              <TrashIcon className="h-5 w-5 text-red-500" />
                            </button>
                            <Link href={`/parroquias/${parroquia._id}/editParroquia`}>
                              <PencilIcon className="h-5 w-5 text-blue-500" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="4">
                        No hay parroquias disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ParroquiasPage;
