import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // LEO: TO-DO


    // - GET Pilot's total hours flighted, by userId ------------------
    const { userId } = req.query as { userId: string };
    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    if (req.method === 'GET') {
        try {
            // TOTAL HOURS. Calculate the sum of hourCount for the flights of the userId
            const totalHours = await prisma.flight.aggregate({
                _sum: { hourCount: true },
                where: { userId },
            });

            // HOURS TO CERTIFY: Calculate the sum of flight's hourCount where 'certified' is false and 'certifierId' is not null
            const toCertifyHours = await prisma.flight.aggregate({
                _sum: { hourCount: true },
                where: {
                  userId,
                  certified: false,
                  certifierId: { not: null },
                },
              });

            // CERTIFIED HOURS: Calculate the sum of flight's hourCount where 'certified' is true
            const CertifiedHours = await prisma.flight.aggregate({
                _sum: { hourCount: true },
                where: {
                  userId,
                  certified: true,
                },
              });

            return res.status(200).json({ 
                totalHours: (totalHours._sum?.hourCount || 0),
                toCertifyHours: (toCertifyHours._sum?.hourCount || 0),
                CertifiedHours: (CertifiedHours._sum?.hourCount || 0),
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