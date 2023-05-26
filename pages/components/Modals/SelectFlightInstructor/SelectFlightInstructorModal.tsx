'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useSelectFlightInstructorModal from '@/utils/hooks/useSelectFlightInstructorModal';
import useRateInstructorModal from '@/utils/hooks/useRateInstructorModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import { toast } from 'react-hot-toast';

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
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const selectFlightInstructorModal = useSelectFlightInstructorModal();
  const rateInstructorModal = useRateInstructorModal();

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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 border rounded-lg bg-white shadow-md mx-auto my-auto text-center'>
        {instructors.map((usuario, index) => (
          <div
            key={index}
            className='p-4 border w-full  rounded-lg bg-white shadow-md m-4 items-center flex-col text-center '
          >
            <div className='font-bold mb-2'>
              {usuario.name} {usuario.lastName}
            </div>
            <div className='text-gray-800'>{usuario.role}</div>
            {usuario?.id ? (
              <button
                onClick={() => handleSelect(usuario!)}
                className='font-sans bg-flightdeck-black text-flightdeck-lightgold  rounded-md py-2 hover:bg-flightdeck-darkgold hover:text-black border hover:border-black px-4'
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
