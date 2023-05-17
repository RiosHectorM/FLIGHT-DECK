import ToasterProvider from '../providers/ToasterProvider';
import TableHoursPilot from './TableHours';
import ProtectedRoute from '../components/AuxComponents/ProtectedRoute';
import PilotFolioViewer from './PilotFolioViewer';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import { FlightData } from '@/types/globalTypes';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();
  const [flight, setFlight] = useState<FlightData[]>([]);

  const [showTableHours, setShowTableHours] = useState<boolean>(false);
  const [folio, setFolio] = useState<string | number | null>(null);

  return (
    <ProtectedRoute allowedRoles={['PILOT']}>
      <div
        className='flex flex-col min-h-screen'
        style={{
          backgroundImage: "url('/images/mainpiloto.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <ToasterProvider />
        {!showTableHours && (
          <PilotFolioViewer
            setFolio={setFolio}
            setShowTableHours={setShowTableHours}
          />
        )}
        {showTableHours && (
          <TableHoursPilot
            selectedFolio={folio}
            setShowTableHours={setShowTableHours}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Index;
