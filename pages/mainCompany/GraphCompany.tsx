import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/userStore";
import Loader from "../components/Loader";
import StatsCompany from "../components/AuxComponents/Stats/StatsCompany";

const GraphCompany: FC = () => {
  const { data } = useSession();

  const { user, fetchUserByEmail } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (data?.user?.email) {
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
          <div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="bg-white bg-opacity-70 rounded-lg shadow-lg px-6 pt-6 pb-14 w-11/12  md:w-4/5 justify-center">
                <h2 className="text-xl font-bold mb-10 w-full text-center">
                  YOUR STATISTICS
                </h2>
                <div className="mt-6 mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                  <StatsCompany />
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

export default GraphCompany;
