import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // - GET Pilot's hours grouped by flight condition (day, night, instruments) by userId ------------------  
    if (req.method === 'GET') {
        try {
            const { userId } = req.query as { userId: string };
            if (!userId) {
                return res.status(400).json({ message: 'userId is required' });
            }
            
            // DAY HOURS. Calculate the sum of dayHours for the flights of the userId
            const dayHours = await prisma.flight.aggregate({
                _sum: { dayHours: true },
                where: {
                    userId,
                },
            });

            // NIGHT HOURS. Calculate the sum of nightHours for the flights of the userId
            const nightHours = await prisma.flight.aggregate({
                _sum: { nightHours: true },
                where: {
                    userId,
                },
            });

            // INSTRUMENT HOURS. Calculate the sum of instHours for the flights of the userId
            const instHours = await prisma.flight.aggregate({
                _sum: { instHours: true },
                where: {
                    userId,
                },
            });


            return res.status(200).json({
                dayHours: (dayHours._sum?.dayHours || 0),
                nightHours: (nightHours._sum?.nightHours || 0),
                InstrumentsHours: (instHours._sum?.instHours || 0),
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