import ToasterProvider from "../providers/ToasterProvider";
import TableHoursPilot from "./TableHours";
import ProtectedRoute from "../components/AuxComponents/ProtectedRoute";

const index = () => {
  return (
    <ProtectedRoute allowedRoles={['PILOT']}>
      <div
        className="flex flex-col min-h-screen"
        style={{
          backgroundImage: "url('/images/mainpiloto.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ToasterProvider />
        <TableHoursPilot />
      </div>
    </ProtectedRoute>
  );
};

export default index;
