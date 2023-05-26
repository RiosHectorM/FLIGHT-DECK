import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PilotDetails from './PilotDetails';

interface Pilot {
  name: string;
  id: string;
  photoUrl: string;
  location: string;
  hoursOfFlight: number;
  aircraftType: string;
  availability: string;
  bio: string;
  flightLogUrl: string;
  email: string;
}

const PilotList: React.FC = () => {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [expandedPilots, setExpandedPilots] = useState<string[]>([]);
  const [filteredPilots, setFilteredPilots] = useState<Pilot[]>([]);
  const [filterHours, setFilterHours] = useState<number | null>(null);
  const [filterLocation, setFilterLocation] = useState<string>('');

  useEffect(() => {
    const fetchPilots = async () => {
      try {
        const response = await axios.get('/api/pilot/getPilotsOrderedByTotalHours?numPilots=10');
        const data = response.data;

        const pilotsWithDetails = await Promise.all(
          data.map(async (item: any) => {
            const id = item.userId;
            const userResponse = await axios.get(`/api/user/${id}`);
            const userData = userResponse.data;

            const name = userData.name;
            const photoUrl = userData.image;
            const location = userData.nationality;

            return {
              id,
              name,
              photoUrl,
              location,
              hoursOfFlight: item._sum.hourCount.toFixed(2), // Formateamos a dos decimales
            };
          })
        );

        setPilots(pilotsWithDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPilots();
  }, []);

  useEffect(() => {
    // Apply filters
    let filteredPilots = pilots;

    if (filterHours) {
      filteredPilots = filteredPilots.filter((pilot) => pilot.hoursOfFlight >= filterHours);
    }

    if (filterLocation) {
      const lowerCaseFilter = filterLocation.toLowerCase();
      filteredPilots = filteredPilots.filter((pilot) =>
        pilot.location?.toLowerCase().includes(lowerCaseFilter)
      );
    }

    setFilteredPilots(filteredPilots);
  }, [pilots, filterHours, filterLocation]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterHours(Number(e.target.value));
  };

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterLocation(e.target.value);
  };

  return (
    <div className="mx-auto w-3/4 bg-flightdeck-dark bg-opacity-70 rounded-lg shadow-lg p-6">
      <h2 className="text-center font-bold mb-10 text-white uppercase">List of pilots</h2>
      <div className="flex mb-4">
        <div className="mr-4 flex justify-center">
          <label className="block font-medium mb-2 text-white">Filter by flight hours:</label>
          <div>
            <input
              type="number"
              className="border py-1 px-2 rounded text-black"
              value={filterHours || ''}
              onChange={handleFilterChange}
              placeholder="Enter the flight hours"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <label className="block font-medium mb-2 text-white">Filter by nationality:</label>
          <div>
            <input
              type="text"
              className="border py-1 px-2 rounded text-black"
              value={filterLocation}
              onChange={handleLocationFilterChange}
              placeholder="Enter the nationality"
            />
          </div>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2 font-medium text-white">Name</th>
            <th className="px-4 py-2 font-medium text-white">Nationality</th>
            <th className="px-4 py-2 font-medium text-white">Flight hours</th>
            <th className="px-4 py-2 font-medium text-white">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredPilots.map((pilot) => (
            <React.Fragment key={pilot.id}>
              <tr>
                <td className="border px-4 py-2 text-white">{pilot.name}</td>
                <td className="border px-4 py-2 text-white">{pilot.location}</td>
                <td className="border px-4 py-2 text-white">{pilot.hoursOfFlight}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-flightdeck-lightgold"
                    onClick={() => {
                      if (expandedPilots.includes(pilot.id)) {
                        setExpandedPilots(expandedPilots.filter((id) => id !== pilot.id));
                      } else {
                        setExpandedPilots([...expandedPilots, pilot.id]);
                      }
                    }}
                  >
                    {expandedPilots.includes(pilot.id) ? 'Close details' : 'See details'}
                  </button>
                </td>
              </tr>
              {expandedPilots.includes(pilot.id) && (
                <tr>
                  <td colSpan={4}>
                    <PilotDetails {...pilot} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PilotList;
