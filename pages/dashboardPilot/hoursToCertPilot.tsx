import { useEffect, useState } from 'react';
import axios from 'axios';


interface Props {
  userId?: string;
}

const HoursToCertPilot = ({ userId }: Props) => {
  const [toCertifyHours, setToCertifyHours] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pilot/getHoursByUserId/${userId}`
        );
        const data = response.data;
        setToCertifyHours(data.toCertifyHours || 0);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <p>{toCertifyHours}</p>
    </div>
  );
};

export default HoursToCertPilot;