import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - PUT ------------------
  if (req.method === 'PUT') {
    console.log(req.body);
    console.log('HOLA SOY EL BODY QUE SETEA EL INSTRUCTOR EN EL VUELO');
    const {
      id,
      certifierId,
    } = req.body;

    // Verify existence of required fields
    if (
      !id ||
      !certifierId
    ) {

      return res.status(400).json({ message: 'Required field missing' });
    }

    try {
      const flight = await prisma.flight.update({
        where: {id},
        data: {
          certifierId
      }});
      return res.status(201).json(flight);
    }
    catch (error) {
      // Handle flight creation error
      console.error(error);
      return res.status(500).json({ message: `Error updating flight` });
    }
    finally {
      await prisma.$disconnect();
    }
  }

  else {

    return res.status(405).json({ message: 'Method not allowed' });
  }
}
