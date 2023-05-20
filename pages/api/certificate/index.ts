import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // - GET certificates by userId ------------------
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;

      // Verify existence of required field
      if (!userId) {
        return res.status(400).json({ message: 'Required field missing' });
      }

      // Define query param for prisma
      const userIdString = Array.isArray(userId) ? userId[0] : userId;

      const certificates = await prisma.certificate.findMany({
        where: {
          userId: userIdString,
        }
      });

      res.status(200).json(certificates);
    }
    catch (error) {
      return res.status(500).json({ error });
    }
  }

  // - POST (Create new certificate (flight license, medical certificate, etc.)------------
  else if (req.method === 'POST') {

    const { userId, certificateName, certificateDescription, certificateExpirationDate, certificateImageUrl } = req.body;

    try {
      // Verify existence of required fields
      if (!userId || !certificateName) {
        return res.status(400).json({ message: 'Required field missing' });
      }

      const certificate = await prisma.certificate.create({
        data: {
          userId,
          certificateName,
          certificateDescription,
          certificateExpirationDate,
          certificateImageUrl,
        },
      });
      return res.status(201).json(certificate);
    }
    // Handle certificate creation error
    catch (error) {
      console.error(error);
      const errorMessage = error as string;
      return res.status(500).json({ message: `Error creating certificate: ${errorMessage}` });

    }
  }

  // - PUT (Update certificate expiration, and/or image url)------------------
  else if (req.method === 'PUT') {

    const { userId, certificateName, certificateDescription, certificateExpirationDate, certificateImageUrl } = req.body;

    try {
      // Verify existence of required fields
      if (!userId || !certificateName) {
        return res.status(400).json({ message: 'Required field missing' });
      }

      // Find the certificate based on the userId and certificateName
      const existingCertificate = await prisma.certificate.findFirst({
        where: { userId, certificateName },
      });

      if (!existingCertificate) {
        return res.status(404).json({ message: 'Certificate not found' });
      }

      // Update the certificate with the new data provided
      const updatedCertificate = await prisma.certificate.update({
        where: {
          id: existingCertificate.id,
        },
        data: {
          certificateDescription,
          certificateExpirationDate,
          certificateImageUrl,
        },
      });

      return res.status(201).json(updatedCertificate);
    }
    // Handle certificate update error
    catch (error) {
      console.error(error);
      const errorMessage = error as string;
      return res.status(500).json({ message: `Error updating certificate: ${errorMessage}` });
    }
  }

  // - DELETE (delete certificate record by userId and certificateName)------------------
  else if (req.method === 'DELETE') {

    const { userId, certificateName } = req.query as { userId: string, certificateName: string };

    try {
      // Verify existence of required fields
      if (!userId || !certificateName) {
        return res.status(400).json({ message: 'DELETE: Required field missing' });
      }

      // Find the certificate based on userId and certificateName
      const existingCertificate = await prisma.certificate.findFirst({
        where: {
          userId,
          certificateName,
        },
      });

      if (!existingCertificate) {
        return res.status(404).json({ message: 'Certificate not found' });
      }

      // Delete the found certificate record
      const deletedCertificate = await prisma.certificate.delete({
        where: {
          id: existingCertificate.id,
        },
      });

      return res.status(201).json(deletedCertificate);
    }
    // Handle error deleting certificate
    catch (error) {
      console.error(error);
      const errorMessage = error as string;
      return res.status(500).json({ message: `Error deleting certificate: ${errorMessage}` });
    }
  }

  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}