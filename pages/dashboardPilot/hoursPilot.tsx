/* import { useEffect, useState } from 'react';

interface Pilot {
  userId: string;
  hourCount: number;
}

export const HoursPilot = () => {
  const [pilots, setPilots] = useState<Pilot[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/pilot/getPilotsOrderedByTotalHours?numPilots=1');
      const data = await response.json();
      const newPilots: Pilot[] = data.map((pilot: any) => {
        return {
          userId: pilot.userId,
          hourCount: pilot._sum.hourCount,
        };
      });
      setPilots(newPilots);
    }

    fetchData();
  }, []);

  return (
    <div>
      { pilots.map(pilot => (
        <div key={pilot.userId}>
          <p>{pilot.hourCount}</p>
        </div>
      ))}
    </div>
  );
}
 */

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pilot {
  userId: string;
  hourCount: number;
}

interface Props {
  userId: string;
}

const HoursPilot = ({ userId }: Props) => {
  const [pilots, setPilots] = useState<Pilot[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pilot/getPilotsOrderedByTotalHours?numPilots=1&userId=${userId}`
        );
        const data = response.data;
        const newPilots: Pilot[] = data.map((pilot: any) => {
          return {
            userId: pilot.userId,
            hourCount: pilot._sum.hourCount,
          };
        });
        setPilots(newPilots);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      {pilots.map((pilot) => (
        <div key={pilot.userId}>
          <p>{pilot.hourCount}</p>
        </div>
      ))}
    </div>
  );
};

export default HoursPilot;
