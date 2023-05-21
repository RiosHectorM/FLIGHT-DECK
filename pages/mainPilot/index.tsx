import ToasterProvider from '../providers/ToasterProvider';
import TableHoursPilot from './TableHours';
import ProtectedRoute from '../components/AuxComponents/ProtectedRoute';
import PilotFolioViewer from './PilotFolioViewer';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import Loader from '../components/Loader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { fetchUserByEmail } = useUserStore();

  const [showTableHours, setShowTableHours] = useState<boolean>(false);
  const [folio, setFolio] = useState<string | number | undefined>(undefined);
  const [buttonDisabledII, setButtonDisabled] = useState<boolean>();

  const buttonDisabled = (valor: boolean) => {
    setButtonDisabled(valor);
  };

  useEffect(() => {
    if (session?.user?.email) {
      setIsLoading(true);
      const email = session.user.email;
      fetchUserByEmail(email);
      setIsLoading(false);
    }
  }, [session, fetchUserByEmail]);

  return (
    //<ProtectedRoute allowedRoles={['PILOT']}>
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/images/mainpiloto.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {isLoading && <Loader />}
      <ToasterProvider />
      {!showTableHours && (
        <PilotFolioViewer
          setFolio={setFolio}
          setShowTableHours={setShowTableHours}
          setIsLoading={setIsLoading}
          buttonDisabled={buttonDisabled}
        />
      )}
      {showTableHours && (
        <TableHoursPilot
          selectedFolio={folio as string}
          setShowTableHours={setShowTableHours}
          buttonDisabledII={buttonDisabledII as boolean}
        />
      )}
    </div>
    // </ProtectedRoute>
  );
};

export default Index;
