import React, { useEffect, useState } from 'react';
import PilotProfile from './PilotProfile';

interface Pilot {
  id: string;
  name: string;
  photoUrl: string;
  location: string;
  hoursOfFlight: number;
}

const TopPilots: React.FC = () => {
  const [topPilots, setTopPilots] = useState<Pilot[]>([]);

  useEffect(() => {
    const fetchTopPilots = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pilot/getPilotsOrderedByTotalHours?numPilots=3');
        const data = await response.json();

        const pilotsWithDetails = await Promise.all(
          data.map(async (item: any) => {
            const id = item.userId;
            const userResponse = await fetch(`http://localhost:3000/api/user/${id}`);
            const userData = await userResponse.json();

            // Aquí puedes extraer los datos adicionales que necesites del objeto userData
            const name = userData.name;
            const photoUrl = userData.photoUrl;
            const location = userData.location;

            return {
              id,
              name,
              photoUrl,
              location,
              hoursOfFlight: item._sum.hourCount,
            };
          })
        );

        setTopPilots(pilotsWithDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopPilots();
  }, []);

  return (
    <div className="bg-black p-8">
      <h2 className="text-white text-2xl font-bold mb-4">Top Pilots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topPilots.map((pilot) => (
          <PilotProfile
            key={pilot.id}
            name={pilot.name}
            photoUrl={pilot.photoUrl}
            location={pilot.location}
            hoursOfFlight={pilot.hoursOfFlight}
          />
        ))}
      </div>
    </div>
  );
};

export default TopPilots;
