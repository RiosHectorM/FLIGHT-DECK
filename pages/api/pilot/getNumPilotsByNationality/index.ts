import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET Pilots grouped by nationality ------------------
  if (req.method === 'GET') {
    try {
      const result = await prisma.user.groupBy({
        by: ['nationality'],
        where: {
          role: 'PILOT',
        },
        _count: { id: true },
      });

      // Format result
      const pilotsByNationality = result.map((elem) => {
        return {
          nationality: elem.nationality,
          count: elem._count.id,
        }
      })

      res.status(200).json(pilotsByNationality);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}