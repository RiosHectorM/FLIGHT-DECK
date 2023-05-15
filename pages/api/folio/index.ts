import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - POST (Create new folio)------------------
  if (req.method === 'POST') {
    console.log(req.body);
    const { userId, folioNum, signedFolioUrl } =
      req.query;

    // Verify existence of required fields
    if (!userId || !folioNum|| !signedFolioUrl) {
      return res.status(400).json({ message: 'Required field missing' });
    }

    try {
      const folio = await prisma.folio.create({
        data: {
          userId,
          folioNum,
          signedFolioUrl,
        },
      });
      return res.status(201).json(folio);
    }
    // Handle folio creation error
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: `Error creating folio` });
    }
    finally {
      await prisma.$disconnect();
    }
  }
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
