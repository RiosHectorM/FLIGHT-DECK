import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  // - GET Instructors------------------
  if (req.method === 'GET') {

    try {
      // Use the Prisma Client to fetch all flights into an array
      const allFlights = await prisma.flight.findMany();

      // If there are no flights, return a 404 error
      if (!allFlights) {
        return res.status(404).json({ message: 'No flights found' });
      }

      // If the flight exists, return it as a JSON response
      res.json(allFlights);
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
