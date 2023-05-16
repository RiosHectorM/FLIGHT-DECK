import React, { useEffect, useState } from 'react';

interface FilterByLocationProps {
  onFilterChange: (newLocation: string) => void;
}

interface Pilot {
  id: string;
  name: string;
  photoUrl: string;
  location: string;
  hoursOfFlight: number;
  nationality: string;
}

const FilterByLocation: React.FC<FilterByLocationProps> = ({ onFilterChange }) => {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [filteredPilots, setFilteredPilots] = useState<Pilot[]>([]);
  const [nationality, setNationality] = useState<string>('');

  useEffect(() => {
    const fetchPilots = async () => {
      try {
        const response = await fetch('/api/pilot');
        const pilotData = await response.json();

        const updatedPilots = await Promise.all(
          pilotData.map(async (pilot: Pilot) => {
            const userResponse = await fetch(`/api/user/${pilot.id}`);
            const userData = await userResponse.json();

            return {
              ...pilot,
              nationality: userData.nationality,
            };
          })
        );

        setPilots(updatedPilots);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPilots();
  }, []);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNationality = event.target.value;
    setNationality(newNationality);

    if (newNationality === '') {
      setFilteredPilots([]);
      onFilterChange('');
    } else {
      const filteredPilots = pilots.filter((pilot) =>
        pilot.nationality?.toLowerCase().includes(newNationality.toLowerCase())
      );
      setFilteredPilots(filteredPilots);
      onFilterChange(newNationality);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-lg font-semibold">Filtrar por nacionalidad</h2>
      <input
        type="text"
        placeholder="Escriba una nacionalidad"
        className="border border-gray-400 rounded-md p-2 mt-2"
        value={nationality}
        onChange={handleLocationChange}
      />
      {nationality !== '' && (
        <div className="mt-4 flex flex-wrap">
          {filteredPilots.map((pilot) => (
            <div key={pilot.id} className="bg-white rounded-md p-2 mb-2 mr-2">
              <h3 className="text-lg font-semibold">{pilot.name}</h3>
              <p className="text-gray-500">{pilot.location}</p>
              <p className="text-gray-500">Horas de vuelo: {pilot.hoursOfFlight}</p>
              <p className="text-gray-500">Nacionalidad: {pilot.nationality}</p>
            </div>
          ))}
        </div>
      )}
      {nationality !== '' && filteredPilots.length === 0 && (
        <div className="bg-white bg-opacity-90 absolute inset-0 flex items-center justify-center z-10">
        <p className="text-red-500 font-bold text-xl animate-pulse">No se encontraron pilotos con esa nacionalidad.</p>
      </div>
      )}
    </div>
  );
};

export default FilterByLocation;

