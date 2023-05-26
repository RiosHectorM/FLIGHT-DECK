import { useState, useEffect, useRef } from 'react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import FolioCard from './FolioCard';

import { FaClipboardCheck, FaClock, FaRegFileAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Loader from '../components/Loader';
import useAddHoursModal from '@/utils/hooks/useAddHoursModal';
import BarraPaginacion from './BarraPaginacion';

interface FlightData {
  id?: string;
  folio?: string | undefined;
  date?: string | undefined;
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
  hourCount?: number | undefined;
  tiempoTotal?: number;
  escuelaEntrenamiento?: string;
  copiloto?: string;
  remarks?: string;
  certifier?: {
    name?: string;
    lastName?: string;
  };
  certified?: boolean;
}

interface Props {
  setFolio: (folio: string | number | undefined) => void;
  setShowTableHours: (show: boolean) => void;
  isLoading: boolean;
  setIsLoading: (show: boolean) => void;
  buttonDisabled: (show: boolean) => void;
}

export default function PilotFolioViewer({
  setFolio,
  setShowTableHours,
  // isLoading,
  // setIsLoading,
  buttonDisabled,
}: Props) {
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();
  const [isLoadingFlights, setIsLoadingFlights] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const folioFlightRef = useRef<FlightData[]>([]);
  const [folioFlight, setFolioFlight] = useState<FlightData[]>([]);
  //PAGINACION
  const [currenPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);
  const pages = [];
  const indexOfLastItem = currenPage * cardsPerPage;
  const indexOfFirstItem = indexOfLastItem - cardsPerPage;
  let currentCards = [];

  if (currenPage === 1) {
    currentCards = folioFlight.slice(0, cardsPerPage);
  } else {
    currentCards = folioFlight.slice(indexOfFirstItem, indexOfLastItem);
  }

  for (let i = 1; i <= Math.ceil(folioFlight.length / cardsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    if (pages.length === 1) {
      setCurrentPage(1);
    }
  }, [folioFlight, currenPage]);

  function handleClick(e: number) {
    const num = e;
    setCurrentPage(num);
  }
  const renderBarraPaginacion = pages.map((e, index) => {
    return (
      <p key={index}>
        <BarraPaginacion number={e} handleClick={handleClick} />
      </p>
    );
  });
  //FIN PAGINACION

  useEffect(() => {
    setIsLoading(true);
    if (session?.user?.email) {
      fetchUserByEmail(session.user.email);
    }
    setIsLoading(false);
  }, [session, fetchUserByEmail]);

  useEffect(() => {
    folioFlightRef.current = []; // Reiniciar la variable de referencia al cambiar el usuario
    setFolioFlight([]); // Reiniciar el estado de los vuelos
    setIsLoadingFlights(true); // Iniciar la carga de vuelos
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (user?.email && user?.id) {
      toast.success('Loading Flight Data');
      getFlights(user.id);
    }
    setIsLoading(false);
  }, [user?.email]);

  const updated = (flight: FlightData[]) => {
    let result = flight.reduce((acc: FlightData[], curr) => {
      let filtered = acc.filter((obj) => obj.folio === curr.folio);
      if (filtered.length === 0) {
        acc.push({
          folio: curr.folio,
          date: curr.date,
          hourCount: curr.hourCount || 0, // Se asegura que hourCount sea un número
        });
      } else {
        filtered[0].hourCount =
          (filtered[0].hourCount || 0) + (curr.hourCount || 0);
      }
      return acc;
    }, []);
    folioFlightRef.current = result;
    setFolioFlight(result);
    setIsLoadingFlights(false); // Finalizar la carga de vuelos
  };

  const getFlights = async (idF: string) => {
    setIsLoading(true);
    try {
      if (idF !== undefined) {
        const response = await axios.get(
          `/api/flight/getFlightsByUserId?id=${idF}`
        );
        updated(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const addHoursModal = useAddHoursModal();

  const handlerAdd = () => {
    setShowTableHours(true);
    setFolio(undefined);
    addHoursModal.onOpen();
  };

  const userId = user?.id;

  const [totalHours, setTotalHours] = useState({
    totalHours: 0,
    toCertifyHours: 0,
    CertifiedHours: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        if (userId !== undefined) {
          const response = await axios.get(
            `/api/pilot/getHoursByUserId/${userId}`
          );
          const data = response.data;
          setTotalHours(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    setIsLoading(false);
  }, [userId]);

  return (
    <>
      {isLoading && <Loader />}
      <div className='flex flex-col lg:flex-row w-full'>
        <div className='w-full lg:w-1/3 lg:mr-4'>
          <div className='lg:px-0'>
            <div className='flex mt-6 mx-auto flex-col'>
              {/* 3 dibujistos */}
              <div className='flex flex-col md:flex-row lg:flex-col w-full justify-around'>
                <div className='bg-flightdeck-darkgold rounded-xl shadow-md my-4'>
                  <div className='px-2 py-2 sm:p-2'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 bg-flightdeck-black rounded-md p-3'>
                        <FaClock className='text-flightdeck-darkgold w-6 h-6' />
                      </div>
                      <div className='ml-4'>
                        <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                          Total Recorded Hours
                        </dt>
                        <dd>
                          <div className='text-lg font-medium text-flightdeck-dark flex items-center'>
                            <p>{totalHours.totalHours}</p>
                            <p className='ml-2'>Hrs</p>
                          </div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-flightdeck-darkgold rounded-xl shadow-md my-4'>
                  <div className='px-2 py-2 sm:p-2'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 bg-flightdeck-black rounded-md p-3'>
                        <FaRegFileAlt className='text-flightdeck-darkgold w-6 h-6' />
                      </div>
                      <div className='ml-4'>
                        <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                          Total Certified Hours
                        </dt>
                        <dd>
                          <div className='text-lg font-medium text-flightdeck-dark flex items-center'>
                            <p>{totalHours.CertifiedHours}</p>
                            <p className='ml-2'>Hrs</p>
                          </div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-flightdeck-darkgold rounded-xl shadow-md my-4'>
                  <div className='px-2 py-2 sm:p-2'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 bg-flightdeck-black rounded-md p-3'>
                        <FaClipboardCheck className='text-flightdeck-darkgold w-6 h-6' />
                      </div>
                      <div className='ml-4'>
                        <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                          Total Pending Hours
                        </dt>
                        <dd>
                          <div className='text-lg font-medium text-flightdeck-dark flex items-center'>
                            <p>{totalHours.toCertifyHours}</p>
                            <p className='ml-2'>Hrs</p>
                          </div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* boton de add */}
              <div className='flex justify-center text-center'>
                <button
                  className='font-sans bg-flightdeck-black text-flightdeck-lightgold  rounded-md mt-8 py-2 px-4 hover:bg-flightdeck-darkgold hover:text-black border hover:border-black flex '
                  onClick={handlerAdd}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16 11h-5v5h-2v-5H4V9h5V4h2v5h5z'
                    />
                  </svg>
                  ADD NEW FOLIO
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full justify-center '>
          {isLoadingFlights ? (
            <Loader />
          ) : folioFlight.length > 0 ? (
            <div className='w-full mb-8'>
              <div className='mt-6 text-black flex justify-center'>
                {renderBarraPaginacion}
              </div>
              {currentCards.map((dato, index) => (
                <FolioCard
                  key={index}
                  item={index + 1}
                  folioNumber={dato.folio as string}
                  startDate={dato.date as string}
                  endDate={dato.date as string}
                  totalHours={dato.hourCount as number}
                  setFolio={setFolio}
                  setShowTableHours={setShowTableHours}
                  buttonDisabled={buttonDisabled}
                  setIsLoading={setIsLoading}
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-screen text-white'>
              <h1 className='text-4xl font-bold mb-6'>Welcome!</h1>
              <p className='text-lg text-gray-300 mb-8'>
                You still do not have hours registered in your log, please
                access the following link to start adding your flights
              </p>
              <button
                className='font-sans bg-flightdeck-black text-flightdeck-lightgold  rounded-md py-2 px-4 hover:bg-flightdeck-darkgold hover:text-black border hover:border-black'
                onClick={() => {
                  setShowTableHours(true);
                }}
              >
                Let`s Start
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
