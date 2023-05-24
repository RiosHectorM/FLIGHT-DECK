import { useState, useEffect, useRef } from 'react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import FolioCard from './FolioCard';

import { FaClipboardCheck, FaClock, FaRegFileAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Loader from '../components/Loader';
import useAddHoursModal from '@/utils/hooks/useAddHoursModal';

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
      <div className='flex flex-col sm:flex-row'>
        {isLoading && <Loader />}
        <div className='w-full sm:w-2/6'>
          <div className='px-4 sm:px-6 lg:px-0'>
            <div className='px-4 py-6 sm:p-0'>
              <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 mt-6'>
                <div className='bg-gray-800 rounded-xl shadow-md p-6'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                      <FaClock className='text-white w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-white truncate'>
                        <span className='whitespace-nowrap'>
                          Total Recorded Hours
                        </span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-white flex items-center'>
                          <p>{totalHours.totalHours}</p>
                          <p className='ml-2'>Hrs</p>
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800 rounded-xl shadow-md'>
                  <div className='px-4 py-5 sm:p-6'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                        <FaRegFileAlt className='text-white w-6 h-6' />
                      </div>
                      <div className='ml-4'>
                        <dt className='text-sm font-medium text-white truncate'>
                          Total Certified Hours
                        </dt>
                        <dd>
                          <div className='text-lg font-medium text-white flex items-center'>
                            <p>{totalHours.CertifiedHours}</p>
                            <p className='ml-2'>Hrs</p>
                          </div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800 rounded-xl shadow-md'>
                  <div className='px-4 py-5 sm:p-6'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                        <FaClipboardCheck className='text-white w-6 h-6' />
                      </div>
                      <div className='ml-5 w-0 flex-1'>
                        <dt className='text-sm font-medium text-white truncate'>
                          Total Pending Hours to Certify
                        </dt>
                        <dd>
                          <div className='text-lg font-medium text-white flex items-center'>
                            <p>{totalHours.toCertifyHours}</p>
                            <p className='ml-2'>Hrs</p>
                          </div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center text-center'>
                  <button
                    className='flex mt-16 bg-indigo-600 text-white px-6 py-4 rounded-full hover:bg-indigo-700 transition-colors duration-300 ease-in-out'
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
        </div>
        <div className='w-full sm:w-3/4 mx-auto'>
          {isLoadingFlights ? (
            <Loader />
          ) : folioFlight.length > 0 ? (
            <div>
              {folioFlight.map((dato, index) => (
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
                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg'
                onClick={() => {
                  setShowTableHours(true);
                }}
              >
                Go to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
