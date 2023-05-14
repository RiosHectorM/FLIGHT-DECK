import { expirationDateStore } from './index';
import axios from 'axios';
import React, { useEffect } from 'react';

const Success = () => {
  const expDate = expirationDateStore((state) => state.expDate);
  console.log(expDate);

  const premiumUser = async () => {
    try {
      console.log(expDate);
      //await axios.put(`/api/user/${user?.id}`, { premium: true });
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
    }
  };

  useEffect(() => {
    if (expDate !== undefined) premiumUser();
  }, [expDate]);

  return <div>Success</div>;
};

export default Success;
