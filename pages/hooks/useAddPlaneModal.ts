import { create } from 'zustand';

interface AddPlaneModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddPlaneModal = create<AddPlaneModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useAddPlaneModal;
