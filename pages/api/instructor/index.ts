import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET Instructors------------------
  if (req.method === 'GET') {
    try {
      // Use the Prisma Client to fetch all users with role 'INSTRUCTOR'
      const instructorUsers = await prisma.user.findMany({
        where: {
          role: 'INSTRUCTOR',
        },
      });

      // If there are no users with that role, return a 404 error
      if (!instructorUsers) {
        return res
          .status(404)
          .json({ message: 'No users with role INSTRUCTOR found' });
      }

      // If instructor users exist, return them as an array in a JSON response
      res.json(instructorUsers);
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
