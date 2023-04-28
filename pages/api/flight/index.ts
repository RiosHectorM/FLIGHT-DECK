import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';
import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - POST ------------------
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
  }
  
  // - GET ------------------
  else if (req.method === 'GET') {

    // Use the Prisma Client to fetch all flights data
    const allFlights = await prisma.flight.findMany();

    // If there are no flights, return a 404 error
    if (!allFlights) {
      return res.status(404).json({ message: 'No flights found' });
    }

    // If the flight exists, return it as a JSON response
    res.json(allFlights);
  }

  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
