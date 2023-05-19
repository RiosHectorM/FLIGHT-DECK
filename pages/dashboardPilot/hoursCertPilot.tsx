import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  userId?: string;
}

const HoursCertPilot = ({ userId }: Props) => {
  const [certifiedHours, setCertifiedHours] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (userId !== undefined){
          const response = await axios.get(
            `/api/pilot/getHoursByUserId/${userId}`
          );
          const data = response.data;
          setCertifiedHours(data.CertifiedHours || 0);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <p>{certifiedHours}</p>
    </div>
  );
};

export default HoursCertPilot;