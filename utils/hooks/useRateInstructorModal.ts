import { create } from 'zustand';

interface RateInstructorModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRateInstructorModal = create<RateInstructorModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useRateInstructorModal;
