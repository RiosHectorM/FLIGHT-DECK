import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {
  AiFillSafetyCertificate,
  AiFillEdit,
  AiFillCloseCircle,
} from "react-icons/ai";

import { toast } from "react-hot-toast";
import axios from "axios";
import useRateInstructorModal from "../hooks/useRateInstructorModal";
import RateInstructorModal from "../components/Modals/InstHours/RateInstructorModal";
import useAddHoursModal from "../hooks/useAddHoursModal";
import AddHoursModal from "../components/Modals/AddHours/AddHoursModal";
import AddPlaneModal from "../components/Modals/AddPlane/AddPlaneModal";

const TableHoursPilot = () => {
  const [flight, setFlight] = useState();
  interface DatosEjemplo {
    folio: number;
    fecha: string;
    marca: string;
    clase: string;
    tipo: string;
    matricula: string;
    marcaMotor: string;
    hp: number;
    etapas: string;
    dobleComandoDia: string;
    soloNoche: string;
    instrSim: string;
    firmaInstructor: string;
    dia: string;
    nocheInstr: string;
    diaInstr: string;
    noche: string;
    instr: string;
    autonomo: string;
    tiempoTotal: number;
    escuelaEntrenamiento: string;
    copiloto: string;
  }

  useEffect(() => {
    const result = axios
      .get("http://localhost:3000/api/flight")
      .then((response) => {
        setFlight(response.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);
  console.log(flight);

  const datos: DatosEjemplo[] = [
    {
      folio: 1,
      fecha: "2022-04-25",
      marca: "Airbus",
      clase: "A380",
      tipo: "Comercial",
      matricula: "XA-ABC",
      marcaMotor: "Rolls Royce",
      hp: 500,
      etapas: "ARG-COL",
      dobleComandoDia: "10:00",
      soloNoche: "5:00",
      instrSim: "3:00",
      firmaInstructor: "Juan Pérez",
      dia: "8:00",
      nocheInstr: "4:00",
      diaInstr: "6:00",
      noche: "2:00",
      instr: "1:00",
      autonomo: "3:00",
      tiempoTotal: 30,
      escuelaEntrenamiento: "AviaSchool",
      copiloto: "6:00",
    },
    {
      folio: 1,
      fecha: "2022-04-25",
      marca: "Airbus",
      clase: "A380",
      tipo: "Comercial",
      matricula: "XA-ABC",
      marcaMotor: "Rolls Royce",
      hp: 500,
      etapas: "ARG-COL",
      dobleComandoDia: "10:00",
      soloNoche: "5:00",
      instrSim: "3:00",
      firmaInstructor: "Juan Pérez",
      dia: "8:00",
      nocheInstr: "4:00",
      diaInstr: "6:00",
      noche: "2:00",
      instr: "1:00",
      autonomo: "3:00",
      tiempoTotal: 30,
      escuelaEntrenamiento: "AviaSchool",
      copiloto: "6:00",
    },
    {
      folio: 1,
      fecha: "2022-04-25",
      marca: "Airbus",
      clase: "A380",
      tipo: "Comercial",
      matricula: "XA-ABC",
      marcaMotor: "Rolls Royce",
      hp: 500,
      etapas: "ARG-COL",
      dobleComandoDia: "10:00",
      soloNoche: "5:00",
      instrSim: "3:00",
      firmaInstructor: "Juan Pérez",
      dia: "8:00",
      nocheInstr: "4:00",
      diaInstr: "6:00",
      noche: "2:00",
      instr: "1:00",
      autonomo: "3:00",
      tiempoTotal: 30,
      escuelaEntrenamiento: "AviaSchool",
      copiloto: "6:00",
    },
  ];

  const rateInstructorModal = useRateInstructorModal();
  const addHoursModal = useAddHoursModal();

  const handleAddHours = () => {
    addHoursModal.onOpen();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <RateInstructorModal />
      <AddPlaneModal />
      <AddHoursModal />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 w-full">
        <Table className="table-auto w-full mx-auto bg-white shadow-md rounded my-6">
          <Thead className="w-full">
            <Tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <Th className="text-center border text-xs">FOLIO</Th>
              <Th className=" text-center border text-xs">FECHA</Th>
              <Th className=" text-center border text-xs">
                CARACTERISTICAS DEL AVION
              </Th>
              <Th className="text-center border text-xs">SIMULADOR</Th>
              <Th className="text-center border text-xs">AUTONOMO</Th>
              <Th className="text-center border text-xs">ETAPAS</Th>
              <Th className="text-center border text-xs">TIEMPO TOTAL</Th>
              <Th className="text-center border text-xs">COPILOTO</Th>
              <Th className="text-center border text-xs">AUTONOMO</Th>
              <Th className="text-center border text-xs">TIEMPO TOTAL</Th>
              <Th className="text-center border text-xs">FIRMA INST</Th>
            </Tr>
          </Thead>
          <Tbody className="w-full">
            {flight.map((dato, index) => (
              <Tr
                key={index}
                className="hover:bg-gray-100 border-b border-gray-200 py-10"
              >
                <Td className="text-center border text-xs text-gray-700">
                  {dato.folio}
                </Td>
                <Td className="text-center border text-xs">{dato.date}</Td>
                <Td className="text-center border text-xs">
                  {dato.aircraftId}
                  {dato.marca} {dato.clase} {dato.tipo} {dato.matricula}{" "}
                  {dato.marcaMotor} {dato.hp} HP
                </Td>
                <Td className="text-center border text-xs">{dato.instrSim}</Td>
                <Td className="text-center border text-xs">{dato.autonomo}</Td>
                <Td className="text-center border text-xs">{dato.stages}</Td>
                <Td className="text-center border text-xs">{dato.hourCount}</Td>
                <Td className="text-center border text-xs">
                  {dato.tiempoTotal}
                </Td>
                <Td className="text-center border text-xs">{dato.copiloto}</Td>
                <Td className="text-center border text-xs">{dato.autonomo}</Td>
                <Td className="text-center border text-xs">
                  {dato.tiempoTotal}
                </Td>
                <Td className="text-center border text-xs">
                  {dato.firmaInstructor}
                </Td>
                <Td className="text-center border text-2xl">
                  <AiFillEdit onClick={() => toast.success("Editar")} />
                </Td>
                <Td className="text-center border text-2xl">
                  <AiFillCloseCircle onClick={() => toast.error("Borrar")} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <div>
        <button className="flex mx-auto" onClick={handleAddHours}>
          ADD HOURS
        </button>
      </div>
    </div>
  );
};

export default TableHoursPilot;
