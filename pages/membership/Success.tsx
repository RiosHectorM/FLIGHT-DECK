import axios from 'axios';
import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import ToasterProvider from '../providers/ToasterProvider';
import { toast } from 'react-hot-toast';

const Success = () => {
  const { user } = useUserStore();

  const premiumUser = async () => {
    try {
      if (user?.id !== undefined) {
        console.log(user.id);
        await axios.put(`/api/user/${user.id}`, {
          premium: true,
        });
        toast.success('Congratulations, You are Premium!!!');
      }
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
    }
  };

  useEffect(() => {
    if (user?.id !== undefined) premiumUser();
  }, [user?.id]);

  return (
    <div>
      <ToasterProvider />
      <h1>YA SOS PREMIUM, PAGO EXITOSO</h1>
      <h1>ME FALTA DARLE ESTILOS XD</h1>
      <h3>no me miren asi... jajaja</h3>
    </div>
  );
};

export default Success;
