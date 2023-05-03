import React, { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useSession } from 'next-auth/react';

import {
  AiFillSafetyCertificate,
  AiFillEdit,
  AiFillCloseCircle,
} from 'react-icons/ai';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import RateInstructorModal from '../components/Modals/InstHours/RateInstructorModal';
import useAddHoursModal from '../hooks/useAddHoursModal';
import AddHoursModal from '../components/Modals/AddHours/AddHoursModal';
import AddPlaneModal from '../components/Modals/AddPlane/AddPlaneModal';
import FilterPilotBar from './FilterPilotBar';
import Pagination from '../components/Pagination/Pagination';
import Loader from '../components/Loader';

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

  const [filters, setFilters] = useState<Filtros>({
    // Estado con los filtros del LocalStorage
    filter: {
      userId: undefined,
      date: undefined,
      aircraftId: undefined,
      folio: undefined,
    },
  });
  const { data } = useSession();
  const userMail = data?.user?.email;

  const [flight, setFlight] = useState<DatosEjemplo[]>([]);
  const [id, setId] = useState('');

  useEffect(() => {
    console.log('ID: ', id);
    console.log('FLIGHT: ', flight);

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
    if (userMail !== undefined) {
      setIsLoading(true);
      axios
        .get(`/api/getUserByEmail/${userMail}`)
        .then((result) => {
          if (result && result.data && result.data.id) {
            setId(result.data.id);
          } else {
            toast.error('Invalid User');
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('Error User Search');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userMail]);

  useEffect(() => {
    if (typeof window !== 'undefined' && userMail !== undefined && id) {
      getFlights(id);
    }
  }, [id, filters]);

  const updateFilters = () => {
    const filter = localStorage.getItem('filters');
    if (filter) {
      console.log('entra al if');
      setFilters(JSON.parse(filter));
    }
  };
  // let result = userByRole(userMail);

  // useEffect(() => {
  //   const result = axios
  //     .get(`http://localhost:3000/api/flight/getFlightsByUserId?id=${id}`)
  //     .then((response) => {
  //       setFlight(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [flight, id]);

  /* DATOS HARDCODEADOSSSSSSSSSSSSSSSSSS
  const datos: DatosEjemplo[] = [
    {
      folio: 1,
      fecha: "2022-04-25",
      marca: "Airbus",
      clase: "A380",
      tipo: "Comercial",
      matricula: "XA-ABC",
      marcaMotor: "Rolls Royce",
      hp: 500,
      etapas: "ARG-COL",
      dobleComandoDia: "10:00",
      soloNoche: "5:00",
      instrSim: "3:00",
      firmaInstructor: "Juan Pérez",
      dia: "8:00",
      nocheInstr: "4:00",
      diaInstr: "6:00",
      noche: "2:00",
      instr: "1:00",
      autonomo: "3:00",
      tiempoTotal: 30,
      escuelaEntrenamiento: "AviaSchool",
      copiloto: "6:00",
    },
    {
      folio: 1,
      fecha: "2022-04-25",
      marca: "Airbus",
      clase: "A380",
      tipo: "Comercial",
      matricula: "XA-ABC",
      marcaMotor: "Rolls Royce",
      hp: 500,
      etapas: "ARG-COL",
      dobleComandoDia: "10:00",
      soloNoche: "5:00",
      instrSim: "3:00",
      firmaInstructor: "Juan Pérez",
      dia: "8:00",
      nocheInstr: "4:00",
      diaInstr: "6:00",
      noche: "2:00",
      instr: "1:00",
      autonomo: "3:00",
      tiempoTotal: 30,
      escuelaEntrenamiento: "AviaSchool",
      copiloto: "6:00",
    },
    {
      folio: 1,
      fecha: "2022-04-25",
      marca: "Airbus",
      clase: "A380",
      tipo: "Comercial",
      matricula: "XA-ABC",
      marcaMotor: "Rolls Royce",
      hp: 500,
      etapas: "ARG-COL",
      dobleComandoDia: "10:00",
      soloNoche: "5:00",
      instrSim: "3:00",
      firmaInstructor: "Juan Pérez",
      dia: "8:00",
      nocheInstr: "4:00",
      diaInstr: "6:00",
      noche: "2:00",
      instr: "1:00",
      autonomo: "3:00",
      tiempoTotal: 30,
      escuelaEntrenamiento: "AviaSchool",
      copiloto: "6:00",
    },
  ];
*/

  const addHoursModal = useAddHoursModal();

  const handleAddHours = () => {
    addHoursModal.onOpen();
  };

  const flightsPerPage = 4;
  return (
    <div className='flex flex-col justify-between h-full'>
      {isLoading && <Loader />}
      <RateInstructorModal />
      <FilterPilotBar updateFilters={updateFilters} />
      {/* <Pagination
        flightsPerPage={flightsPerPage}
        totalItems={flight.length}
        currentPage={currentPage}
        paginate={paginate}
      /> */}
      <AddPlaneModal />
      <AddHoursModal getFlights={getFlights} id={id} />
      {flight.length ? (
        <div className='max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8 w-full'>
          <Table className='table-auto w-full mx-auto bg-white shadow-md rounded my-6'>
            <Thead className='w-full'>
              <Tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                <Th className='text-center border text-xs'>FOLIO</Th>
                <Th className=' text-center border text-xs'>FECHA</Th>
                <Th className=' text-center border text-xs'>
                  CARACTERISTICAS DEL AVION
                </Th>
                {/* <Th className="text-center border text-xs">SIMULADOR</Th> */}
                <Th className='text-center border text-xs'>FLIGHT TYPE</Th>
                {/* <Th className="text-center border text-xs">AUTONOMO</Th> */}
                <Th className='text-center border text-xs'>ETAPAS</Th>
                <Th className='text-center border text-xs'>TIEMPO TOTAL</Th>
                {/* <Th className="text-center border text-xs">COPILOTO</Th> */}
                {/* <Th className="text-center border text-xs">AUTONOMO</Th> */}
                {/* <Th className="text-center border text-xs">TIEMPO TOTAL</Th> */}
                {/* <Th className="text-center border text-xs">FIRMA INST</Th> */}
                <Th className='text-center border text-xs'>OBSERVACIONES</Th>
              </Tr>
            </Thead>
            <Tbody className='w-full'>
              {flight.length === 0 ? (
                <h1>LOADING....</h1>
              ) : (
                flight.map((dato, index) => (
                  <Tr
                    key={index}
                    className='hover:bg-gray-100 border-b border-gray-200 py-10'
                  >
                    <Td className='text-center border text-xs text-gray-700'>
                      {dato.folio}
                    </Td>
                    <Td className='text-center border text-xs'>{dato.date}</Td>
                    <Td className='text-center border text-xs'>
                      {dato.aircraftId}
                      {dato.marca} {dato.clase} {dato.tipo} {dato.matricula}{' '}
                      {dato.marcaMotor} {dato.hp} HP
                    </Td>
                    <Td className='text-center border text-xs'>
                      {dato.flightType}
                    </Td>
                    {/* <Td className="text-center border text-xs">{dato.autonomo}</Td> */}
                    <Td className='text-center border text-xs'>
                      {dato.stages}
                    </Td>
                    <Td className='text-center border text-xs'>
                      {dato.hourCount}
                    </Td>
                    <Td className='text-center border text-xs'>
                      {dato.remarks}
                    </Td>
                    {/*  <Td className="text-center border text-xs">
                  {dato.tiempoTotal}
                </Td>
                <Td className="text-center border text-xs">{dato.copiloto}</Td>
                <Td className="text-center border text-xs">{dato.autonomo}</Td>
                <Td className="text-center border text-xs">
                  {dato.tiempoTotal}
                </Td>
                <Td className="text-center border text-xs">
                  {dato.firmaInstructor}
                </Td> */}
                    <Td className='text-center border text-2xl'>
                      <AiFillEdit onClick={() => toast.success('Editar')} />
                    </Td>
                    <Td className='text-center border text-2xl'>
                      <AiFillCloseCircle
                        onClick={() => toast.error('Borrar')}
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </div>
      ) : 
      // was ---> null
      <div className='max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8 w-full'>NO FLIGHTS TO SHOW</div>
      }
      <div>
        <button className='flex mx-auto' onClick={handleAddHours}>
          ADD HOURS
        </button>
      </div>
    </div>
  );
};

export default TableHoursPilot;
