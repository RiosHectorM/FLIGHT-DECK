import React, { useState, useEffect } from 'react';
import PilotProfile from './PilotProfile';
import PilotList from './PilotList';
import FlightLog, { FlightLogProps } from './FlightLog';
import RequestFlightLog from './RequestFlightLog';
import ContactPilot from './ContactPilot';
import FilterByLocation from './FilterByLocation';
import PilotDetails from './PilotDetails';
import TopPilots from './TopPilots';
import Loader from '../../pages/components/Loader/index'; // Importa tu archivo Loader

const MainCompanyPage: React.FC = () => {
  const [locationFilter, setLocationFilter] = useState<string>('');

  const handleLocationFilterChange = (newLocation: string) => {
    setLocationFilter(newLocation);
  };
  const [showPilots, setShowPilots] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Agrega el estado de isLoading

  const handleTogglePilots = () => {
    setShowPilots(!showPilots);
  };

  const flightData: Omit<FlightLogProps, 'pilotName'> = {
    flightNumber: "AC1234",
    date: "2023-05-01",
    duration: "2 horas 30 minutos",
    origin: "Toronto, Canada",
    destination: "London, UK",
    aircraft: "Boeing 777 ",
    flightLogUrl: "/flight-log.pdf"
  };

  useEffect(() => {
    // Simular una carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 p-8 min-h-screen" style={{ backgroundImage: 'url("/images/company.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    }}>

      <h1 className="text-3xl font-semibold" style={{ color: '#CBB26A' }}>Main Company</h1>
      {isLoading ? (
        <Loader /> // Mostrar el loader si isLoading es true
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          <TopPilots/>
        </div>
      )}
      <FilterByLocation onFilterChange={handleLocationFilterChange} />
      

      <button
          className="bg-flightdeck-darkgold text-white rounded-md py-2 px-4 hover:bg-flightdeck-black"
          onClick={handleTogglePilots}
        >
          {showPilots ? "Ocultar pilotos" : "Ver pilotos registrados"}
        </button>
        {showPilots && <PilotList />}
    </div>
  );
};

export default MainCompanyPage;
