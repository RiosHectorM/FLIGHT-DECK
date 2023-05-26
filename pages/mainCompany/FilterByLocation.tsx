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
  image: string;
  email: string;
}

const FilterByLocation: React.FC<FilterByLocationProps> = ({
  onFilterChange,
}) => {
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
              image: userData.image,
              email: userData.email,
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
    <div className='bg-flightdeck-dark p-8 rounded-lg shadow-lg'>
      <div className='w-full flex flex-col justify-center items-center'>
        <h2 className='text-flightdeck-lightgold text-lg font-semibold mb-2'>
          Filter by Nationality
        </h2>
        <input
          type='text'
          placeholder='Write a nationality'
          className='border border-gray-700 bg-flightdeck-black text-white rounded-md p-2 mb-4 focus:outline-none focus:border-yellow-500'
          value={nationality}
          onChange={handleLocationChange}
        />
      </div>
      {nationality !== '' && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredPilots.length > 0 ? (
            filteredPilots.map((pilot) => (
              <div
                key={pilot.id}
                className='bg-flightdeck-lightgold text-black rounded-md p-4 flex flex-col items-center md:items-baseline shadow-md'
              >
                <div className='flex justify-start'>
                  <img
                    src={pilot.image || '/images/avatar.jpg'}
                    alt='Avatar'
                    className='w-12 h-12 rounded-full border border-white'
                  />
                  <h3 className='ml-2 text-black text-xl font-semibold uppercase truncate'>
                    {pilot.name}
                  </h3>
                </div>
                <p className='text-black font-semibold truncate'>
                  {pilot.email}
                </p>
                <div className='flex justify-between'>
                  <p className='text-black truncate font-semibold>'>
                    Nationality:
                  </p>
                  <p className='italic'>{pilot.nationality}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='bg-flightdeck-dark text-white rounded-md p-4'>
              <p className='text-flightdeck-lightgold text-xl font-semibold animate-pulse'>
                No pilots with that nationality were found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterByLocation;
