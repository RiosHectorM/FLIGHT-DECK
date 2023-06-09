import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - POST ------------------
  if (req.method === 'POST') {
    console.log(req.body);
    const { registrationId, brand, model, planeClass, engine, HPs, remarks } =
      req.body;

    // Verify existence of required fields
    if (!registrationId || !brand || !model || !planeClass || !engine || !HPs) {
      return res.status(400).json({ message: 'Required field missing' });
    }

    try {
      const plane = await prisma.airplane.create({
        data: {
          registrationId,
          brand,
          model,
          planeClass,
          engine,
          HPs,
          remarks,
        },
      });
      return res.status(201).json(plane);
    } catch (error) {
      // Handle airplane creation error
      console.error(error);
      return res.status(500).json({ message: `Error creating airplane` });
    } finally {
      await prisma.$disconnect();
    }
  }

  // - GET all------------------
  else if (req.method === 'GET') {
    try {
      // Use the Prisma Client to fetch all airplanes into an array
      const allPlanes = await prisma.airplane.findMany();

      // If there are no airplanes, return a 404 error
      if (!allPlanes) {
        return res.status(404).json({ message: 'No airplanes found' });
      }

      // If any airplane exists, return them in an array as a JSON response
      res.json(allPlanes);
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
