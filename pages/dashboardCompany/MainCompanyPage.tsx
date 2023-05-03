import React, { useState } from 'react';
import PilotProfile from './PilotProfile';
import PilotList from './PilotList';
import FlightLog, { FlightLogProps } from './FlightLog';
import RequestFlightLog from './RequestFlightLog';
import ContactPilot from './ContactPilot';
import FilterByLocation from './FilterByLocation';
import PilotDetails from './PilotDetails';

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
    <div className="flex flex-col items-center space-y-8 p-8" style={{ backgroundImage: 'url("/images/background-image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center' }}>

      <h1 className="text-3xl font-semibold" style={{ color: 'red' }}>Main Company</h1>
      <div className="grid grid-cols-3 gap-8">
        <PilotProfile name="John Doe" photoUrl="/images/pilot1.jpg" location="Miami, FL " hoursOfFlight={2500} />
        <PilotProfile name="Jane Smith" photoUrl="/images/pilot2.jpg" location="Los Angeles, CA" hoursOfFlight={3000} />
        <PilotProfile name="Bob Johnson" photoUrl="/images/pilot3.jpg" location="New York, NY" hoursOfFlight={2000} />
      </div>
      <PilotList />
      <FlightLog {...flightData} pilotName="John Doe" />
      <RequestFlightLog pilotName="John Doe" />
      <ContactPilot name="Jane Smith" pilotName="John Doe" email="jane.smith@example.com" />
      <FilterByLocation onFilterChange={handleLocationFilterChange} />
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
  );
};
//para push
export default MainCompanyPage;
