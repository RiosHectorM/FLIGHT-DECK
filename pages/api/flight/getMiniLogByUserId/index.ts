import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';
import { ObjectId, Decimal128 } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET a mini log by UserId ------------------
  // Currently it is used to get some fields of the latest flight (and the plane's brand and model)

  // Get the user ID from the request parameters
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const userId = new ObjectId(id as string).toString();

  let miniLog: {
    registrationId: string | undefined | null,
    flightDate: string | undefined | null,
    hourCount: number | undefined | null,
    stages: string | undefined | null,
    planeBrandAndModel: string | undefined | null,
    pilotFullName: string | undefined | null,
  } = {
    registrationId: '',
    flightDate: '',
    hourCount: 0.0,
    stages: '',
    planeBrandAndModel: '',
    pilotFullName: '',
  };

  if (req.method === 'GET') {
    try {
      // Use the Prisma Client to fetch the latest flight
      const latestFlight = await prisma.flight.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      if (!latestFlight) {
        return res.status(404).json({ error: 'Flight not found' });
      }

      // Convert hourCount to a regular JavaScript number using Mongodb library
      const hourCountConverted = Number(latestFlight.hourCount);

      // Use the Prisma Client to fetch plane's brand and model
      const airplane = await prisma.airplane.findUnique({
        where: { registrationId: latestFlight.aircraftId },
        select: { brand: true, model: true }
      });

      // Use the Prisma Client to fetch the user's data
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      // Format miniLog for response
      miniLog = {
        registrationId: latestFlight.aircraftId,
        flightDate: latestFlight.date as unknown as string,
        // hourCount: latestFlight.hourCount as number,
        hourCount: hourCountConverted,
        stages: latestFlight.stages,
        planeBrandAndModel: airplane?.brand + ' ' + airplane?.model,
        pilotFullName: user?.name + ' ' + user?.lastName,
      }

      res.json(miniLog);
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