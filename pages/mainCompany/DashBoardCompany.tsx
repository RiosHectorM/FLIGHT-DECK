import Head from "next/head";
import Main from "./Main";
import PilotList from "./PilotList";
import React, { useEffect, useState } from "react";
import FormPassword from "./form/formpassword";
import { FormPhoto } from "./form/formphoto";
import FormCompany from "./form/formcompany";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/userStore";
import ProtectedRoute from "../components/AuxComponents/ProtectedRoute";

const DashboardCompany = () => {
  const { data } = useSession();

  const { user, fetchUserByEmail } = useUserStore();

  useEffect(() => {
    if (data?.user?.email) {
      console.log(data.user.email);
      const email = data.user.email;
      fetchUserByEmail(email);
    }
  }, [data]);

  const [showPilots, setShowPilots] = useState(false);

  const handleTogglePilots = () => {
    setShowPilots(!showPilots);
  };

  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <div
        className="min-h-screen items-center justify-center p-8"
        style={{
          backgroundImage: "url('/images/DASHCOMPANY.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="My Company Dashboard" />
          <meta name="keywords" content="dashboard, company" />
          <meta name="author" content="My Company" />
          <title>Dashboard - My Company</title>
        </Head>
        {user?.id && (
          <div className="flex justify-center">
            <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-6 flex flex-wrap flex-row">
              <h2 className="text-xl font-bold mb-10 w-full">
                Actualizar perfil de la compañía
              </h2>
              <div className="mx-auto w-1/4">
                <FormPhoto />
              </div>
              <div className="mx-auto w-1/3">
                <FormCompany />
              </div>
              <div className="mx-auto w-1/3">
                <FormPassword />
              </div>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold leading-tight text-white mt-5">
          Dashboard
        </h1>
        <button
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          onClick={handleTogglePilots}
        >
          {showPilots ? "Ocultar pilotos" : "Ver pilotos registrados"}
        </button>
        {showPilots && <PilotList />}
        <Main />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardCompany;
