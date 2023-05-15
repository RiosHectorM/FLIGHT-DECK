import MainCompanyPage from "./MainCompanyPage";
import ProtectedRoute from "../components/AuxComponents/ProtectedRoute";

export default function index() {
  return (
    <div>
      <ProtectedRoute allowedRoles={['COMPANY']}>
        <MainCompanyPage />
      </ProtectedRoute>
    </div>
  );
}
