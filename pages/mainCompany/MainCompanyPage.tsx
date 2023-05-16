import React, { useState } from 'react';
import PilotProfile from './PilotProfile';
import PilotList from './PilotList';
import FlightLog, { FlightLogProps } from './FlightLog';
import RequestFlightLog from './RequestFlightLog';
import ContactPilot from './ContactPilot';
import FilterByLocation from './FilterByLocation';
import PilotDetails from './PilotDetails';
import TopPilots from './TopPilots';

const MainCompanyPage: React.FC = () => {
  const [locationFilter, setLocationFilter] = useState<string>('');

  const handleLocationFilterChange = (newLocation: string) => {
    setLocationFilter(newLocation);
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
  
  return (
    <div className="flex flex-col items-center space-y-8 p-8" style={{ backgroundImage: 'url("/images/company.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center' }}>

      <h1 className="text-3xl font-semibold" style={{ color: 'red' }}>Main Company</h1>
      <div className="flex flex-wrap justify-center gap-8">
        <TopPilots/>
        
      </div>
      <FilterByLocation onFilterChange={handleLocationFilterChange} />
      
      <div className="flex flex-wrap justify-center gap-8">
        <RequestFlightLog pilotName="John Doe" />
        <PilotDetails
        name="John Doe"
        photoUrl="/images/pilot1.jpg"
        location="Miami, FL"
        hoursOfFlight={2500}
        aircraftType="Boeing 737"
        availability="Disponible"
        bio="Soy un piloto experimentado con más de 2500 horas de vuelo acumuladas en una variedad de aviones de pasajeros y carga. Me encanta volar y estoy siempre buscando nuevas oportunidades y desafíos. Si está interesado en contratarme, por favor no dude en ponerse en contacto conmigo."
        flightLogUrl="/john-doe-flight-log.pdf"
        email="john.doe@example.com"
      />
      </div>
      
    </div>
  );
};

export default MainCompanyPage;
