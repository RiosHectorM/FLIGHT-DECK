import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import FolioCard from './FolioCard';
import { FaClipboardCheck, FaClock, FaRegFileAlt } from 'react-icons/fa';
import HoursPilot from '../dashboardPilot/hoursPilot';
import HoursCertPilot from '../dashboardPilot/hoursCertPilot';
import HoursToCertPilot from '../dashboardPilot/hoursToCertPilot';

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
        `/api/flight/getFlightsByUserId?id=${idF}`
      );

      setFlight(response.data);
    } catch (error) {
      console.error(error);
    }
    // setIsLoading(false);
  };

  const userId = user?.id;

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-2/6">
          <div className="px-4 sm:px-6 lg:px-0">
            <div className="px-4 py-6 sm:p-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 mt-6">

                <div className="bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <FaClock className="text-white w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <dt className="text-sm font-medium text-white truncate">
                        <span className="whitespace-nowrap">Total Recorded Hours</span>
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-white flex items-center">
                          <HoursPilot userId={userId} />
                          <p className="ml-2">Hrs</p>
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-md">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <FaRegFileAlt className="text-white w-6 h-6" />
                      </div>
                      <div className="ml-4">
                        <dt className="text-sm font-medium text-white truncate">
                          Total Certified Hours
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-white flex items-center">
                            <HoursCertPilot userId={userId} />
                            <p className="ml-2">Hrs</p>
                          </div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-md">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <FaClipboardCheck className="text-white w-6 h-6" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dt className="text-sm font-medium text-white truncate">
                          Total Pending Hours to Certify
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-white flex items-center">
                            <HoursToCertPilot userId={userId} />
                            <p className="ml-2">Hrs</p>
                          </div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/4 mx-auto">
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
        </div>
      </div>
    </>
  );
}
