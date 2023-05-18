import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // - POST (Create new qualification (for a pilot qualifying an instructor))------------------
  if (req.method === 'POST') {

    const { pilotId, instructorId, qualificationNum, comment } = req.body;

    try {
      // Verify existence of required fields
      if (!pilotId || !instructorId || !qualificationNum) {
        return res.status(400).json({ message: 'Required field missing' });
      }

      const qualification = await prisma.qualification.create({
        data: {
          pilotId,
          instructorId,
          qualificationNum,
          comment,
        },
      });
      return res.status(201).json(qualification);
    }
    // Handle folio creation error
    catch (error) {
      console.error(error);
      const errorMessage = error as string;
      return res.status(500).json({ message: `Error creating qualification: ${errorMessage}` });

    }
  }
} 