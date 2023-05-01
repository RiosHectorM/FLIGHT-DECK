import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';


type Filters = {
  date?: string;
  aircraftId?: string;
  folio?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  // - GET Filtered Flights------------------
  if (req.method === 'GET') {

    try {
      const { date, aircraftId, folio }: Filters = req.body;

      const filters = {
        date: date ? new Date(date) : undefined,
        aircraftId: aircraftId ? aircraftId : undefined,
        folio: folio ? parseInt(folio, 10) : undefined,
      };

      // Use the Prisma Client to fetch all flights according to received filters
      const flights = await prisma.flight.findMany({
        where: {
          ...filters,
        },
        include: {
          user: true,
        },
      });

      res.status(200).json({ flights });
    }
    catch (error) {
      return res.status(500).json({ error });
    }
    finally {
      await prisma.$disconnect();
    }
  }

  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}