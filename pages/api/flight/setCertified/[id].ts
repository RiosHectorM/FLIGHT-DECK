import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - PUT --- Set certified field (to true or false) ---------------
  if (req.method === 'PUT') {
    const { id } = req.query as { id: string };
    const { certified } = req.body as { certified: boolean };

    // Verify existence of required fields
    if (!id || !certified) {
      return res.status(400).json({ message: 'Required field missing' });
    }

    try {
      const flight = await prisma.flight.update({
        where: { id },
        data: {
          certified,
        },
      });
      return res.status(201).json(flight);
    } catch (error) {
      // Handle flight creation error
      console.error(error);
      return res.status(500).json({ message: `Error updating flight` });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
