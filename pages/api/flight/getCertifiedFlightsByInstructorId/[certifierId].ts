import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET Certified Flights by InstructorId (certifierId field of flight) ------------------
  // Get the certifier ID from the request parameters
  const { certifierId } = req.query;
  if (!certifierId) {
    return res
      .status(400)
      .json({ message: 'Certifier Instructor ID is required' });
  }
  // const instructorId = new ObjectId(certifierId as string).toString();

  if (req.method === 'GET') {
    try {
      // Use the Prisma Client to fetch the flights
      const flights = await prisma.flight.findMany({
        where: {
          certifierId: certifierId as string,
          certified: true,
        },
        include: {
          certifier: true,
          user: true,
        },
      });

      res.json(flights);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
