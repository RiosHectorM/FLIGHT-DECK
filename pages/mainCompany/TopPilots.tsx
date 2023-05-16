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
        const response = await fetch('http://localhost:3000/api/pilot/getPilotsOrderedByTotalHours?numPilots=4');
        const data = await response.json();

        const pilotsWithDetails = await Promise.all(
          data.map(async (item: any) => {
            const id = item.userId;
            const userResponse = await fetch(`http://localhost:3000/api/user/${id}`);
            const userData = await userResponse.json();

            // Aquí obtienes los datos adicionales del piloto del objeto userData
            const name = userData.name;
            const photoUrl = userData.image;
            const location = userData.nationality;

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
    <div className="bg-gray-900 p-8">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Top Pilots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topPilots.map((pilot) => (
          <div
            key={pilot.id}
            className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <PilotProfile
                name={pilot.name}
                photoUrl={pilot.photoUrl}
                location={pilot.location}
                hoursOfFlight={pilot.hoursOfFlight}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2L8 8h8l-4 6-4-6h0"
                    />
                  </svg>
                ))}
              </div>

                    </div>
                    </div>
                    ))}
                    </div>
                    </div>
                    );
                    };
                    
                    export default TopPilots;
