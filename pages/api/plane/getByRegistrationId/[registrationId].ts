import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // - GET Plane by registrationId (matrícula) ------------------

  // Get the plane registrationId from the request parameters
  const { registrationId } = req.query
  if (!registrationId) {
    return res.status(400).json({ message: 'Airplane registration ID is required' });
  }

  if (req.method === 'GET') {

    try {
      // Get the plane registration ID from the request parameters
      const { registrationId } = req.query
      if (!registrationId) {
        return res.status(400).json({ message: 'Airplane registration ID is required' });
      }

      // Use the Prisma Client to fetch a plane by registrationId
      const plane = await prisma.airplane.findUnique({
        where: {
          registrationId: registrationId as string
        }
      });

      // If there is no airplane with that registrationId, return a 404 error
      if (!plane) {
        return res.status(404).json({ message: 'No planes with that registration ID found' });
      }

      // If an airplane exists, return it in a JSON response
      res.json(plane);
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