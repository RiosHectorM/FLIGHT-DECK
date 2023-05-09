import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';
import { ObjectId } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // - GET Flights by UserId ------------------
  // Get the user ID from the request parameters
  const { certifier } = req.query 
  if (!certifier) {
    return res.status(400).json({ message: 'Certifier is required' });
  }
  //const userId = new ObjectId(id as string).toString();
  const certifierId = new ObjectId(certifier as string).toString();
  if (req.method === 'GET') {
    try {

      // Use the Prisma Client to fetch the flights
      const flights = await prisma.flight.findMany({
        where: { certifierId: certifierId,
        certified:false},
        include: { certifier: true, user:true },
  
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