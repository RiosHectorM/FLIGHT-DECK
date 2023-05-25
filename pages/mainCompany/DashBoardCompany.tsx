import { FC, useEffect, useState } from "react";
import FormPhoto from "../mainInstructor/form/formphoto";
import FormCompany from "./form/FormularioCompany";
import FormPassword from "../mainInstructor/form/formpassword";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/userStore";
//import ProtectedRoute from '../components/AuxComponents/ProtectedRoute';
import ToasterProvider from "../providers/ToasterProvider";
import StatsInstructor from "../components/AuxComponents/Stats/StatsInstructor";
import StatsCompany from "../components/AuxComponents/Stats/StatsCompany";

const DashboardCompany: FC = () => {
  const { data } = useSession();

  const { user, fetchUserByEmail } = useUserStore();

  const [showFormInstructor, setShowFormInstructor] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [showCertificates, setShowCertificates] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const handleFormInstructor = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowInfo(false);
    setShowFormInstructor(true);
  };

  const handleFormPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowInfo(false);
    setShowFormPassword(true);
  };

  const handleCertifications = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowInfo(false);
    setShowCertificates(true);
  };

  useEffect(() => {
    if (data?.user?.email) {
      console.log(data.user.email);
      const email = data.user.email;
      fetchUserByEmail(email);
    }
  }, [data]);

  return (
    //<ProtectedRoute allowedRoles={['INSTRUCTOR']}>
    <div
      className="min-h-screen bg-gray-100 w-full"
      style={{
        backgroundImage: "url('/images/DASHCOMPANY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {user?.id && (
        <main>
          <ToasterProvider />
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-11/12  md:w-4/5 justify-center">
                <h2 className="text-xl font-bold mb-10 w-full text-center">INSTRUCTOR INFORMATION</h2>
                <div className="flex flex-col lg:flex-row gap-4 max-w-full items-center ">
                  <div className="flex flex-col lg:flex-row w-full">
                    <div className="mx-auto h-auto mb-10 max-w-4/5 lg:max-w-4/5">
                      <FormPhoto />
                    </div>
                    {showInfo && (
                      <div
                        className="flex flex-col text-xl text-center lg:text-left"
                        style={{
                          color: "#1a1a1a", // flightdeck-dark
                        }}
                      >
                        <p className="font-bold text-2xl">{user.name}</p>
                        <p className="font-bold text-2xl">{user.lastName}</p>
                        <p className="font-semibold italic mb-2 mt-6">{user.email}</p>
                        <p className="font-semibold italic mb-2 mt-6 flex">
                          <p className="font-normal mr-2 not-italic">Nacionality: </p>
                          {user.nationality}
                        </p>
                        {/* <p className='font-semibold italic mb-2 mt-2 flex'>
                          <p className='font-normal mr-2 not-italic'>
                            City:{' '}
                          </p>{' '}
                          {user.city}
                        </p> */}
                        <p className="font-semibold italic mb-2 mt-2 flex">
                          <p className="font-normal mr-2 not-italic">Address: </p>
                          {user.address}
                        </p>
                        <p className="font-semibold italic mb-2 mt-2 flex">
                          <p className="font-normal mr-2 not-italic">Phone: </p>
                          {user.phoneNumber}
                        </p>
                        <button
                          className="font-sans bg-gray-800 text-white my-4 rounded-md py-2 hover:bg-gray-400 hover:text-black hover:font-bold hover:border hover:border-black"
                          onClick={handleFormInstructor}
                          style={{
                            backgroundColor: "#1a1a1a", // flightdeck-dark
                            color: "#e5d9b6", // flightdeck-cream
                          }}
                        >
                          Edit Information
                        </button>
                        <button
                          className="font-sans bg-gray-800 text-white mb-4 rounded-md py-2 hover:bg-gray-400 hover:text-black hover:font-bold hover:border hover:border-black"
                          onClick={handleFormPassword}
                          style={{
                            backgroundColor: "#1a1a1a", // flightdeck-dark
                            color: "#e5d9b6", // flightdeck-cream
                          }}
                        >
                          Change Password
                        </button>
                      </div>
                    )}
                  </div>
                  {showFormInstructor && (
                    <div className="mx-auto h-auto mb-10 w-full lg:w-4/5">
                      <FormCompany setShowInfo={setShowInfo} setShowFormInstructor={setShowFormInstructor} />
                    </div>
                  )}
                  {showFormPassword && (
                    <div className="mx-auto h-auto mb-10 w-full lg:w-4/5">
                      <FormPassword setShowInfo={setShowInfo} setShowFormPassword={setShowFormPassword} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Statistics Charts */}
            <div className="mt-6 mx-auto max-w-full px-4 sm:px-6 lg:px-8">
              <StatsCompany />
            </div>
          </div>
        </main>
      )}
    </div>

    //</ProtectedRoute>
  );
};

export default DashboardCompany;
