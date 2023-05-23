import MainInstructor from "./MainInstructor";
import ToasterProvider from "../providers/ToasterProvider";
import ProtectedRoute from "../components/AuxComponents/ProtectedRoute";

const Index = () => {
  return (
    //<ProtectedRoute allowedRoles={['INSTRUCTOR']}>
      <div>
        <ToasterProvider />
        <MainInstructor />
      </div>
    //</ProtectedRoute>
  );
};

export default Index;
