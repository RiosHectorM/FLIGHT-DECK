import { FC, useEffect, useState } from "react";
import FormPhoto from "./form/formphoto";
import FromInstructor from "./form/forminstructor";
import FormPassword from "./form/formpassword";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/userStore";
import ToasterProvider from "../providers/ToasterProvider";
import FormCertificates from "./form/formCertificates";
import Loader from "../components/Loader";
import StatsInstructor from "../components/AuxComponents/Stats/StatsInstructor";

const GraphInstructor: FC = () => {
  const { data } = useSession();

  const { user, fetchUserByEmail } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  // const [showFormInstructor, setShowFormInstructor] = useState(false);
  // const [showFormPassword, setShowFormPassword] = useState(false);
  // const [showCertificates, setShowCertificates] = useState(false);
  // const [showInfo, setShowInfo] = useState(true);


  // const handleFormInstructor = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   event.preventDefault();
  //   setShowInfo(false);
  //   setShowFormInstructor(true);
  // };

  // const handleFormPassword = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   event.preventDefault();
  //   setShowInfo(false);
  //   setShowFormPassword(true);
  // };

  // const handleCertifications = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   event.preventDefault();
  //   setShowInfo(false);
  //   setShowCertificates(true);
  // };

  useEffect(() => {
    setIsLoading(true);
    if (data?.user?.email) {
      console.log(data.user.email);
      const email = data.user.email;
      fetchUserByEmail(email);
    }
    setIsLoading(false);
  }, [data]);

  return (
    <div
      className="min-h-screen bg-gray-100 w-full"
      style={{
        backgroundImage: "url('/images/DASHCOMPANY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isLoading && <Loader />}
      {user?.id && (
        <main>
          <ToasterProvider />
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="bg-white bg-opacity-70 rounded-lg shadow-lg px-6 pt-6 pb-14 w-11/12  md:w-4/5 justify-center">
                <h2 className="text-xl font-bold mb-10 w-full text-center">
                  YOUR STATISTICS
                </h2>
                <div className="mt-6 mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                  <StatsInstructor userId={user.id} />
                </div>

              </div>
            </div>
          </div>
        </main>
      )
      }
    </div>
  );
};

export default GraphInstructor;
