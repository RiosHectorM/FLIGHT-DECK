import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  userId?: string;
}

const HoursPilot = ({ userId }: Props) => {
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (userId !== undefined) {
          const response = await axios.get(
            `/api/pilot/getHoursByUserId/${userId}`
          );
          const data = response.data;
          setTotalHours(data.totalHours || 0);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <p>{totalHours}</p>
    </div>
  );
};

export default HoursPilot;

/* import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  userId: string;
}

const HoursPilot = ({ userId }: Props) => {
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pilot/getHoursByUserId/645127b9c55b76a478760fa4`
        );
        const data = response.data;
        setTotalHours(data.totalHours || 0);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <p>{totalHours}</p>
    </div>
  );
};

export default HoursPilot; */
