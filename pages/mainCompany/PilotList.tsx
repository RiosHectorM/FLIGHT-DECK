import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PilotDetails from './PilotDetails';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Loader from '../components/Loader';

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
  const [isLoading, setIsLoading] = useState(false);
  const [filterLocation, setFilterLocation] = useState<string>('');

  useEffect(() => {
    const fetchPilots = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          '/api/pilot/getPilotsOrderedByTotalHours?numPilots=10'
        );
        const data = response.data;

        const pilotsWithDetails = await Promise.all(
          data.map(async (item: any) => {
            const id = item.userId;
            const userResponse = await axios.get(`/api/user/${id}`);
            const userData = userResponse.data;

            const name = userData.name;
            const photoUrl = userData.image;
            const email = userData.email;
            const location = userData.nationality;

            return {
              id,
              name,
              photoUrl,
              location,
              email,
              hoursOfFlight: item._sum.hourCount.toFixed(2), // Formateamos a dos decimales
            };
          })
        );
        setIsLoading(false);
        setPilots(pilotsWithDetails);
      } catch (error) {
        console.error(error);
         setIsLoading(false);
      }
      setIsLoading(false);
    };

    fetchPilots();
  }, []);

  useEffect(() => {
    // Apply filters
    let filteredPilots = pilots;

    if (filterHours) {
      filteredPilots = filteredPilots.filter(
        (pilot) => pilot.hoursOfFlight >= filterHours
      );
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

  const handleLocationFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterLocation(e.target.value);
  };

  return (
    <div className='mx-auto w-full lg:w-3/4  bg-flighTd  eck-dark bg-opacity-70 rounded-lg shadow-lg p-6'>
      {isLoading && <Loader />}
      <h2 className='text-center font-bold mb-10 text-white uppercase'>
        List of pilots
      </h2>
      <div className='flex mb-4 flex-col lg:flex-row w-full justify-around'>
        <div className='flex justify-between flex-col sm:flex-row sm:justify-center w-full bg-flightdeck-lightgold mx-0 lg:mx-2 my-2 rounded-md py-1'>
          <label className='block font-medium p-2 my-auto text-black'>
            Filter by flight hours:
          </label>
          <input
            type='number'
            className='border py-1 mx-2 rounded text-black text-center border-black'
            value={filterHours || ''}
            onChange={handleFilterChange}
            placeholder='Enter the flight hours'
          />
        </div>
        <div className='flex justify-between flex-col sm:flex-row sm:justify-center w-full bg-flightdeck-lightgold mx-0 lg:mx-2 my-2 rounded-md py-1'>
          <label className='block font-medium p-2 my-auto text-black'>
            Filter by nationality:
          </label>
          <input
            type='text'
            className='border py-1 mx-2 rounded text-black text-center border-black'
            value={filterLocation}
            onChange={handleLocationFilterChange}
            placeholder='Enter the nationality'
          />
        </div>
      </div>

      <Table className='table-auto w-full bg-flightdeck-lightgold rounded-md'>
        <Thead>
          <Tr className='text-left'>
            <Th className='px-4 py-2 font-bold text-black text-center'>Name</Th>
            <Th className='px-4 py-2 font-bold text-black text-center'>
              Nationality
            </Th>
            <Th className='px-4 py-2 font-bold text-black text-center'>
              Flight hours
            </Th>
            <Th className='px-4 py-2 font-bold text-black text-center'>
              Details
            </Th>
          </Tr>
        </Thead>
        <tbody>
          {filteredPilots.map((pilot) => (
            <React.Fragment key={pilot.id}>
              <Tr>
                <Td className='border px-4 py-2 font-semibold text-black'>
                  {pilot.name}
                </Td>
                <Td className='border px-4 py-2 italic text-black text-center'>
                  {pilot.location}
                </Td>
                <Td className='border px-4 py-2 text-black italic text-center'>
                  {pilot.hoursOfFlight}
                </Td>
                <Td className='border px-4 py-2 text-center flex justify-center'>
                  <button
                    className='font-sans bg-flightdeck-black text-flightdeck-lightgold  rounded-md px-2 hover:bg-flightdeck-darkgold hover:text-black border hover:border-black flex '
                    onClick={() => {
                      if (expandedPilots.includes(pilot.id)) {
                        setExpandedPilots(
                          expandedPilots.filter((id) => id !== pilot.id)
                        );
                      } else {
                        setExpandedPilots([...expandedPilots, pilot.id]);
                      }
                    }}
                  >
                    {expandedPilots.includes(pilot.id)
                      ? 'Close details'
                      : 'See details'}
                  </button>
                </Td>
              </Tr>
              {expandedPilots.includes(pilot.id) && (
                <Tr>
                  <Td colSpan={4}>
                    <PilotDetails {...pilot} />
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PilotList;
