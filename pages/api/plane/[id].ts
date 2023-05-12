import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET by Id ------------------
  // Get the plane ID from the request parameters
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Airplane ID is required' });
  }
  const planeId = new ObjectId(id as string).toString();

  if (req.method === 'GET') {
    try {
      // Use the Prisma Client to fetch the plane data
      const plane = await prisma.airplane.findUnique({
        where: { id: planeId },
      });

      // If the plane does not exist, return a 404 error
      if (!plane) {
        return res.status(404).json({ message: 'Airplane not found' });
      }

      // If the plane exists, return it as a JSON response
      res.json(plane);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
