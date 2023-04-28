import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';
import { ObjectId } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // - GET by Id ------------------
  // Get the flight ID from the request parameters
  const { fid } = req.query
  if (!fid) {
    return res.status(400).json({ message: 'Flight ID is required' });
  }
  const flightId = new ObjectId(fid as string).toString();

  if (req.method === 'GET') {
    try {

      // Use the Prisma Client to fetch the flight data
      const flight = await prisma.flight.findUnique({
        where: { id: flightId },
      });

      // If the flight does not exist, return a 404 error
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }

      // If the flight exists, return it as a JSON response
      res.json(flight);

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