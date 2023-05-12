import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - PUT --- Set certified field (to true or false) ---------------
  if (req.method === 'PUT') {
    const { id } = req.query as { id: string | string[] | undefined };
    const idString = Array.isArray(id) ? id[0] : id;
    const { certified } = req.body as { certified: boolean };

    // Verify existence of required fields
    if (!id || !certified) {
      return res.status(400).json({ message: 'Required field missing' });
    }

    try {
      if (idString) {
        const flight = await prisma.flight.update({
          where: { id: idString },
          data: {
            certified,
          },
        });
        return res.status(201).json(flight);
      }
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
