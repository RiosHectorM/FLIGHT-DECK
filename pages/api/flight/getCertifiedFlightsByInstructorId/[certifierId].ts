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
  const instructorId = new ObjectId(certifierId as string).toString();

  if (req.method === 'GET') {
    try {
      // Use the Prisma Client to fetch the flights
      const flights = await prisma.flight.findMany({
        where: {
          certifierId: instructorId,
        },
        select: {
          userId: true,
          dayHours: true,
          nightHours: true,
          instHours: true,
          hourCount: true,
          user: {
            select: {
              name: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      // Group flights by userId on sum of hourCount
      const groupedFlights = flights.reduce((acc: any, flight) => {
        const { userId, dayHours, nightHours, instHours, hourCount, user } = flight;

        if (!acc[userId]) {
          acc[userId] = {
            userId,
            dayHours: 0,
            nightHours: 0,
            instHours: 0,
            hourCount: 0,
            user,
          };
        }

        acc[userId].dayHours += dayHours;
        acc[userId].nightHours += nightHours;
        acc[userId].instHours += instHours;
        acc[userId].hourCount += hourCount;

        return acc;
      }, {});

      const result = Object.values(groupedFlights);

      // res.status(200).json(result);

      const formattedResult = result.map((elem: any) => {
        return ({
          pilot: elem.user.email,
          totalCertifiedHours: elem.hourCount,
          dayCertifiedHours: elem.dayHours,
          nightCertifiedHours: elem.nightHours,
          instrumentsCertifiedHours: elem.instHours,
        })
      });

      res.status(200).json(formattedResult);
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
