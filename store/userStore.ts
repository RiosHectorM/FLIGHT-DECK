import { create } from 'zustand';
import axios from 'axios';

export type UserRole = 'PILOT' | 'INSTRUCTOR' | 'COMPANY' | null | undefined;

type User = {
  id: string;
  name: string;
  lastName: string | undefined | null;
  role: UserRole | undefined | null;
  email: string | undefined | null;
  emailVerified: string | undefined | null;
  image: string | undefined | null;
  hashedPassword: string | undefined | null;
  phoneNumber: string | undefined | null;
  address: string | undefined | null;
  city: string | undefined | null;
  nationality: string | undefined | null;
  premium: string | undefined | null;
  premiumExpiredDate: string | undefined | null;
};

type UserStore = {
  user: User | null;
  updateUserImage: (image: string) => void;
  updateUserHashedPasword: (hashedPassword: string) => void;
  updateUser: (updatedUser: User) => void;
  fetchUserByEmail: (email: string) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetchUserByEmail: async (email) => {
    try {
      const response = await axios.get(`/api/getUserByEmail/${email}`);
      set({ user: response.data });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  updateUserHashedPasword: (hashedPasword) => {
    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            hashedPasword: hashedPasword,
          },
        };
      }
      return state;
    });
  },
  updateUserImage: (image) => {
    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            image: image,
          },
        };
      }
      return state;
    });
  },
  updateUser: async (updatedUser) => {
    set((state) => {
      const newUser = {
        ...state.user,
        ...updatedUser,
      };

      try {
        if (newUser.id) {
          axios.put(`/api/user/${newUser.id}`, updatedUser);
          console.log('Datos de usuario actualizados correctamente');
        }
      } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
      }
      return { user: newUser };
    });
  },
  clearUser: () => {
    set({ user: null });
  },
}));
