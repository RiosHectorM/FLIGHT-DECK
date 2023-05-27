import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET Pilot's total hours flighted, by userId ------------------
  const { userId } = req.query as { userId: string };
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  if (req.method === 'GET') {
    try {
      // CERTIFIED HOURS: Calculate the sum of flight's hourCount where 'certified' is true
      const CertifiedHours = await prisma.flight.aggregate({
        _sum: { hourCount: true },
        where: {
          userId,
          certified: true,
        },
      });

      if (
        (CertifiedHours._sum?.hourCount &&
          CertifiedHours._sum?.hourCount < 100) ||
        CertifiedHours._sum?.hourCount === null
      ) {
        return res.status(200).json({
          canCertify: true,
        });
      }
      const today = new Date(Date.now());
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          premium: true,
          premiumExpiredDate: true,
        },
      });
      if (
        user &&
        user.premium &&
        user.premium === true &&
        user.premiumExpiredDate &&
        user.premiumExpiredDate > today
      ) {
        return res.status(200).json({
          canCertify: true,
        });
      }
      return res.status(200).json({
        canCertify: false,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error as string;
      return res
        .status(500)
        .json({ message: `Error getting hours: ${errorMessage}` });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
