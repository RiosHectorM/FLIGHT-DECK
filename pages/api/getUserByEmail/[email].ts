import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET by Id ------------------
  // Get the flight ID from the request parameters
  const { email } = req.query;
  const emailStr = Array.isArray(email) ? email[0] : email; // asegurarse de que email es un string
  console.log(emailStr);
  if (!emailStr) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (req.method === 'GET') {
    try {
      // Use the Prisma Client to fetch the flight data
      const user = await prisma.user.findFirst({
        where: { email: emailStr },
      });

      // If the user does not exist, return a 404 error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If the user exists, return it as a JSON response
      res.json(user);
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
