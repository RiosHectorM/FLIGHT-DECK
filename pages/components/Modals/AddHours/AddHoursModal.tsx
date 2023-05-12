'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useAddHoursModal from '@/pages/hooks/useAddHoursModal';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import { toast } from 'react-hot-toast';
import useAddPlaneModal from '@/pages/hooks/useAddPlaneModal';
import { useSession } from 'next-auth/react';
import Loader from '../../Loader';
import { sendContactForm } from '@/lib/api';

const AddHoursModal = ({
  getFlights,
  id,
  aviones,
  setAviones,
}: {
  getFlights: (id: string) => void;
  id: string;
  aviones: { registrationId: string }[];
  setAviones: (airplanes: { registrationId: string }[]) => void;
}) => {
  const { data } = useSession();
  const userData = data?.user;

  const addHoursModal = useAddHoursModal();
  const addPlaneModal = useAddPlaneModal();

  const [isLoading, setIsLoading] = useState(false);

  enum TypeHours {
    'Simulador' = 'Simulador',
    'Escuela' = 'Escuela',
    'Copiloto' = 'Copiloto',
    'Autonomo' = 'Autonomo',
  }

  const [matriculas, setMatriculas] = useState<string[]>([]);

  useEffect(() => {
    const mat = aviones.map(
      (avion: { registrationId: string }) => avion.registrationId
    );
    setMatriculas(mat);
  }, [aviones]);

  useEffect(() => {
    async function getRegisteredID() {
      try {
        const response = await axios.get(`http://localhost:3000/api/plane`);
        return response.data;
      } catch (error) {
        // Manejar el error de la solicitud
        console.error(error);
        return [];
      }
    }

    const fetchData = async () => {
      const airplanes = await getRegisteredID();
      setAviones(airplanes);
    };

    fetchData();
  }, [aviones.length]);

  const schema = yup
    .object({
      folio: yup
        .number()
        .positive('Debe ser positivo')
        .integer('Debe ser entero')
        .required()
        .typeError('Debe ser un número'),
      //userId: yup.string().required(),
      date: yup.string().required('Fecha es un campo obligatorio'),

      // aircraftId: yup
      //   .mixed()
      //   .oneOf(Object.values(matriculas), 'Avión no registrado (ej A003)'),
      stages: yup.string().required('Debe ingresar las etapas'),
      remarks: yup.string(),
      flightType: yup
        .mixed()
        .oneOf(Object.values(TypeHours), 'Debe ser un tipo definido'),
      aircraftId: yup
        .mixed()
        .oneOf(Object.values(matriculas), 'Debe registrar el avion'),
      hourCount: yup
        .number()
        .positive('Debe ser positivo')
        .typeError('Debe ser un número. La coma es el punto'),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  let aircraftId = watch('aircraftId');

  const userByRole = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await axios.get(`/api/getUserByEmail/${email}`);
      return result.data;
    } catch (error) {
      toast.error('Error User Search');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    reset();

    const values = {
      name: 'Flight Deck App',
      email: userData?.email,
      subject: 'New flight created',
      message: 'You have created a new flight in Flight Deck App',
      html: `<div style="background-color: #f7f7f7; padding: 20px; text-align: center;"><h1 style="color: #333333; font-size: 28px;">¡Nuevo Vuelo Registrado!</h1><img src="https://res.cloudinary.com/dvm47pxdm/image/upload/v1683420911/yq7qmpvsenhmxgrtjpyd.png" alt="ImagenFlightDeck" style="width: 300px; margin-bottom: 20px;"><p style="color: #666666; font-size: 18px;">Registraste n vuelo el dia ${data.date} con una duracion de ${data.hourCount}hrs, entre las etapas ${data.stages} y del tipo ${data.flightType}.</p><p>¡Muchas gracias por utilizar la Aplicacion!</p></div>`,
    };

    if (userData?.email) {
      let result = userByRole(userData?.email);
      result.then(async (user) => {
        await axios
          .post(`http://localhost:3000/api/flight`, {
            ...data,
            userId: user.id,
          })
          .then(() => {
            toast.success('Saved');
            addHoursModal.onClose();
            getFlights(id);
          })
          .then(
            // Nodemailer: send mail
            await sendContactForm(values)
          )

          .catch(() => toast.error('Error Save Data'))
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  };

  const openRegisterAirplane: () => void = () => {
    addPlaneModal.onOpen();
    addHoursModal.onClose();
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      {isLoading && <Loader />}
      <Heading
        title='Add your Flight Hours in your LogBook'
        subtitle='Fill all fields'
      />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              {...register('folio')}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Folio:{' '}
            </label>
            <p className='text-red-600'>{errors.folio?.message}</p>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='date'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              {...register('date')}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Fecha:{' '}
            </label>
            <p className='text-red-600'>{errors.date?.message}</p>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              {...register('aircraftId')}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Matricula:{' '}
            </label>
            <p className='text-red-600'>{errors.aircraftId?.message}</p>
          </div>
          <div className='relative z-0 w-full mb-6 group flex justify-center'>
            {!matriculas.includes(aircraftId as string) && (
              <button onClick={openRegisterAirplane}>Register Airplane</button>
            )}
          </div>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <div className='flex justify-between'>
            <input
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              {...register('stages')}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Etapas:
            </label>
          </div>
          <p className='text-red-600'>{errors.stages?.message}</p>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <textarea
            rows={2}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            {...register('remarks')}
          />
          <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
            Observaciones:
          </label>
          <p className='text-red-600'>{errors.remarks?.message}</p>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <select
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              {...register('flightType')}
            >
              <option value='Simulador'>Simulador</option>
              <option value='Escuela'>Escuela</option>
              <option value='Copiloto'>Copiloto</option>
              <option value='Autonomo'>Autónomo</option>
            </select>
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Tipo de Horas:
            </label>
            <p className='text-red-600'>{errors.flightType?.message}</p>
          </div>

          <div className='relative z-0 w-full mb-6 group'>
            <input
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              {...register('hourCount')}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Horas a Cargar:{' '}
            </label>
            <p className='text-red-600'>{errors.hourCount?.message}</p>
          </div>
        </div>
        <button>SEND</button>
      </form>
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <div
        className='
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        '
      >
        <p>Add a Flight record to your Database to record your Flight Hours</p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addHoursModal.isOpen}
      title='NEW FLIGHT'
      onClose={addHoursModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AddHoursModal;
