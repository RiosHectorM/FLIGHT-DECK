import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/pages/libs/prismadb';

interface UpdateUserData {
  email: string;
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, role }: UpdateUserData = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: role },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
