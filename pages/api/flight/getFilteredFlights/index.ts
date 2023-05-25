import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

// type Filters = {
//   userId?: string;
//   date?: string;
//   aircraftId?: string;
//   folio?: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET Filtered Flights------------------
  if (req.method === 'GET') {
    try {
      // const { userId, date, aircraftId, folio }: Filters = req.body;
      const {
        userId,
        date,
        aircraftId,
        folio,
        certified,
        myStatus,
        flightType,
      } = req.query;

      console.log('QUERY: ',req.query)

      const filters = {
        userId: userId ? (userId as string) : undefined,
        flightType: flightType? (flightType as string): undefined,
        date: date ? new Date(date as string) : undefined,
        aircraftId: aircraftId ? (aircraftId as string) : undefined,
        folio: folio ? parseInt(folio as string, 10) : undefined,
        certified:
          certified === 'true'
            ? true
            : certified === 'false'
            ? false
            : undefined,
      };
      let flights;
      switch (myStatus) {
        case 'Todas':
          flights = await prisma.flight.findMany({
            where: {
              ...filters,
            },
            include: {
              user: true,
              certifier: true,
            },
          });
          break;
        case 'Cargadas':
          flights = await prisma.flight.findMany({
            where: {
              ...filters,
              certifier: null,
            },
            include: {
              user: true,
              certifier: true,
            },
            // include: {
            //   user: true,
            // },
          });
          break;
        case 'Pedidas':
          filters.certified = false;
          flights = await prisma.flight.findMany({
            where: {
              ...filters,
              NOT: { certifier: null },
            },
            include: {
              user: true,
              certifier: true,
            },
            // include: {
            //   user: true,
            // },
          });
          break;

        case 'Certificadas':
          filters.certified = true;
          flights = await prisma.flight.findMany({
            where: {
              ...filters,
              NOT: { certifier: null },
            },
            include: {
              user: true,
              certifier: true,
            },
            // include: {
            //   user: true,
            // },
          });
          break;
      }
      // Use the Prisma Client to fetch all flights according to received filters
      res.status(200).json(flights);
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
