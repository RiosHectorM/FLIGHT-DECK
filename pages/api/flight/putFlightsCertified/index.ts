import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - PUT ------------------
  if (req.method === 'PUT') {
    console.log('HOLA ENTRÉ AL PUT');
    console.log(req.body);
    const { id, certified } = req.body;

    // Verify existence of required fields
    if (
      !id
      // !id ||
      // !userId ||
      // !date ||
      // !aircraftId ||
      // !stages ||
      // !flightType ||
      // !hourCount
    ) {
      return res.status(400).json({ message: 'Required field missing' });
    }

    try {
      const flight = await prisma.flight.update({
        where: { id },
        data: {
          certified,
        },
      });
      return res.status(201).json(flight);
    } catch (error) {
      // Handle flight creation error
      console.error(error);
      return res.status(500).json({ message: `Error updating flight` });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
