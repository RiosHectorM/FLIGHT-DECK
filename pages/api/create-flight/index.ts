import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId, date, aircraftId, stages, flightType, hourCount, folio, remarks } = req.body;

    // Verify existence of required fields
    if (!userId || !date || !aircraftId || !stages || !flightType || !hourCount) {
      return res.status(400).json({ message: 'Required field missing' });
    }

    try {
      const flight = await prisma.flight.create({
        data: {
          userId,
          date,
          aircraftId,
          stages,
          flightType,
          hourCount,
          folio,
          remarks,
        },
      });
      return res.status(201).json(flight);
    } catch (error) {
      // Handle flight creation error
      console.error(error);
      return res.status(500).json({ message: `Error creating flight` });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
