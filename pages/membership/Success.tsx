import axios from 'axios';
import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import ToasterProvider from '../providers/ToasterProvider';
import { toast } from 'react-hot-toast';
import { sendContactForm } from '@/lib/api';

const Success = () => {
  const { user } = useUserStore();

  const values = {
    name: 'Flight Deck App',
    email: user?.email,
    subject: 'Payment approved, you are now a premium member!',
    message:
      'Your payment has been processed successfully. From now on, you are a premium member and can enjoy our service without any limitations.',
  };

  const premiumUser = async () => {
    try {
      if (user?.id !== undefined) {
        console.log(user.id);
        await axios.put(`/api/user/${user.id}`, {
          premium: true,
        });
        await sendContactForm(values);
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
