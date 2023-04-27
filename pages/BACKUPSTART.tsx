import { Rubik } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/LoguinRegister/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Modals/LoguinRegister/LoginModal';
import ApproveModal from './components/Modals/InstHours/ApproveModal';

import { useSession } from 'next-auth/react';
import Button from './components/AuxComponents/Button';

import { FiAlertTriangle } from 'react-icons/fi';
import useApproveModal from './hooks/useApproveModal';
import RateInstructorModal from './components/Modals/InstHours/RateInstructorModal';
import useRateInstructorModal from './hooks/useRateInstructorModal';
import FiltersBar from './components/FiltersPiloto';

const font = Rubik({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const { data } = useSession();
  const currentUser = data?.user;
  const approveModal = useApproveModal();
  const rateInstructorModal = useRateInstructorModal();
  return (
    <main className={font.className}>
      <ToasterProvider />
      <ApproveModal />
      <RateInstructorModal />
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} />
      <div className='relative top-32'>
        <Button
          label='Aprobar horas'
          icon={FiAlertTriangle}
          onClick={() => approveModal.onOpen()}
        />
      </div>
      <div className='relative top-40'>
        <Button
          label='Calificar Instructor'
          icon={FiAlertTriangle}
          onClick={() => rateInstructorModal.onOpen()}
        />
      </div>
      <FiltersBar />
    </main>
  );
}
