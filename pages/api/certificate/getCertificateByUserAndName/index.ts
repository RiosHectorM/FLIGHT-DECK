import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET certificate by userId and certificateName------------------

  if (req.method === 'GET') {
    try {
      const { userId, certificateName } = req.query;

      // Verify existence of required fields
      if (!userId || !certificateName) {
        return res.status(400).json({ message: 'Required field missing' });
      }

      // Define query params for prisma
      const whereParams = {
        userId: userId ? (userId as string) : undefined,
        certificateName: certificateName ? (certificateName as string) : undefined,
      };

      const certificate = await prisma.certificate.findMany({
        where: {
          ...whereParams,
        }
      });

      res.status(200).json(certificate);
    }
    catch (error) {
      return res.status(500).json({ error });
    }
  }
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}