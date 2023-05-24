import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';
import { ObjectId } from 'mongodb';
import { DateTime } from 'luxon';

interface FlightStatistics {
  hourCount: number;
  dayHours: number;
  nightHours: number;
  instHours: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET certified flights hours by instructorId (certifierId field of flights) in a given date range ------------------
  if (req.method === 'GET') {
    try {
      // Get the certifier ID from the request parameters
      const { certifierId, startDate, endDate } = req.query as {
        certifierId: string;
        startDate: string;
        endDate: string;
      };

      // Verify all required parameters are present
      if (!certifierId || !startDate || !endDate) {
        return res
          .status(400)
          .json({ message: 'Required field missing' });
      }

      // Format parameters
      const instructorId = new ObjectId(certifierId as string).toString();
      const startDateTime = DateTime.fromISO(startDate);
      const endDateTime = DateTime.fromISO(endDate).plus({ days: 1 });

      // Get flights
      const stats = await prisma.flight.findMany({
        where: {
          certifierId,
          date: {
            gte: startDateTime.toJSDate(),
            lt: endDateTime.toJSDate(),
          },
        },
        select: {
          hourCount: true,
          dayHours: true,
          nightHours: true,
          instHours: true,
        },
      });

      const sumStats = stats.reduce<FlightStatistics>(
        (accumulator, flight) => {
          accumulator.hourCount += flight.hourCount || 0;
          accumulator.dayHours += flight.dayHours || 0;
          accumulator.nightHours += flight.nightHours || 0;
          accumulator.instHours += flight.instHours || 0;
          return accumulator;
        },
        {
          hourCount: 0,
          dayHours: 0,
          nightHours: 0,
          instHours: 0,
        }
      );

      res.status(200).json(sumStats);


      // // Use the Prisma Client to fetch the flights
      // const flights = await prisma.flight.findMany({
      //   where: {
      //     certifierId: instructorId,
      //   },
      //   select: {
      //     userId: true,
      //     dayHours: true,
      //     nightHours: true,
      //     instHours: true,
      //     hourCount: true,
      //     user: {
      //       select: {
      //         name: true,
      //         lastName: true,
      //         email: true,
      //       },
      //     },
      //   },
      // });

      // // Group flights by userId on sum of hourCount
      // const groupedFlights = flights.reduce((acc: any, flight) => {
      //   const { userId, dayHours, nightHours, instHours, hourCount, user } = flight;

      //   if (!acc[userId]) {
      //     acc[userId] = {
      //       userId,
      //       dayHours: 0,
      //       nightHours: 0,
      //       instHours: 0,
      //       hourCount: 0,
      //       user,
      //     };
      //   }

      //   acc[userId].dayHours += dayHours;
      //   acc[userId].nightHours += nightHours;
      //   acc[userId].instHours += instHours;
      //   acc[userId].hourCount += hourCount;

      //   return acc;
      // }, {});

      // const result = Object.values(groupedFlights);

      // const formattedResult = result.map((elem: any) => {
      //   return ({
      //     pilotMail: elem.user.email,
      //     pilotName: elem.user.name,
      //     pilotLastName: elem.user.lastName,
      //     totalCertifiedHours: elem.hourCount,
      //     dayCertifiedHours: elem.dayHours,
      //     nightCertifiedHours: elem.nightHours,
      //     instrumentsCertifiedHours: elem.instHours,
      //   })
      // });

      // res.status(200).json(formattedResult);
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
