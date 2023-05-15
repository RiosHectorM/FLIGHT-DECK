import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET Pilots ordered by total hours flighted ------------------
  const { numPilots } = req.query;
  if (!numPilots) {
    return res.status(400).json({ message: 'numPilots is required' });
  }

  if (req.method === 'GET') {
    try {
      const flightsGroupedByPilot = await prisma.flight.groupBy({
        by: ['userId'],
        _sum: {
          hourCount: true,
        },
        orderBy: [
          {
            _sum: {
              hourCount: 'desc',
            },
          },
        ],
        take: +numPilots,
      });

      res.status(200).json(flightsGroupedByPilot);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
    finally {
      await prisma.$disconnect();
    }
  }
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}