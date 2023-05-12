import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET all Pilots------------------
  if (req.method === 'GET') {
    try {
      // Use the Prisma Client to fetch all users with role 'PILOT'
      const pilotUsers = await prisma.user.findMany({
        where: {
          role: 'PILOT',
        },
      });

      // If there are no users with that role, return a 404 error
      if (!pilotUsers) {
        return res
          .status(404)
          .json({ message: 'No users with role PILOT found' });
      }

      // If PILOT users exist, return them as an array in a JSON response
      res.json(pilotUsers);
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
