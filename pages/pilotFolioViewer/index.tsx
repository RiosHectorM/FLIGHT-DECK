import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import FolioCard from './folioCard';

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

export default function PilotFolioViewer() {
  const ejemplo = [
    {
      item: 1,
      folios: 36860,
      startDate: 'Sun Sep 25 2022',
      endDate: 'Fri Sep 30 2022',
      totalHours: 146,
    },
    {
      item: 2,
      folios: 11558,
      startDate: 'Sun Feb 13 2022',
      endDate: 'Thu May 11 2023',
      totalHours: 62,
    },
    {
      item: 3,
      folios: 85800,
      startDate: 'Tue Dec 07 2021',
      endDate: 'Thu Dec 08 2022',
      totalHours: 66,
    },
    {
      item: 4,
      folios: 34695,
      startDate: 'Sat Sep 18 2021',
      endDate: 'Wed Mar 08 2023',
      totalHours: 81,
    },
    {
      item: 5,
      folios: 98050,
      startDate: 'Sun Aug 07 2022',
      endDate: 'Sat Jan 21 2023',
      totalHours: 100,
    },
    {
      item: 6,
      folios: 97687,
      startDate: 'Mon Aug 02 2021',
      endDate: 'Sun Jan 22 2023',
      totalHours: 143,
    },
    {
      item: 7,
      folios: 95213,
      startDate: 'Sun Jan 10 2021',
      endDate: 'Thu Feb 23 2023',
      totalHours: 85,
    },
    {
      item: 8,
      folios: 10173,
      startDate: 'Wed Dec 22 2021',
      endDate: 'Wed May 10 2023',
      totalHours: 58,
    },
    {
      item: 9,
      folios: 57014,
      startDate: 'Fri May 13 2022',
      endDate: 'Mon May 30 2022',
      totalHours: 56,
    },
    {
      item: 10,
      folios: 40125,
      startDate: 'Sun Apr 02 2023',
      endDate: 'Sat May 06 2023',
      totalHours: 112,
    },
    {
      item: 11,
      folios: 50890,
      startDate: 'Sun Apr 11 2021',
      endDate: 'Sat Sep 18 2021',
      totalHours: 105,
    },
    {
      item: 12,
      folios: 96176,
      startDate: 'Wed Nov 16 2022',
      endDate: 'Sun Dec 18 2022',
      totalHours: 119,
    },
    {
      item: 13,
      folios: 70399,
      startDate: 'Thu Feb 17 2022',
      endDate: 'Tue May 31 2022',
      totalHours: 62,
    },
    {
      item: 14,
      folios: 90481,
      startDate: 'Sun Dec 25 2022',
      endDate: 'Sat Jan 14 2023',
      totalHours: 56,
    },
    {
      item: 15,
      folios: 53747,
      startDate: 'Fri Apr 23 2021',
      endDate: 'Fri Mar 04 2022',
      totalHours: 132,
    },
    {
      item: 16,
      folios: 16339,
      startDate: 'Tue Apr 12 2022',
      endDate: 'Fri Jan 27 2023',
      totalHours: 100,
    },
    {
      item: 17,
      folios: 92572,
      startDate: 'Sun Jan 10 2021',
      endDate: 'Sun Nov 07 2021',
      totalHours: 72,
    },
    {
      item: 18,
      folios: 41972,
      startDate: 'Thu Aug 26 2021',
      endDate: 'Mon Sep 06 2021',
      totalHours: 108,
    },
    {
      item: 19,
      folios: 24620,
      startDate: 'Thu May 05 2022',
      endDate: 'Tue Apr 25 2023',
      totalHours: 137,
    },
    {
      item: 20,
      folios: 24871,
      startDate: 'Sat Jul 09 2022',
      endDate: 'Sat Nov 05 2022',
      totalHours: 109,
    },
  ];

  const { user, fetchUserByEmail } = useUserStore();
  const [flight, setFlight] = useState<FlightData[]>([]);
  const [folioFlight, setFolioFlaight] = useState<FlightData[]>([]);

  //console.log(flight);

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
    const result = flight.reduce((acc, curr) => {
      const filtered = acc.filter((obj) => obj.folio === curr.folio);
      if (filtered.length === 0) {
        acc.push({
          folio: curr.folio,
          date: curr.date,
          hourCount: curr.hourCount,
        });
      } else {
        filtered[0].hourCount += curr.hourCount;
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
            item={index + 1}
            folioNumber={dato.folio}
            startDate={dato.date}
            endDate={dato.date}
            totalHours={dato.hourCount}
          />
        );
      })}
    </>
  );
}
