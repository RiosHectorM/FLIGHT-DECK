import MainCompanyPage from './MainCompanyPage';
import ProtectedRoute from '../components/AuxComponents/ProtectedRoute';
import ToasterProvider from '../providers/ToasterProvider';

export default function index() {
  return (
    <div>
      {/* //<ProtectedRoute allowedRoles={['COMPANY']}> */}
      <ToasterProvider />
      <MainCompanyPage />
      {/* //</ProtectedRoute> */}
    </div>
  );
}
