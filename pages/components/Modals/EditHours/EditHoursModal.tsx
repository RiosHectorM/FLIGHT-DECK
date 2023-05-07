"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Heading from "../../AuxComponents/ModalsGenerator/Heading";

import useEditHoursModal from "@/pages/hooks/useEditHoursModal";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../AuxComponents/ModalsGenerator/Modal";
import { toast } from "react-hot-toast";
import useAddPlaneModal from "@/pages/hooks/useAddPlaneModal";
import { useSession } from "next-auth/react";
import Loader from "../../Loader";
import { sendContactForm } from "@/lib/api";
import { getDate } from "date-fns/esm";
import { getMonth } from "date-fns";

const EditHoursModal = ({ selectedFlight, getFlights, id }) => {
  console.log("selectedFlight: ", selectedFlight);
  
  const { data } = useSession();
  const userData = data?.user;

  const editHoursModal = useEditHoursModal();
  // const addPlaneModal = useAddPlaneModal();

  const [isLoading, setIsLoading] = useState(false);

  enum TypeHours {
    "Simulador" = "Simulador",
    "Escuela" = "Escuela",
    "Copiloto" = "Copiloto",
    "Autonomo" = "Autonomo",
  }

  const [aviones, setAviones] = useState([]);

  const [formattedDate, setFormattedDate] = useState();

  // const [folio, setFolio] = useState();

  const matriculas = aviones.map(
    (avion: { registrationId: string }) => avion.registrationId
  );

  useEffect(() => {
    async function getRegisteredID() {
      return await axios
        .get(`http://localhost:3000/api/plane`)
        .then((response) => response.data);
      // .then((data) => matriculas=data.map((avion: { registrationId: string; })=>avion.registrationId))
    }
    const airplanes = getRegisteredID();
    airplanes.then((data) => setAviones(data));
  }, [matriculas]);

  // Format flight date
  useEffect(() => {
    if (selectedFlight?.date) {
      // const formattedDate = selectedFlight?.date.getDate() + '-' + selectedFlight?.date.getMonth() + '-' + selectedFlight?.date.getFullYear();
      const parseDateString = (dateString: string): Date => {
        return new Date(dateString);
      };
      const date1 = parseDateString(selectedFlight?.date);
      const date2 = date1?.toISOString().split("T")[0];
      setFormattedDate(date2)
      console.log("AAAAAAAAAAA:", date2);
    }
  }, [selectedFlight]);

  useEffect(() => {
    reset();
    // setFolio(selectedFlight?.folio);
    
    console.log("STATE FOLIO: ", selectedFlight?.folio);
  }, [selectedFlight])

  const schema = yup
    .object({
      folio: yup
        .number()
        .positive("Debe ser positivo")
        .integer("Debe ser entero")
        .required()
        .typeError("Debe ser un número"),
      //userId: yup.string().required(),
      date: yup.string().required("Fecha es un campo obligatorio"),

      // aircraftId: yup
      //   .mixed()
      //   .oneOf(Object.values(matriculas), 'Avión no registrado (ej A003)'),
      stages: yup.string().required("Debe ingresar las etapas"),
      remarks: yup.string(),
      flightType: yup
        .mixed()
        .oneOf(Object.values(TypeHours), "Debe ser un tipo definido"),
      hourCount: yup
        .number()
        .positive("Debe ser positivo")
        .typeError("Debe ser un número. La coma es el punto"),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const aircraftId = watch("aircraftId");

  const userByRole = async (email: string) => {
    setIsLoading(true);
    return axios
      .get(`/api/getUserByEmail/${email}`)
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        toast.error("Error User Search");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    reset();

    const values = {
      name: "Flight Deck App",
      email: "flightdeck2023@gmail.com",
      subject: "New flight created",
      message: "You have created a new flight in Flight Deck App",
    };

    let result = userByRole(userData?.email);
    result.then(async (user) => {
      await axios
        .put(`http://localhost:3000/api/flight`, { ...data, id: selectedFlight.id, userId: user.id })
        .then(() => {
          toast.success("Saved");
          editHoursModal.onClose();
          getFlights(id);
        })
        .then(
          // Nodemailer: send mail
          await sendContactForm(values)
        )

        .catch(() => toast.error("Error Save Data"))
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  const openRegisterAirplane: () => void = () => {
    addPlaneModal.onOpen();
    editHoursModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {isLoading && <Loader />}
      <Heading
        title="Edit your Flight Hours in your LogBook"
        subtitle="Fill all fields"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder= " "
              defaultValue={selectedFlight?.folio}
              required
              {...register("folio")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Folio:{" "}
            </label>
            <p className="text-red-600">{errors.folio?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={formattedDate}
              required
              {...register("date")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Fecha:{" "}
            </label>
            <p className="text-red-600">{errors.date?.message}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={selectedFlight?.aircraftId}
              required
              {...register("aircraftId")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Matricula:{" "}
            </label>
            <p className="text-red-600">{errors.aircraftId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group flex justify-center">
            {!matriculas.includes(aircraftId) && (
              <button onClick={openRegisterAirplane}>Register Airplane</button>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <div className="flex justify-between">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={selectedFlight?.stages}
              required
              {...register("stages")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Etapas:
            </label>
          </div>
          <p className="text-red-600">{errors.stages?.message}</p>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <textarea
            rows={2}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            defaultValue={selectedFlight?.remarks}
            {...register("remarks")}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Observaciones:
          </label>
          <p className="text-red-600">{errors.remarks?.message}</p>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <select
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={selectedFlight?.flightType}
              {...register("flightType")}
            >
              <option value="Simulador">Simulador</option>
              <option value="Escuela">Escuela</option>
              <option value="Copiloto">Copiloto</option>
              <option value="Autónomo">Autónomo</option>
            </select>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tipo de Horas:
            </label>
            <p className="text-red-600">{errors.flightType?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={selectedFlight?.hourCount}
              required
              {...register("hourCount")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Horas a Cargar:{" "}
            </label>
            <p className="text-red-600">{errors.hourCount?.message}</p>
          </div>
        </div>
        <button>SEND</button>
      </form>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Add a Flight record to your Database to record your Flight Hours</p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editHoursModal.isOpen}
      title="UPDATE FLIGHT"
      onClose={editHoursModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default EditHoursModal;