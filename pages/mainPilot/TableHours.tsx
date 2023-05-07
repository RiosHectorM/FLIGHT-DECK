import React, { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import {
  AiFillSafetyCertificate,
  AiFillEdit,
  AiFillCloseCircle,
} from 'react-icons/ai';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import RateInstructorModal from '../components/Modals/InstHours/RateInstructorModal';
import useAddHoursModal from '../hooks/useAddHoursModal';
import useEditHoursModal from '../hooks/useEditHoursModal';
import AddHoursModal from '../components/Modals/AddHours/AddHoursModal';
import EditHoursModal from '../components/Modals/EditHours/EditHoursModal';
import AddPlaneModal from '../components/Modals/AddPlane/AddPlaneModal';
import SearchFlightInstructorModal from '../components/Modals/SearchFlightInstructor/SearchFlightInstructorModal';
import FilterPilotBar from './FilterPilotBar';
import Pagination from '../components/Pagination/Pagination';
import Loader from '../components/Loader';
import { useUserStore } from '@/store/userStore';
import ApproveModal from '../components/Modals/InstHours/ApproveModal';
import useApproveModal from '../hooks/useApproveModal';
import useRateInstructorModal from '../hooks/useRateInstructorModal';

const TableHoursPilot = () => {
  interface DatosEjemplo {
    folio: number;
    date: string;
    marca: string;
    clase: string;
    tipo: string;
    aircraftId: string;
    matricula: string;
    marcaMotor: string;
    flightType: string;
    hp: number;
    stages: string;
    dobleComandoDia: string;
    soloNoche: string;
    instrSim: string;
    firmaInstructor: string;
    dia: string;
    nocheInstr: string;
    diaInstr: string;
    noche: string;
    instr: string;
    autonomo: string;
    hourCount: number;
    tiempoTotal: number;
    escuelaEntrenamiento: string;
    copiloto: string;
    remarks: string;
  }

  const [isLoading, setIsLoading] = useState(false);
  interface Filtros {
    filter: {
      userId: string | undefined;
      date: string | undefined;
      aircraftId: string | undefined;
      folio: string | undefined;
    } | null;
  }

  const [selectedFlight, setSelectedFlight] = useState();

  const [filters, setFilters] = useState<Filtros>({
    // Estado con los filtros del LocalStorage
    filter: {
      userId: undefined,
      date: undefined,
      aircraftId: undefined,
      folio: undefined,
    },
  });
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();

  const [flight, setFlight] = useState<DatosEjemplo[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const filter = localStorage.getItem('filters');
      console.log('FILTRO: ', filter);
      if (filter) {
        setFilters(JSON.parse(filter));
      }
    }
  }, []);

  let getFlights = async (idF) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/flight/getFilteredFlights?userId=${idF}&date=${filters.filter?.date}&aircraftId=${filters.filter?.aircraftId}&folio=${filters.filter?.folio}`
      );
      setFlight(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      fetchUserByEmail(email);
    }
  }, [session, fetchUserByEmail]);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      user?.email !== undefined &&
      user?.id
    ) {
      getFlights(user?.id);
    }
  }, [user?.id, filters]);

  const updateFilters = () => {
    const filter = localStorage.getItem('filters');
    if (filter) {
      setFilters(JSON.parse(filter));
    }
  };

  const addHoursModal = useAddHoursModal();
  const editHoursModal = useEditHoursModal();

  const handleAddHours = () => {
    addHoursModal.onOpen();
  };

  const handleEditHours = (flight) => {
    setSelectedFlight(flight);
    editHoursModal.onOpen();
  };

  const handleDeleteHours = async (flight) => {
    try {
      await axios.delete(`http://localhost:3000/api/flight/${flight.id}`);
      getFlights(user?.id);
    } catch (error) {
      toast.error('Error deleting flight');
    }
  };
  const aproveModal = useApproveModal();
  const rateInstructor = useRateInstructorModal();

  return (
    <div className='flex flex-col justify-between h-full'>
      {isLoading && <Loader />}
      <RateInstructorModal />
      <ApproveModal />
      <FilterPilotBar updateFilters={updateFilters} />
      {/* <button onClick={() => aproveModal.onOpen()}>aprove</button>
      <button onClick={() => rateInstructor.onOpen()}>calificar</button> */}
      <AddPlaneModal />
      <SearchFlightInstructorModal />
      <AddHoursModal getFlights={getFlights} id={user?.id} />
      <EditHoursModal
        selectedFlight={selectedFlight}
        getFlights={getFlights}
        id={user?.id}
      />
      {flight.length ? (
        <div className='max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8 w-full'>
          <Table className='table-auto w-full mx-auto bg-white shadow-md rounded my-6 divide-y divide-gray-200'>
            <Thead className='bg-gray-50'>
              <Tr className='text-gray-500 text-xs uppercase tracking-wide font-medium'>
                <Th className='px-2 py-3'>FOLIO</Th>
                <Th className='px-2 py-3'>FECHA</Th>
                <Th className='px-2 py-3'>CARACTERISTICAS DEL AVION</Th>
                <Th className='px-2 py-3'>FLIGHT TYPE</Th>
                <Th className='px-2 py-3'>ETAPAS</Th>
                <Th className='px-2 py-3'>TIEMPO TOTAL</Th>
                <Th className='px-2 py-3'>OBSERVACIONES</Th>
                <Th className='px-2 py-3'>ACCIONES</Th>
              </Tr>
            </Thead>
            <Tbody className='bg-white divide-y divide-gray-200'>
              {flight.length === 0 ? (
                <h1>LOADING....</h1>
              ) : (
                flight.map((dato, index) => (
                  <Tr key={index} className='hover:bg-gray-100'>
                    <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {dato.folio}
                    </Td>
                    <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {dato.date}
                    </Td>
                    <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {dato.aircraftId} {dato.marca} {dato.clase} {dato.tipo}{' '}
                      {dato.matricula} {dato.marcaMotor} {dato.hp} HP
                    </Td>
                    <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {dato.flightType}
                    </Td>
                    <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {dato.stages}
                    </Td>
                    <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {dato.hourCount}
                    </Td>
                    <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {dato.remarks}
                    </Td>
                    <Td className='px-2 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex justify-center items-center space-x-2'>
                        <AiFillEdit
                          onClick={() => handleEditHours(dato)}
                          className='text-indigo-600 w-5 h-5'
                        />
                        <AiFillCloseCircle
                          onClick={() => handleDeleteHours(dato)}
                          className='text-red-600 w-5 h-5'
                        />
                      </div>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <div className='text-center mt-0'>
            <Image
              src='/images/flight.png'
              alt='Imagen de un avión'
              width={200}
              height={200}
            />

            <h3 className='text-3xl font-bold text-gray-800 mb-4'>
              No se encontraron vuelos
            </h3>
            <p className='text-lg text-gray-600 mb-8'>
              Lo sentimos, no se encontraron vuelos que coincidan con sus
              criterios de búsqueda. Por favor, ajuste sus criterios de búsqueda
              e inténtelo de nuevo.
            </p>
          </div>
        </div>
      )}
      <div>
        <button
          className='flex mx-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300   ease-in-out'
          onClick={handleAddHours}
        >
          ADD HOURS
        </button>
      </div>
    </div>
  );
};

export default TableHoursPilot;
