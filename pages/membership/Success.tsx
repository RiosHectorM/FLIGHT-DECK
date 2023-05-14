import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import React, { useEffect } from 'react';

const Success = () => {
  const user = useUserStore((state) => state.user);

  const premiumUser = async () => {
    try {
      await axios.put(`/api/user/${user?.id}`, { premium: true });
      const premiumExpiredDate = user?.premiumExpiredDate;
      console.log(premiumExpiredDate);
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
    }
  };

  useEffect(() => {
    if (user?.id !== undefined) premiumUser();
  }, [user?.id]);

  return <div>Success</div>;
};

export default Success;
