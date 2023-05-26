import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PilotProfile from './PilotProfile';
import ContactPilot from './ContactPilot';

interface Pilot {
  id: string;
  name: string;
  photoUrl: string;
  location: string;
  hoursOfFlight: number;
  email: string;
}

const TopPilots: React.FC = () => {
  const [topPilots, setTopPilots] = useState<Pilot[]>([]);
  const [selectedPilotId, setSelectedPilotId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPilots = async () => {
      try {
        const response = await fetch('/api/pilot/getPilotsOrderedByTotalHours?numPilots=4');
        const data = await response.json();

        const pilotsWithDetails = await Promise.all(
          data.map(async (item: any) => {
            const id = item.userId;
            const userResponse = await fetch(`/api/user/${id}`);
            const userData = await userResponse.json();

            const name = userData.name;
            const photoUrl = userData.image;
            const location = userData.nationality;

            return {
              id,
              name,
              photoUrl,
              location,
              hoursOfFlight: item._sum.hourCount,
              email: userData.email,
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

  const handleContactClick = (pilotId: string) => {
    if (selectedPilotId === pilotId) {
      setSelectedPilotId(null);
    } else {
      setSelectedPilotId(pilotId);
    }
  };

  return (
    <div className="bg-flightdeck-darkgold bg-opacity-100 p-4 rounded-lg">
      <h2 className="text-black text-3xl font-bold mb-4 text-center">Top Pilots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topPilots.map((pilot) => (
          <div
            key={pilot.id}
            className="bg-flightdeck-black rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <PilotProfile
                name={pilot.name}
                photoUrl={pilot.photoUrl}
                location={pilot.location}
                hoursOfFlight={pilot.hoursOfFlight}
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <FaStar key={star} className="text-flightdeck-gold h-6 w-6" />
                ))}
              </div>
              <button
                className="ml-2 bg-flightdeck-lightgold text-white rounded-md py-2 px-4 hover:bg-flightdeck-darkgold"
                onClick={() => handleContactClick(pilot.id)}
              >
                {selectedPilotId === pilot.id ? 'Close' : 'Contact'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedPilotId && (
        <ContactPilot
          name={topPilots.find((pilot) => pilot.id === selectedPilotId)?.name || ''}
          pilotName={topPilots.find((pilot) => pilot.id === selectedPilotId)?.name || ''}
          email={topPilots.find((pilot) => pilot.id === selectedPilotId)?.email || ''}
        />
      )}
    </div>
  );
};

export default TopPilots;
