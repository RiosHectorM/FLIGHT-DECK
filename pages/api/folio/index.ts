import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // - POST (Create new folio (for storing image of paper folio's signature))------------------
  if (req.method === 'POST') {

    const { userId, folioNum, signedFolioUrl } = req.body;

    try {
      // Verify existence of required fields
      if (!userId || !folioNum || !signedFolioUrl) {
        return res.status(400).json({ message: 'Required field missing' });
      }

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
      const errorMessage = error as string;
      return res.status(500).json({ message: `Error creating folio: ${errorMessage}` });

    }
  }

  // - PUT (Update folio image of paper folio's signature)------------------
  else if (req.method === 'PUT') {

    const { userId, folioNum, signedFolioUrl } = req.body;

    try {
      // Verify existence of required fields
      if (!userId || !folioNum || !signedFolioUrl) {
        return res.status(400).json({ message: 'Required field missing' });
      }

      // Find the folio based on the userId and folioNum
      const existingFolio = await prisma.folio.findFirst({
        where: { userId, folioNum },
      });

      if (!existingFolio) {
        return res.status(404).json({ message: 'Folio not found' });
      }

      // Update the signedFolioUrl field in the found folio
      const updatedFolio = await prisma.folio.update({
        where: {
          id: existingFolio.id,
        },
        data: {
          signedFolioUrl,
        },
      });

      return res.status(201).json(updatedFolio);
    }
    // Handle folio update error
    catch (error) {
      console.error(error);
      const errorMessage = error as string;
      return res.status(500).json({ message: `Error updating folio: ${errorMessage}` });
    }
  }

  // - DELETE (delete folio record)------------------
  else if (req.method === 'DELETE') {

    const { userId, folioNum } = req.query as { userId: string, folioNum: string};
    

    try {
      // Verify existence of required fields
      if (!userId || !folioNum) {
        return res.status(400).json({ message: 'DELETE: Required field missing' });
      }

      // Find the folio based on the userId and folioNum
      const existingFolio = await prisma.folio.findFirst({
        where: {
          userId: userId,
          folioNum: parseInt(folioNum, 10),
        },
      });

      if (!existingFolio) {
        return res.status(404).json({ message: 'Folio not found' });
      }

      // Delete the found folio record
      const deletedFolio = await prisma.folio.delete({
        where: {
          id: existingFolio.id,
        },
      });

      return res.status(201).json(deletedFolio);
    }
    // Handle error deleting folio
    catch (error) {
      console.error(error);
      const errorMessage = error as string;
      return res.status(500).json({ message: `Error deleting folio: ${errorMessage}` });
    }
  }

  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}