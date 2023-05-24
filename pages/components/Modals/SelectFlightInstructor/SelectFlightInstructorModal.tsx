'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useSelectFlightInstructorModal from '@/utils/hooks/useSelectFlightInstructorModal';
import useRateInstructorModal from '@/utils/hooks/useRateInstructorModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import RateInstructorModal from '../InstHours/RateInstructorModal';

interface Instructor {
  id: string | null;
  name: string | null;
  lastName: string | null;
  role: string | null;
  email: string | null;
}

const SelectFlightInstructorModal = ({
  selectedFlight,
  getFlights,
  id,
  seleccionarInstructor,
  setIsLoading,
}: {
  selectedFlight: any;
  getFlights: any;
  id: string;
  seleccionarInstructor: (index: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const { data: userData } = useSession();
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const selectFlightInstructorModal = useSelectFlightInstructorModal();
  const rateInstructorModal = useRateInstructorModal();

  const userByRole = async (email: string) => {
    setIsLoading(true);
    return axios
      .get(`/api/getUserByEmail/${email}`)
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        toast.error('Error User select');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSelect = async (instructorId: any) => {
    setIsLoading(true);

    const flightId = Array.isArray(selectedFlight.id)
      ? selectedFlight.id[0]
      : selectedFlight.id;
    seleccionarInstructor(instructorId);
    selectFlightInstructorModal.onClose();
    await axios
      .put(`/api/flight/setCertifier/${flightId}`, {
        certifierId: instructorId.id,
        certified: false,
      })
      .then(() => {
        toast.success('Certification Requirement Saved');
        rateInstructorModal.onOpen();
        getFlights(id);
      })
      .catch(() => toast.error('Error Saving Data'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/api/instructor')
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Ask your flight instructor to certify your hours...'
        subtitle='All of them'
      />
      <div className='grid grid-cols-3 gap-4 p-4 border rounded-lg bg-white shadow-md mx-auto my-auto text-center'>
        {instructors.map((usuario, index) => (
          <div
            key={index}
            className='p-4 border rounded-lg bg-white shadow-md mx-auto my-auto items-center flex-col text-center '
          >
            <div className='font-bold mb-2'>
              {usuario.name} {usuario.lastName}
            </div>
            <div className='text-gray-800'>{usuario.role}</div>
            {usuario?.id ? (
              <button
                onClick={() => handleSelect(usuario!)}
                className='bg-blue-500 text-white py-1 px-2 rounded mt-2'
              >
                Select
              </button>
            ) : null}
          </div>
        ))}
      </div>
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
        <p>All Instructors on One Click</p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={false}
      isOpen={selectFlightInstructorModal.isOpen}
      title='Select INSTRUCTOR'
      onClose={selectFlightInstructorModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SelectFlightInstructorModal;
