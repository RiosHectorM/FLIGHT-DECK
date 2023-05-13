// import create from 'zustand';
// import axios from 'axios';

// type User = {
//   id: string;
//   name: string;
//   lastName: string;
//   role: string;
//   email: string;
//   emailVerified: string;
//   image: string;
//   hashedPassword: string;
//   phoneNumber: string;
//   address: string;
//   city: string;
//   nationality: string;
//   flights: Flight[];
// };

// type Flight = {
//   userId: string;
//   date: string;
//   folio: number;
//   marca: string;
//   clase: string;
//   tipo: string;
//   aircraftId: string;
//   matricula: string;
//   marcaMotor: string;
//   flightType: string;
//   hp: number;
//   stages: string;
//   dobleComandoDia: string;
//   soloNoche: string;
//   instrSim: string;
//   firmaInstructor: string;
//   dia: string;
//   nocheInstr: string;
//   diaInstr: string;
//   noche: string;
//   instr: string;
//   autonomo: string;
//   hourCount: number;
//   tiempoTotal: number;
//   escuelaEntrenamiento: string;
//   copiloto: string;
//   remarks: string;
// };

// type UserStore = {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   fetchUserByEmail: (email: string) => Promise<void>;
// };

// export const useUserStore = create<UserStore>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
//   fetchUserByEmail: async (email) => {
//     try {
//       const response = await axios.get(`/api/getUserByEmail/${email}`);
//       const { user } = response.data;

//       try {
//         const flightsResponse = await axios.get(
//           `/api/flight/getFilteredFlights?userId=${user.id}`
//         );
//         const { flights } = flightsResponse.data;
//         set((state) => ({
//           user: { ...state.user, ...user, flights },
//         }));
//       } catch (error) {
//         console.error('Error fetching flights:', error);
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     }
//   },
// }));

import { create } from 'zustand';
import axios from 'axios';

type Flight = {
  userId: string;
  date: string;
  folio: number;
  marca: string;
  clase: string;
  tipo: string;
  aircraftId: string;
  matricula: string;
  marcaMotor: string;
  flightType: string;
  hp: number;
  stages: string;
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
  hourCount: number;
  tiempoTotal: number;
  escuelaEntrenamiento: string;
  copiloto: string;
  remarks: string;
};

type FlightStore = {
  flights: Flight[];
  fetchFlightsByUserId: (userId: string) => void;
};

export const useFlightStore = create<FlightStore>((set) => ({
  flights: [],
  fetchFlightsByUserId: async (userId) => {
    try {
      const response = await axios.get(
        `/api/flight/getFilteredFlights?userId=${userId}`
      );
      set({ flights: response.data });
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  },
}));
