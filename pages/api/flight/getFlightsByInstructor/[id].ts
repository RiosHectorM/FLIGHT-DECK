import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';
import { ObjectId } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // - GET Flights by InstructorId ------------------
  // Get the instructor ID from the request parameters
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ message: 'Instructor ID is required' });
  }
  const instructorId = new ObjectId(id as string).toString();

  if (req.method === 'GET') {
    try {

      // Use the Prisma Client to fetch the flights
      const flights = await prisma.flight.findMany({
        where: {
          certifierId: instructorId,
          certified: false
      },
      });

    res.json(flights);

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