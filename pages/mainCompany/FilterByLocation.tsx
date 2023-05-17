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
    <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-2">Filtrar por nacionalidad</h2>
      <input
        type="text"
        placeholder="Escriba una nacionalidad"
        className="border border-gray-700 bg-gray-800 text-white rounded-md p-2 mb-4 focus:outline-none focus:border-indigo-500"
        value={nationality}
        onChange={handleLocationChange}
      />
      {nationality !== '' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPilots.length > 0 ? (
            filteredPilots.map((pilot) => (
              <div
                key={pilot.id}
                className="bg-gray-800 text-white rounded-md p-4 shadow-md"
              >
                <h3 className="text-xl font-semibold">{pilot.name}</h3>
                <p className="text-gray-300">{pilot.location}</p>
                <p className="text-gray-300">Horas de vuelo: {pilot.hoursOfFlight}</p>
                <p className="text-gray-300">Nacionalidad: {pilot.nationality}</p>
              </div>
            ))
          ) : (
            <div className="bg-gray-800 text-white rounded-md p-4">
              <p className="text-xl font-semibold animate-pulse">
                  No se encontraron pilotos con esa nacionalidad.
                  </p>
                  </div>
                    )}
                  </div>
                    )}
                  </div>
);
};

export default FilterByLocation;
