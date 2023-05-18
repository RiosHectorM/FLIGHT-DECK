'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useAddHoursModal from '@/utils/hooks/useAddHoursModal';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import { toast } from 'react-hot-toast';
import useAddPlaneModal from '@/utils/hooks/useAddPlaneModal';
import { useSession } from 'next-auth/react';
import Loader from '../../Loader';
import { sendContactForm } from '@/lib/api';

interface Avion {
  registrationId: string;
  id: string;
  brand: string;
  model: string;
  planeClass: string;
  engine: string;
  HPs: number;
  remarks: string;
}

interface AddHoursModalProps {
  selectedFolio: string;
  getFlights: (id: string) => void;
  id: string;
  aviones: Avion[];
  setAviones: (airplanes: Avion[]) => void;
}

const AddHoursModal = ({
  selectedFolio,
  getFlights,
  id,
  aviones,
  setAviones,
}: AddHoursModalProps) => {
  const { data } = useSession();
  const userData = data?.user;

  const addHoursModal = useAddHoursModal();
  const addPlaneModal = useAddPlaneModal();

  const [isLoading, setIsLoading] = useState(false);

  const [matriculas, setMatriculas] = useState<string[]>([]);
  const [day, setDay] = useState(0);
  const [night, setNight] = useState(0);
  const [instrument, setInstrument] = useState(0);

  useEffect(() => {
    const mat = aviones.map(
      (avion: { registrationId: string }) => avion.registrationId
    );
    setMatriculas(mat);
  }, [aviones]);

  const handleChangeInputday = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDay(value);
    setValue('hourCount', night + instrument + value);
  };

  const handleChangeInputNight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNight(value);
    setValue('hourCount', day + instrument + value);
  };

  const handleChangeInputInstrument = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    setInstrument(value);
    setValue('hourCount', night + day + value);
  };

  const changeHandler = () => {};
  useEffect(() => {
    async function getRegisteredID() {
      try {
        const response = await axios.get(`/api/plane`);
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
  }, [aviones?.length]);

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
      aircraftId: yup
        .mixed()
        .oneOf(Object.values(matriculas), 'Debe registrar el avion'),
      flightType: yup.mixed().typeError('Debe seleccionar un tipo de vuelo'),
      hourCount: yup
        .number()
        .positive('Debe ser positivo')
        .typeError('Debe ser un número. La coma es el punto'),
      dayHours: yup
        .number()
        .positive('Debe ser positivo')
        .typeError('Debe ser un número. La coma es el punto'),
      nightHours: yup
        .number()
        .positive('Debe ser positivo')
        .typeError('Debe ser un número. La coma es el punto'),
      instHours: yup
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
    setValue,
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
          .post(`/api/flight`, {
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
          <div className={`relative z-0 w-full mb-6 group ${selectedFolio ? 'hidden' : ''}`}>
            <input
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={selectedFolio}
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
              <option value='Simulador'>Simulator</option>
              <option value='Escuela'>Training</option>
              <option value='Copiloto'>Copilot</option>
              <option value='Autonomo'>Autonomous</option>
            </select>
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Tipo de Horas:
            </label>
            <p className='text-red-600'>{errors.flightType?.message}</p>
          </div>

          <div className='relative z-0 w-full mb-6 group'>
            <input
              readOnly
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              defaultValue={0}
              {...register('hourCount')}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Horas a Cargar:{' '}
            </label>
            <p className='text-red-600'>{errors.hourCount?.message}</p>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              defaultValue={0}
              {...register('dayHours')}
              onChange={handleChangeInputday}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Horas a cargar de Dia:{' '}
            </label>
            <p className='text-red-600'>{errors.dayHours?.message}</p>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              defaultValue={0}
              {...register('nightHours')}
              onChange={handleChangeInputNight}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Horas a cargar de Noche:{' '}
            </label>
            <p className='text-red-600'>{errors.nightHours?.message}</p>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              defaultValue={0}
              {...register('instHours')}
              onChange={handleChangeInputInstrument}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Horas a cargar con Instrumentos:{' '}
            </label>
            <p className='text-red-600'>{errors.instHours?.message}</p>
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
