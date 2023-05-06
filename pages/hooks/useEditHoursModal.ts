import { create } from 'zustand';

interface EditHoursModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditHoursModal = create<EditHoursModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditHoursModal;
