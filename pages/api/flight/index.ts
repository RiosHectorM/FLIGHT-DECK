import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - POST ------------------
  if (req.method === 'POST') {
    console.log(req.body);
    const {
      userId,
      date,
      aircraftId,
      stages,
      flightType,
      hourCount,
      folio,
      remarks,
    } = req.body;

    // Verify existence of required fields
    if (
      !userId ||
      !date ||
      !aircraftId ||
      !stages ||
      !flightType ||
      !hourCount
    ) {
      return res.status(400).json({ message: 'Required field missing' });
    }

    try {
      const flight = await prisma.flight.create({
        data: {
          userId,
          date: date + 'T00:00:00.000+00:00',
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
  }
  // - GET ------------------
  else if (req.method === 'GET') {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    const { id } = req.query;

    const url_id = '6449aaa475ccb3e96b89fdec';

    const flightId = new ObjectId(id as string).toString();

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
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
