import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const {
        name,
        lastName,
        role,
        email,
        emailVerified,
        image,
        hashedPassword,
        phoneNumber,
        address,
        city,
        nationality,
      } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: {
          name,
          lastName,
          role,
          email,
          emailVerified,
          image,
          hashedPassword,
          phoneNumber,
          address,
          city,
          nationality,
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Could not update user' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
