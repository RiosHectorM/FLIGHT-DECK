import { useState, useEffect, useRef } from 'react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import FolioCard from './FolioCard';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

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
  setFolio: (folio: string | number) => void;
  setShowTableHours: (show: boolean) => void;
  setIsLoading: (show: boolean) => void;
}

export default function PilotFolioViewer({
  setFolio,
  setShowTableHours,
  setIsLoading,
}: Props) {
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();
  const [isLoadingFlights, setIsLoadingFlights] = useState(false);
  const folioFlightRef = useRef<FlightData[]>([]);
  const [folioFlight, setFolioFlight] = useState<FlightData[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      setIsLoading(true);
      fetchUserByEmail(session.user.email);
      setIsLoading(false);
    }
  }, [session, fetchUserByEmail]);

  useEffect(() => {
    folioFlightRef.current = []; // Reiniciar la variable de referencia al cambiar el usuario
    setFolioFlight([]); // Reiniciar el estado de los vuelos
    setIsLoadingFlights(true); // Iniciar la carga de vuelos
  }, []);

  useEffect(() => {
    if (user?.email && user?.id) {
      toast.success('Loading Flight Data');
      getFlights(user.id);
    }
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
    try {
      const response = await axios.get(
        `/api/flight/getFlightsByUserId?id=${idF}`
      );
      updated(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoadingFlights ? (
        <p>Loading Flight Data...</p>
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
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
          <h1 className='text-4xl font-bold mb-6'>Welcome!</h1>
          <p className='text-lg text-gray-300 mb-8'>
            You still do not have hours registered in your log, please access
            the following link to start adding your flights
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
    </>
  );
}
