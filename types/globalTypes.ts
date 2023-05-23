export interface FlightData {
  id?: string | undefined;
  folio?: string | undefined;
  date?: string | undefined;
  marca?: string;
  clase?: string;
  tipo?: string;
  aircraftId?: string;
  matricula?: string;
  marcaMotor?: string;
  flightType?: string; // Modificar el tipo de flightType
  hp?: number;
  stages?: string;
  dobleComandoDia?: string;
  soloNoche?: string;
  instrSim?: string;
  firmaInstructor?: string;
  dia?: string;
  nocheInstr?: string;
  diaInstr?: string;
  noche?: string;
  instr?: string;
  autonomo?: string;
  hourCount?: number | undefined;
  tiempoTotal?: number;
  escuelaEntrenamiento?: string;
  copiloto?: string;
  remarks?: string;
  certifier?: {
    name?: string;
    lastName?: string;
  };
  certified?: boolean;
  nightHours: number;
  dayHours: number;
  instHours: number;
}

export interface CertificationType {
  id: string;
  userId: string;
  certificateName: string;
  certificateDescription: string;
  certificateExpirationDate: string;
  certificateImageUrl: string;
}

export type Request = {
  id: string;
  date: string;
  user: { name: string; lastName: string; email: string };
  hourCount: number;
  remarks: string;
  stages: string;
  certifierID: string;
};

export type Qualification = {
  id: string;
  pilotId: string;
  pilotName?: string;
  pilotImage?: string;
  instructorId: string;
  qualificationNum?: number;
  comment?: string;
};