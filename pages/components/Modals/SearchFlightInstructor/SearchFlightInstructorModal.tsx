'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useSearchFlightInstructorModal from '@/pages/hooks/useSearchFlightInstructorModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import { toast } from 'react-hot-toast';
import useAddPlaneModal from '@/pages/hooks/useAddPlaneModal';
import { useSession } from 'next-auth/react';

const SearchFlightInstructorModal = () => {
  const { data } = useSession();
  const userData = data?.user;

  interface Instructor {
    name: string | null;
    lastName: string | null;
    role: string | null;
    email: string | null;
  }

  const searchFlightInstructorModal = useSearchFlightInstructorModal();
  //const addPlaneModal = useAddPlaneModal();

  const [isLoading, setIsLoading] = useState(false);

  const [instructors, setInstructors] = useState<Instructor[]>([]);

  /*  const matriculas = aviones.map(
    (avion: { registrationId: string }) => avion.registrationId
  ); */

  const userByRole = async (email: string) => {
    setIsLoading(true);
    return axios
      .get(`/api/getUserByEmail/${email}`)
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        toast.error('Error User Search');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // let result = userByRole(userData?.email);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/instructor')
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Find your instructor to be on touch..."
        subtitle="All of them"
      />
      <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-white shadow-md mx-auto my-auto text-center">
        {instructors.map((usuario, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-md mx-auto my-auto items-center flex-col text-center "
          >
            <div className="font-bold mb-2">
              {usuario.name} {usuario.lastName}
            </div>
            <div className="text-gray-800">{usuario.role}</div>
            <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
              Contacto
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>All Instructors on One Click</p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={searchFlightInstructorModal.isOpen}
      title="SEARCH INSTRUCTOR"
      onClose={searchFlightInstructorModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SearchFlightInstructorModal;
