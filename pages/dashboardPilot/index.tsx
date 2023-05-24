import MainPiloto from "./MainPiloto";
import ProtectedRoute from "../components/AuxComponents/ProtectedRoute";

const Index = () => {
  return (
    //<ProtectedRoute allowedRoles={["PILOT"]}>
        <MainPiloto />
    //</ProtectedRoute>
  );
};

export default Index;
