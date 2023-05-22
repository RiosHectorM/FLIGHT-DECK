// - GET Qualify by Id ------------------
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log(id);

  if (req.method === 'GET') {
    try {
      const userId = new ObjectId(id as string).toString();

      // Use the Prisma Client to fetch the user data
      const user = await prisma.qualification.findMany({
        where: { instructorId: userId },        
      });

      // If the user does not exist, return a 404 error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If the user exists, return it as a JSON response
      return res.json(user);
    } catch (error) {
      console.error(error);
      const errorMessage = error as string;
      return res
        .status(500)
        .json({ message: `Error getting user: ${errorMessage}` });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
