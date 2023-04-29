import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '@/pages/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, name, password, role } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!email || !name || !password) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
          role,
        },
      });
      return res.status(201).json(user);
    } catch (error) {
      // Manejar errores de creación de usuario
      console.error(error);
      return res.status(500).json({ message: 'Error al crear el usuario' });
    }
  } else {
    return res.status(405).json({ message: 'Método no permitido' });
  }
}
