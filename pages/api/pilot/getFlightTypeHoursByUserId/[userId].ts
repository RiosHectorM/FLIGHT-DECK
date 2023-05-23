import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // - GET Pilot's hours (grouped by FlightType) by userId ------------------  
    if (req.method === 'GET') {
        try {
            const { userId } = req.query as { userId: string };
            if (!userId) {
                return res.status(400).json({ message: 'userId is required' });
            }

            // INSTRUCTOR HOURS. Calculate the sum of hourCount for the flights of the userId where FlightType='Escuela'
            const InstructorHours = await prisma.flight.aggregate({
                _sum: { hourCount: true },
                where: {
                    userId,
                    flightType: 'Escuela'
                },
            });
            
            // SIMULATOR HOURS. Calculate the sum of hourCount for the flights of the userId where FlightType='Simulador'
            const SimulatorHours = await prisma.flight.aggregate({
                _sum: { hourCount: true },
                where: {
                    userId,
                    flightType: 'Simulador'
                },
              });
            
            // COPILOT HOURS. Calculate the sum of hourCount for the flights of the userId where FlightType='Copiloto'
            const CopilotHours = await prisma.flight.aggregate({
                _sum: { hourCount: true },
                where: {
                    userId,
                    flightType: 'Copiloto'
                },
              });
            
            // PILOT HOURS. Calculate the sum of hourCount for the flights of the userId where FlightType='Autonomo'
            const PilotHours = await prisma.flight.aggregate({
                _sum: { hourCount: true },
                where: {
                    userId,
                    flightType: 'Autonomo'
                },
              });


            return res.status(200).json({
                InstructorHours: (InstructorHours._sum?.hourCount || 0),
                SimulatorHours: (SimulatorHours._sum?.hourCount || 0),
                CopilotHours: (CopilotHours._sum?.hourCount || 0),
                PilotHours: (PilotHours._sum?.hourCount || 0),
            });

        }
        catch (error) {
            console.error(error);
            const errorMessage = error as string;
            return res.status(500).json({ message: `Error getting hours: ${errorMessage}` });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}