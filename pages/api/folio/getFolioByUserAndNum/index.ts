import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET Folio by userId and folioNum------------------
  
  if (req.method === 'GET') {
    try {
      const { userId, folioNum } = req.query;

      // Verify existence of required fields
      if (!userId || !folioNum) {
        return res.status(400).json({ message: 'Required field missing' });
      }

      // Define query params for prisma
      const whereParams = {
        userId: userId ? (userId as string) : undefined,
        folioNum: folioNum ? parseInt(folioNum as string, 10) : undefined,
      };

        const folio = await prisma.folio.findMany({
            where: {
              ...whereParams,
            }
          });
 
      res.status(200).json(folio);
    } 
    catch (error) {
      return res.status(500).json({ error });
    }
    finally {
      await prisma.$disconnect();
    }
  } 
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}