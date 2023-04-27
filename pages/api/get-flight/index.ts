import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';
// import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    try {
      // Get the flight ID from the request parameters
      // const router = useRouter();
      // const { id } = router.query;
      const id = '6449aaa475ccb3e96b89fdec';

      if (!id) {
        return res.status(400).json({ message: 'Flight ID is required' });
      }

      // const flightId = new ObjectId(id as string).toString();

      // console.log('------------------------');
      // console.log(flightId);
      // console.log('------------------------');


      // // Use the Prisma Client to fetch the flight data
      // const flight = await prisma.flight.findUnique({
      //   where: { id: flightId },
      // });

      // // If the flight does not exist, return a 404 error
      // if (!flight) {
      //   return res.status(404).json({ message: 'Flight not found' });
      // }

      // // If the flight exists, return it as a JSON response
      // res.json(flight);

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