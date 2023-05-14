import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import FolioCard from './FolioCard';

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
}

export default function PilotFolioViewer({
  setFolio,
  setShowTableHours,
}: Props) {
  const { user, fetchUserByEmail } = useUserStore();
  const [flight, setFlight] = useState<FlightData[]>([]);
  const [folioFlight, setFolioFlaight] = useState<FlightData[]>([]);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      user?.email !== undefined &&
      user?.id
    ) {
      getFlights(user?.id);
    }
  }, [user?.id]);

  useEffect(() => {
    const result = flight.reduce((acc: FlightData[], curr) => {
      const filtered = acc.filter((obj) => obj.folio === curr.folio);
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
    setFolioFlaight(result);
  }, [flight]);

  const getFlights = async (idF: string) => {
    // setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/flight/getFlightsByUserId?id=${idF}`
      );

      setFlight(response.data);
    } catch (error) {
      console.error(error);
    }
    // setIsLoading(false);
  };

  return (
    <>
      {folioFlight.map((dato, index) => {
        return (
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
        );
      })}
    </>
  );
}
