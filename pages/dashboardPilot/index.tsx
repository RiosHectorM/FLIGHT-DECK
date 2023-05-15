import MainPiloto from "./MainPiloto";
import ProtectedRoute from "../components/AuxComponents/ProtectedRoute";

const Index = () => {
  return (
    <ProtectedRoute allowedRoles={["PILOT"]}>
      <div>
        <MainPiloto />
      </div>
    </ProtectedRoute>
  );
};

export default Index;
