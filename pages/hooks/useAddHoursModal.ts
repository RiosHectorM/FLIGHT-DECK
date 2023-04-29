import { create } from 'zustand';

interface AddHoursModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddHoursModal = create<AddHoursModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddHoursModal;
