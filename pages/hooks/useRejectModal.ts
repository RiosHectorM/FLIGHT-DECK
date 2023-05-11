import { create } from 'zustand';

interface RejectModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRejectModal = create<RejectModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRejectModal;