import React, { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import {
  AiFillSafetyCertificate,
  AiFillEdit,
  AiFillCloseCircle,
  AiFillSchedule,
} from 'react-icons/ai';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import RateInstructorModal from '../components/Modals/InstHours/RateInstructorModal';
import AddHoursModal from '../components/Modals/AddHours/AddHoursModal';
import EditHoursModal from '../components/Modals/EditHours/EditHoursModal';
import AddPlaneModal from '../components/Modals/AddPlane/AddPlaneModal';
import SelectFlightInstructorModal from '../components/Modals/SelectFlightInstructor/SelectFlightInstructorModal';
import FilterPilotBar from './FilterPilotBar';
import Loader from '../components/Loader';
import { useUserStore } from '@/store/userStore';
import useAddHoursModal from '@/utils/hooks/useAddHoursModal';
import useEditHoursModal from '@/utils/hooks/useEditHoursModal';
import useSelectFlightInstructorModal from '@/utils/hooks/useSelectFlightInstructorModal';
import useRateInstructorModal from '@/utils/hooks/useRateInstructorModal';

interface FlightData {
  id?: string;
  folio?: string;
  date?: string;
  marca?: string;
  clase?: string;
  tipo?: string;
  aircraftId?: string;
  matricula?: string;
  marcaMotor?: string;
  flightType?: string; // Modificar el tipo de flightType
  hp?: number;
  stages?: string;
  dobleComandoDia?: string;
  soloNoche?: string;
  instrSim?: string;
  firmaInstructor?: string;
  dia?: string;
  nocheInstr?: string;
  diaInstr?: string;
  noche?: string;
  instr?: string;
  autonomo?: string;
  hourCount?: number;
  tiempoTotal?: number;
  escuelaEntrenamiento?: string;
  copiloto?: string;
  remarks?: string;
  certifier?: {
    name?: string;
    lastName?: string;
  };
  certified?: boolean;
  dayHours?: number;
  nightHours?: number;
  instHours?: number;
}

interface FilterState {
  filter: {
    userId?: string;
    date?: string;
    aircraftId?: string;
    folio?: string;
    estado?: string;
  } | null;
}

interface Avion {
  id: string;
  registrationId: string;
  brand: string;
  model: string;
  planeClass: string;
  engine: string;
  HPs: number;
  remarks: string;
}

const TableHoursPilot: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    filter: {
      userId: undefined,
      date: undefined,
      aircraftId: undefined,
      folio: undefined,
      estado: undefined,
    },
  });

  const [flight, setFlight] = useState<FlightData[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<
    FlightData | undefined
  >();

  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const filter = localStorage.getItem('filters');
      console.log('FILTRO: ', filter);
      if (filter) {
        setFilters(JSON.parse(filter));
      }
    }
  }, []);

  const getFlights = async (idF: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/flight/getFilteredFlights?userId=${idF}&date=${filters.filter?.date}&aircraftId=${filters.filter?.aircraftId}&folio=${filters.filter?.folio}&myStatus=${filters.filter?.estado}`
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
  const selectFlightInstructorModal = useSelectFlightInstructorModal();

  const handleAddHours = () => {
    addHoursModal.onOpen();
  };

  const handleEditHours = (flight: FlightData) => {
    setSelectedFlight(flight);
    editHoursModal.onOpen();
  };

  const handleDeleteHours = async (flight: FlightData) => {
    try {
      await axios.delete(`http://localhost:3000/api/flight/${flight.id}`);
      getFlights(user?.id as string);
    } catch (error) {
      toast.error('Error deleting flight');
    }
  };
  const rateInstructor = useRateInstructorModal();

  const handlerCertify = (flight: FlightData) => {
    setSelectedFlight(flight);
    selectFlightInstructorModal.onOpen();
  };

  const [aviones, setAviones] = useState<Avion[]>([]);

  return (
    <div className='flex flex-col justify-between h-full'>
      {isLoading && <Loader />}
      <RateInstructorModal />
      <FilterPilotBar updateFilters={updateFilters} />

      {/* <button onClick={() => rateInstructor.onOpen()}>calificar</button> */}
      <AddPlaneModal setAviones={setAviones} />
      <SelectFlightInstructorModal
        selectedFlight={selectedFlight}
        getFlights={getFlights}
        id={user?.id as string}
      />
      <AddHoursModal
        getFlights={getFlights}
        id={user?.id as string}
        aviones={aviones}
        setAviones={setAviones}
      />

      <EditHoursModal
        selectedFlight={selectedFlight as any}
        getFlights={getFlights}
        id={user?.id as string}
      />
      {flight.length ? (
        <div className='max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8 w-full'>
          <Table className='table-auto w-full mx-auto bg-white shadow-md rounded my-6 divide-y divide-gray-200'>
            <Thead className='bg-gray-50'>
              <Tr className='text-gray-500 text-xs uppercase tracking-wide font-medium'>
                <Th className='px-2 py-3'>FOLIO</Th>
                <Th className='px-2 py-3'>DATE</Th>
                <Th className='px-2 py-3'>AIRPLANE</Th>
                <Th className='px-2 py-3'>FLIGHT TYPE</Th>
                <Th className='px-2 py-3'>INSTRUCTOR</Th>
                <Th className='px-2 py-3'>STAGES</Th>
                <Th className='px-2 py-3'>HOUR COUNT</Th>
                <Th className='px-2 py-3'>REMARKS</Th>
                <Th className='px-2 py-3'>ACTIONS</Th>
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
                      {dato.certifier
                        ? dato.certifier.name + ' ' + dato.certifier?.lastName
                        : ''}
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
                        {dato.flightType == 'Escuela' ? (
                          <AiFillSafetyCertificate
                            onClick={() => handlerCertify(dato)}
                            className='text-green-600 w-5 h-5'
                          />
                        ) : null}
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

            <h3 className='text-3xl font-bold text-white mb-4'>
              No se encontraron vuelos
            </h3>
            <p className='text-lg text-white mb-8'>
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
