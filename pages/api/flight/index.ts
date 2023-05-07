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
    }
    catch (error) {
      // Handle flight creation error
      console.error(error);
      return res.status(500).json({ message: `Error creating flight` });
    }
    finally {
      await prisma.$disconnect();
    }
  }
  
  // - PUT ------------------
  if (req.method === 'PUT') {
    console.log('HOLA ENTRÉ AL PUT')
    console.log(req.body);
    const {
      id,
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
      !id ||
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
      const flight = await prisma.flight.update({
        where: {id},
        data: {
          userId,
          date: date + 'T00:00:00.000+00:00',
          aircraftId,
          stages,
          flightType,
          hourCount,
          folio,
          remarks,
      }});
      return res.status(201).json(flight);
    }
    catch (error) {
      // Handle flight creation error
      console.error(error);
      return res.status(500).json({ message: `Error creating flight` });
    }
    finally {
      await prisma.$disconnect();
    }
  }

  // - GET all------------------
  else if (req.method === 'GET') {

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
